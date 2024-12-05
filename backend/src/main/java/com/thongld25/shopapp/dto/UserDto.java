package com.thongld25.shopapp.dto;

import com.thongld25.shopapp.model.Cart;
import com.thongld25.shopapp.model.Order;
import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private List<OrderDto> orders;
    private CartDto cart;
}
