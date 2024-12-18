package com.thongld25.shopapp.controller;

import com.thongld25.shopapp.dto.CartDto;
import com.thongld25.shopapp.exceptions.ResourceNotFoundException;
import com.thongld25.shopapp.model.Cart;
import com.thongld25.shopapp.model.User;
import com.thongld25.shopapp.response.ApiResponse;
import com.thongld25.shopapp.service.cart.CartService;
import com.thongld25.shopapp.service.cart.ICartService;
import com.thongld25.shopapp.service.user.IUserService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/carts")
public class CartController {
    private final ICartService cartService;
    private final IUserService userService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/my-cart")
    public ResponseEntity<ApiResponse> getCart() {
        try {
            User user = userService.getAuthenticatedUser();
            Cart cart = cartService.getCartByUserId(user.getId());
            CartDto cartDto = cartService.convertCartToDto(cart);
            return ResponseEntity.ok(new ApiResponse("Success", cartDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), null));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse> clearCart() {
        try {
            User user = userService.getAuthenticatedUser();
            Cart cart = cartService.getCartByUserId(user.getId());
            cartService.clearCart(cart.getId());
            return ResponseEntity.ok(new ApiResponse("Clear Cart Success", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), null));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/cart/total-price")
    public ResponseEntity<ApiResponse> getTotalAmount() {
        try {
            User user = userService.getAuthenticatedUser();
            Cart cart = cartService.getCartByUserId(user.getId());
            BigDecimal totalPrice = cartService.getTotalPrice(cart.getId());
            return ResponseEntity.ok(new ApiResponse("Total Price", totalPrice));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), null));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
