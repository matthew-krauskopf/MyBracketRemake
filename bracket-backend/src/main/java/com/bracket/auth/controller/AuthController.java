package com.bracket.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bracket.auth.dto.AuthenticationRequestDto;
import com.bracket.auth.dto.AuthenticationResponseDto;
import com.bracket.auth.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

// AuthController.java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationService authenticationService;

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponseDto> authenticate(
      @RequestBody final AuthenticationRequestDto authenticationRequestDto) {
    return ResponseEntity.ok(
        authenticationService.authenticate(authenticationRequestDto));
  }
}