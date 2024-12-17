package com.thongld25.shopapp.service.order;

import com.thongld25.shopapp.dto.OrderDto;
import com.thongld25.shopapp.enums.OrderStatus;
import com.thongld25.shopapp.exceptions.ResourceNotFoundException;
import com.thongld25.shopapp.model.*;
import com.thongld25.shopapp.repository.OrderRepository;
import com.thongld25.shopapp.repository.ProductRepository;
import com.thongld25.shopapp.repository.ProductSizeRepository;
import com.thongld25.shopapp.request.PlaceOrderRequest;
import com.thongld25.shopapp.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{
    private final OrderRepository orderRepository;
    private final ProductSizeRepository productSizeRepository;
    private final CartService cartService;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public Order placeOrder(PlaceOrderRequest request, Long userId) {
        Cart cart = cartService.getCartByUserId(userId);

        Order order = createOrder(cart);
        List<OrderItem> orderItems = createOrderItems(order, cart);

        order.setOrderItems(new HashSet<>(orderItems));
        order.setTotalAmount(calculateTotalAmount(orderItems));
        order.setReceiverName(request.getReceiverName());
        order.setAddress(request.getAddress());
        order.setReceiverPhone(request.getReceiverPhone());
        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(cart.getId());

        return savedOrder;
    }


    @Override
    public List<OrderDto> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public OrderDto getOrder(Long orderId){
        return orderRepository.findById(orderId)
                .map(this::convertToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    private Order createOrder(Cart cart) {
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());
        return order;
    }

    private List<OrderItem> createOrderItems(Order order, Cart cart) {
        return cart.getItems().stream().map(cartItem -> {
            ProductSize productSize = cartItem.getProductSize();
            productSize.setInventory(productSize.getInventory() - cartItem.getQuantity());
            productSizeRepository.save(productSize);
            return new OrderItem(
                    order,
                    productSize,
                    cartItem.getQuantity(),
                    cartItem.getProductSize().getProduct().getPrice()
            );
        }).toList();
    }

    private BigDecimal calculateTotalAmount(List<OrderItem> orderItemList) {
        return orderItemList
                .stream()
                .map(item -> item.getPrice()
                        .multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public OrderDto convertToDto(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }
}
