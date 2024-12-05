package com.thongld25.shopapp.repository;

import com.thongld25.shopapp.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
    ProductSize findProductSizeByProductIdAndSize(Long productId, String size);
}
