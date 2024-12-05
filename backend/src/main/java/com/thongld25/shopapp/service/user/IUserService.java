package com.thongld25.shopapp.service.user;

import com.thongld25.shopapp.dto.UserDto;
import com.thongld25.shopapp.model.User;
import com.thongld25.shopapp.request.UserCreateRequest;
import com.thongld25.shopapp.request.UserUpdateRequest;

public interface IUserService {
    User getUserById(Long userid);
    User createUser(UserCreateRequest request);
    User updateUser(UserUpdateRequest request, Long userId);
    void deleteUser(Long userId);

    UserDto convertUserToDto(User user);

    User getAuthenticatedUser();
}
