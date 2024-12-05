package com.thongld25.shopapp.service.cart;

import com.thongld25.shopapp.dto.CartDto;
import com.thongld25.shopapp.model.Cart;
import com.thongld25.shopapp.model.User;

import java.math.BigDecimal;

public interface ICartService {
    Cart getCart(Long id);
    void clearCart(Long id);
    BigDecimal getTotalPrice(Long id);

    Cart initializeNewCart(User user);

    Cart getCartByUserId(Long userId);

    CartDto convertCartToDto(Cart cart);
}
