package com.thongld25.shopapp.dto;

import com.thongld25.shopapp.model.Category;
import com.thongld25.shopapp.model.ProductSize;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String brand;
    private BigDecimal price;
    private Category category;
    private List<ImageDto> images;
    private List<ProductSize> productSizes;
}
