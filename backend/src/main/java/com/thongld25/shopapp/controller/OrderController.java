package com.thongld25.shopapp.controller;

import com.thongld25.shopapp.dto.OrderDto;
import com.thongld25.shopapp.exceptions.ResourceNotFoundException;
import com.thongld25.shopapp.model.Order;
import com.thongld25.shopapp.model.User;
import com.thongld25.shopapp.request.PlaceOrderRequest;
import com.thongld25.shopapp.response.ApiResponse;
import com.thongld25.shopapp.service.order.IOrderService;
import com.thongld25.shopapp.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/orders")
public class OrderController {
    private final IOrderService orderService;
    private final IUserService userService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/place-order")
    public ResponseEntity<ApiResponse> createOrder(@RequestBody PlaceOrderRequest request) {
        try {
            User user = userService.getAuthenticatedUser();
            Order order = orderService.placeOrder(request, user.getId());
            OrderDto orderDto = orderService.convertToDto(order);
            return ResponseEntity.ok(new ApiResponse("Item Order Success", orderDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/order")
    public ResponseEntity<ApiResponse> getOrderOfUser() {
        try {
            User user = userService.getAuthenticatedUser();
            List<OrderDto> orders = orderService.getUserOrders(user.getId());
            return ResponseEntity.ok(new ApiResponse("Success", orders));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{orderId}/order")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long orderId) {
        try {
            OrderDto orderDto = orderService.getOrder(orderId);
            return ResponseEntity.ok(new ApiResponse("Success", orderDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{userId}/order")
    public ResponseEntity<ApiResponse> getUserOrders(@PathVariable Long userId) {
        try {
            List<OrderDto> orders = orderService.getUserOrders(userId);
            return ResponseEntity.ok(new ApiResponse("Success", orders));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Error", e.getMessage()));
        }
    }
}
