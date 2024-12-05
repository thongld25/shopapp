package com.thongld25.shopapp.dto;

import com.thongld25.shopapp.model.ProductSize;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemDto {
    private Long itemId;
    private Long productId;
    private ProductSize productSize;
    private int quantity;
    private BigDecimal totalItem;
}
