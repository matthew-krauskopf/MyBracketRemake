package com.bracket.auth.mapper;

import org.springframework.stereotype.Component;

import com.bracket.auth.dto.UserDto;
import com.bracket.auth.entity.User;

@Component
public class UserMapper {
  public UserDto toUserDto(final User user) {
    return new UserDto(user.getEmail(), user.getUsername());
  }
}