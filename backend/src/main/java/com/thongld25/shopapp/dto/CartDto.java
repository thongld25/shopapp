package com.thongld25.shopapp.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class CartDto {
    private Long cartId;
    private String receiverName;
    private String receiverPhone;
    private String address;
    private Set<CartItemDto> items;
    private BigDecimal totalAmount;
}
