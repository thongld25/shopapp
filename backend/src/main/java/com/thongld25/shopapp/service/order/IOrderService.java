package com.thongld25.shopapp.service.order;

import com.thongld25.shopapp.dto.OrderDto;
import com.thongld25.shopapp.model.Order;

import java.util.List;

public interface IOrderService {
    Order placeOrder(Long userId);

    OrderDto getOrder(Long orderId);

    List<OrderDto> getUserOrders(Long userId);

    OrderDto convertToDto(Order order);
}
