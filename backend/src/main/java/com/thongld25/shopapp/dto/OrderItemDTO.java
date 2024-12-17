package com.thongld25.shopapp.dto;


import com.thongld25.shopapp.model.ProductSize;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDTO {
    private Long productId;
    private String productName;
    private ProductSize productSize;
    private String productBrand;
    private int quantity;
    private BigDecimal price;
}
