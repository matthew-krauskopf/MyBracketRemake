package com.bracket.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bracket.auth.dto.UserDto;
import com.bracket.auth.mapper.UserMapper;
import com.bracket.auth.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;

  @GetMapping("/me")
  public ResponseEntity<UserDto> getUserProfile(
      final Authentication authentication) {

    final var user = userService.getUserByUsername(authentication.getName());

    return ResponseEntity.ok(userMapper.toUserDto(user));
  }
}
