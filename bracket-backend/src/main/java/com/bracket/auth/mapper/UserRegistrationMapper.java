package com.bracket.auth.mapper;

import org.springframework.stereotype.Component;

import com.bracket.auth.dto.RegistrationRequestDto;
import com.bracket.auth.dto.RegistrationResponseDto;
import com.bracket.auth.entity.User;

@Component
public class UserRegistrationMapper {

  public User toEntity(RegistrationRequestDto registrationRequestDto) {
    final var user = new User();

    user.setEmail(registrationRequestDto.email());
    user.setUsername(registrationRequestDto.username());
    user.setPassword(registrationRequestDto.password());

    return user;
  }

  public RegistrationResponseDto toRegistrationResponseDto(
      final User user) {

    return new RegistrationResponseDto(
        user.getEmail(), user.getUsername());
  }

}