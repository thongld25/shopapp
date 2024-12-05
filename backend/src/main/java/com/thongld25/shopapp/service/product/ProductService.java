package com.thongld25.shopapp.service.product;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.thongld25.shopapp.dto.ImageDto;
import com.thongld25.shopapp.dto.ProductDto;
import com.thongld25.shopapp.exceptions.AlreadyExistException;
import com.thongld25.shopapp.exceptions.ResourceNotFoundException;
import com.thongld25.shopapp.model.Category;
import com.thongld25.shopapp.model.Image;
import com.thongld25.shopapp.model.Product;
import com.thongld25.shopapp.model.ProductSize;
import com.thongld25.shopapp.repository.CategoryRepository;
import com.thongld25.shopapp.repository.ImageRepository;
import com.thongld25.shopapp.repository.ProductRepository;
import com.thongld25.shopapp.repository.ProductSizeRepository;
import com.thongld25.shopapp.request.AddProductRequest;
import com.thongld25.shopapp.request.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService implements IProductService{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ModelMapper modelMapper;
    private final Cloudinary cloudinary;


    @Transactional
    @Override
    public Product addProduct(AddProductRequest request) {
        if (productExists(request.getName(), request.getBrand())) {
            throw new AlreadyExistException(request.getBrand() + " "
                    + request.getName() + " already exists, You may update this product instead!");
        }
        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() -> {
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });

        Product product = createProduct(request, category);

        Product savedProduct = productRepository.save(product);

        List<ProductSize> productSizes = createProductSizes(request.getProductSizes(), savedProduct);
        savedProduct.setProductSizes(productSizes);
        productSizeRepository.saveAll(productSizes);

        List<Image> images = createImages(request.getFiles(), savedProduct);
        savedProduct.setImages(images);
        imageRepository.saveAll(images);

        return savedProduct;
    }

    private Product createProduct(AddProductRequest request, Category category){
        return new Product(
                request.getName(),
                request.getBrand(),
                request.getPrice(),
                category,
                new ArrayList<>()
        );
    }

    private List<ProductSize> createProductSizes(List<ProductSize> sizes, Product product) {
        if (sizes == null || sizes.isEmpty()) {
            throw new IllegalArgumentException("Product sizes cannot be null or empty");
        }
        return sizes.stream()
                .map(size -> {
                    ProductSize productSize = new ProductSize();
                    productSize.setSize(size.getSize());
                    productSize.setInventory(size.getInventory());
                    productSize.setProduct(product); // Liên kết với Product
                    return productSize;
                })
                .toList();
    }

    public List<Image> createImages(List<MultipartFile> files, Product product) {
        List<Image> createImages = new ArrayList<>();
        for(MultipartFile file : files){
            try {
                Image image = new Image();
                image.setProduct(product);
                String url = uploadImage(file);
                image.setUrl(url);
                createImages.add(image);
            } catch(IOException e){
                throw new RuntimeException(e.getMessage());
            }
        }
        return createImages;
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found!"));
    }

    @Override
    public void deleteProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Lấy `Category` từ `Product`
        Category category = product.getCategory();

        // Xóa `Product`
        productRepository.delete(product);

        // Kiểm tra nếu `Category` không còn sản phẩm nào khác ánh xạ
        if (category != null && category.getProducts().isEmpty()) {
            categoryRepository.delete(category);
        }
    }

    @Override
    public Product updateProduct(ProductUpdateRequest request, Long productId) {
        return productRepository.findById(productId)
                .map(existingProduct -> updateExistingProduct(existingProduct, request))
                .map(productRepository :: save)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private boolean productExists(String name, String brand) {
        return productRepository.existsByNameAndBrand(name, brand);
    }

    private Product updateExistingProduct(Product existingProduct, ProductUpdateRequest request) {
        existingProduct.setName(request.getName());
        existingProduct.setBrand(request.getBrand());
        existingProduct.setPrice(request.getPrice());

        Category category = categoryRepository.findByName(request.getCategory().getName());
        existingProduct.setCategory(category);
        return existingProduct;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryName(category);
    }

    @Override
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    @Override
    public List<Product> getProductsByCategoryAndBrand(String category, String brand) {
        return productRepository.findByCategoryNameAndBrand(category, brand);
    }

    @Override
    public List<Product> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product> getProductsByBrandAndName(String brand, String name) {
        return productRepository.findByBrandAndName(brand, name);
    }

    @Override
    public Long countProductsByBrandAndName(String brand, String name) {
        return productRepository.countByBrandAndName(brand, name );
    }

    @Override
    public ProductDto convertToDto(Product product){
        ProductDto productDto = modelMapper.map(product, ProductDto.class);
        List<Image> images = imageRepository.findByProductId(product.getId());
        List<ImageDto> imageDtos = images.stream()
                .map(image -> modelMapper.map(image, ImageDto.class))
                .toList();
        productDto.setImages(imageDtos);
        return productDto;
    }

    @Override
    public List<ProductDto> getConvertedProducts(List<Product> products) {
        return products.stream().map(this::convertToDto).toList();
    }

    private String uploadImage(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        String publicValue = generatePublicValue(file.getOriginalFilename());
        log.info("publicValue is: {}", publicValue);
        String extension = getFileName(file.getOriginalFilename())[1];
        log.info("extension is: {}", extension);
        File fileUpload = convert(file);
        log.info("fileUpload is: {}", fileUpload);
        cloudinary.uploader().upload(fileUpload, ObjectUtils.asMap("public_id", publicValue));
        cleanDisk(fileUpload);
        return  cloudinary.url().generate(StringUtils.join(publicValue, ".", extension));
    }

    private File convert(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        File convFile = new File(StringUtils.join(generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]));
        try(InputStream is = file.getInputStream()) {
            Files.copy(is, convFile.toPath());
        }
        return convFile;
    }

    private void cleanDisk(File file) {
        try {
            log.info("file.toPath(): {}", file.toPath());
            Path filePath = file.toPath();
            Files.delete(filePath);
        } catch (IOException e) {
            log.error("Error");
        }
    }

    private String generatePublicValue(String originalName){
        String fileName = getFileName(originalName)[0];
        return StringUtils.join(UUID.randomUUID().toString(), "_", fileName);
    }

    private String[] getFileName(String originalName) {
        return originalName.split("\\.");
    }
}
