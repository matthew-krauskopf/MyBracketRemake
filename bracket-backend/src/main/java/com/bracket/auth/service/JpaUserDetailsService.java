package com.bracket.auth.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bracket.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(final String username)
      throws UsernameNotFoundException {

    return userRepository.findByUsername(username).map(user -> {
      return User.builder()
          .username(username)
          .password(user.getPassword())
          .build();
    }).orElseThrow(() -> new UsernameNotFoundException(
        "User with username [%s] not found".formatted(username)));
  }
}
