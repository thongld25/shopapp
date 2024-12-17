package com.thongld25.shopapp.request;

import lombok.Data;

@Data
public class PlaceOrderRequest {
    private String receiverName;
    private String receiverPhone;
    private String address;
}
