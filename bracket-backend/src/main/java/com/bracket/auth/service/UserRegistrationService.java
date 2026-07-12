package com.bracket.auth.service;

import java.time.Instant;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bracket.auth.entity.User;
import com.bracket.auth.exception.UserAlreadyExistsException;
import com.bracket.auth.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Transactional
  public User registerUser(User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      throw new UserAlreadyExistsException("Username already exists");
    } else if (userRepository.existsByEmail(user.getEmail())) {
      throw new UserAlreadyExistsException(
          "Email already exists");
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setCreatedAt(Instant.now());
    return userRepository.save(user);
  }
}