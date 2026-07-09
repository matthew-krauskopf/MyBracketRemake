package com.bracket.auth.service;

import static org.springframework.http.HttpStatus.GONE;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bracket.auth.entity.User;
import com.bracket.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public User getUserByUsername(final String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new ResponseStatusException(GONE,
            "The user account has been deleted or inactivated"));
  }
}