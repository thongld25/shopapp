package com.thongld25.shopapp.service.cart;

import com.thongld25.shopapp.dto.CartItemDto;
import com.thongld25.shopapp.model.CartItem;

import java.util.Set;

public interface ICartItemService {
    void addCartItem(Long cartId, Long productId, int quantity, String size);
    void removeItemFromCart(Long cartId, Long productId);
    void updateItemQuantity(Long cartId, Long productSizeId, int quantity);

    CartItem getCartItem(Long cartId, Long productId);
}
