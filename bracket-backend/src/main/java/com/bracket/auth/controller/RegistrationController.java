package com.bracket.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bracket.auth.dto.RegistrationRequestDto;
import com.bracket.auth.dto.RegistrationResponseDto;
import com.bracket.auth.mapper.UserRegistrationMapper;
import com.bracket.auth.service.UserRegistrationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RegistrationController {

  private final UserRegistrationService userRegistrationService;

  private final UserRegistrationMapper userRegistrationMapper;

  @PostMapping("/register")
  public ResponseEntity<RegistrationResponseDto> registerUser(
      @Valid @RequestBody final RegistrationRequestDto registrationDTO) {

    final var registeredUser = userRegistrationService
        .registerUser(userRegistrationMapper.toEntity(registrationDTO));

    return ResponseEntity.ok(
        userRegistrationMapper.toRegistrationResponseDto(registeredUser));
  }

}
