package com.thongld25.shopapp.service.cart;

import com.thongld25.shopapp.dto.CartItemDto;
import com.thongld25.shopapp.exceptions.ResourceNotFoundException;
import com.thongld25.shopapp.model.Cart;
import com.thongld25.shopapp.model.CartItem;
import com.thongld25.shopapp.model.ProductSize;
import com.thongld25.shopapp.repository.CartItemRepository;
import com.thongld25.shopapp.repository.CartRepository;
import com.thongld25.shopapp.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService{
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ICartService cartService;
    private final ProductSizeRepository productSizeRepository;

    @Override
    public void addCartItem(Long cartId, Long productId, int quantity, String size) {
        //1.Get the cart
        //2. Get the product
        //3. Check if the product already in the cart
        //4. If yes, then increase the quantity with the requested quantity
        //5. If No, the initiate a new CartItem entry.
        Cart cart = cartService.getCart(cartId);
        ProductSize productSize = productSizeRepository.findProductSizeByProductIdAndSize(productId, size);
        CartItem cartItem = cart.getItems()
                .stream()
                .filter(item -> item.getProductSize().getId().equals(productSize.getId()))
                .findFirst().orElse(new CartItem());
        if (cartItem.getId() == null) {
            cartItem.setCart(cart);
            cartItem.setProductSize(productSize);
            cartItem.setQuantity(quantity);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        cartItem.setTotalPrice();
        cart.addItem(cartItem);
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long cartId, Long productSizeId) {
        Cart cart = cartService.getCart(cartId);
        CartItem itemToRemove = getCartItem(cartId, productSizeId);
        cart.removeItem(itemToRemove);
        cartRepository.save(cart);
    }

    @Override
    public void updateItemQuantity(Long cartId, Long productSizeId, int quantity) {
        Cart cart = cartService.getCart(cartId);
        cart.getItems()
                .stream()
                .filter(item -> item.getProductSize().getId().equals(productSizeId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    item.setTotalPrice();
                });
        BigDecimal totalAmount = cart.getItems()
                .stream().map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);
    }

    @Override
    public CartItem getCartItem(Long cartId, Long productSizeId) {
        Cart cart = cartService.getCart(cartId);
        return cart.getItems()
                .stream()
                .filter(item -> item.getProductSize().getId().equals(productSizeId))
                .findFirst().orElseThrow(() -> new ResourceNotFoundException(("Item not found")));
    }

//    @Override
//    public CartItemDto convertToDto(CartItem cartItem){
//        CartItemDto cartItemDto = new CartItemDto();
//        cartItemDto.setSize(cartItem.getProductSize().getSize());
//        cartItemDto.setItemId(cartItem.getId());
//        cartItemDto.setTotalItem(cartItem.getTotalPrice());
//        cartItemDto.setProductId(cartItem.getProductSize().getProduct().getId());
//        return cartItemDto;
//    }

}
