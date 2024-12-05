package com.thongld25.shopapp.service.cart;

import com.thongld25.shopapp.dto.CartDto;
import com.thongld25.shopapp.dto.CartItemDto;
import com.thongld25.shopapp.exceptions.ResourceNotFoundException;
import com.thongld25.shopapp.model.Cart;
import com.thongld25.shopapp.model.CartItem;
import com.thongld25.shopapp.model.ProductSize;
import com.thongld25.shopapp.model.User;
import com.thongld25.shopapp.repository.CartItemRepository;
import com.thongld25.shopapp.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService{
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ModelMapper modelMapper;
    @Override
    public Cart getCart(Long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        BigDecimal totalAmount = cart.getTotalAmount();
        cart.setTotalAmount(totalAmount);
        return cartRepository.save(cart);
    }

    @Transactional
    @Override
    public void clearCart(Long id) {
        Cart cart = getCart(id);
        cartItemRepository.deleteAllByCartId(id);
        cart.getItems().clear();
        cartRepository.deleteById(id);
    }

    @Override
    public BigDecimal getTotalPrice(Long id) {
        Cart cart = getCart(id);
        return cart.getTotalAmount();
    }

    @Override
    public Cart initializeNewCart(User user) {

        return Optional.ofNullable(getCartByUserId(user.getId()))
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public CartDto convertCartToDto(Cart cart){
        CartDto cartDto = new CartDto();
        cartDto.setCartId(cart.getId());
        cartDto.setItems(getConvertedCartItems(cart.getItems()));
        cartDto.setTotalAmount(cart.getTotalAmount());
        return cartDto;
    }

    private CartItemDto convertToDto(CartItem cartItem){
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setItemId(cartItem.getId());
        cartItemDto.setTotalItem(cartItem.getTotalPrice());
        cartItemDto.setProductSize(cartItem.getProductSize());
        cartItemDto.setProductId(cartItem.getProductSize().getProduct().getId());
        cartItemDto.setQuantity(cartItem.getQuantity());
        return cartItemDto;
    }

    private Set<CartItemDto> getConvertedCartItems(Set<CartItem> items){
        return items.stream().map(this::convertToDto).collect(Collectors.toSet());
    }
}
