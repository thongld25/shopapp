package com.thongld25.shopapp.request;

import com.thongld25.shopapp.model.Category;
import com.thongld25.shopapp.model.ProductSize;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductUpdateRequest {
    private Long id;
    private String name;
    private String brand;
    private BigDecimal price;
    private List<ProductSize> productSizes;
    private Category category;
}
