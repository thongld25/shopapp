package com.thongld25.shopapp.security.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudConfig {
    @Bean
    public Cloudinary configKey() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "divyvvdpl");
        config.put("api_key", "375672619841926");
        config.put("api_secret", "2dNXMsWLguA01xHScq-8STaWmfo");
        return new Cloudinary(config);
    }
}