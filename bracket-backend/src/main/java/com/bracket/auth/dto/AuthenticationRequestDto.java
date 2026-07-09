package com.bracket.auth.dto;

// AuthenticationRequestDto.java
public record AuthenticationRequestDto(
    String username,
    String password) {
}