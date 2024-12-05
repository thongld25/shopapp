package com.thongld25.shopapp.service.image;

import com.thongld25.shopapp.dto.ImageDto;
import com.thongld25.shopapp.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageService {
    Image getImageById(Long id);
    void deleteImageById(Long id);
    List<ImageDto> saveImage(List<MultipartFile> files, Long productId);
    void updateImage(MultipartFile file, Long id);
}
