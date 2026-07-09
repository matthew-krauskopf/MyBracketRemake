package com.bracket.auth.service;

import java.time.Instant;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bracket.auth.entity.User;
import com.bracket.auth.repository.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Transactional
  public User registerUser(User user) {
    if (userRepository.existsByUsername(user.getUsername()) ||
        userRepository.existsByEmail(user.getEmail())) {

      throw new ValidationException(
          "Username or Email already exists");
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setCreatedAt(Instant.now());
    return userRepository.save(user);
  }
}