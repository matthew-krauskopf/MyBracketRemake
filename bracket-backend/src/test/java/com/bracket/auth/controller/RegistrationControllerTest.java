package com.bracket.auth.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.bracket.auth.dto.RegistrationResponseDto;
import com.bracket.auth.entity.User;
import com.bracket.auth.exception.UserAlreadyExistsException;
import com.bracket.auth.mapper.UserRegistrationMapper;
import com.bracket.auth.service.UserRegistrationService;

@WebMvcTest(RegistrationController.class)
@AutoConfigureMockMvc(addFilters = false)
class RegistrationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRegistrationService userRegistrationService;

    @MockitoBean
    private UserRegistrationMapper userRegistrationMapper;

    @Test
    void returnsConflictWithUsernameMessage_whenUsernameAlreadyExists() throws Exception {
        given(userRegistrationMapper.toEntity(any())).willReturn(new User());
        given(userRegistrationService.registerUser(any()))
                .willThrow(new UserAlreadyExistsException("Username already exists"));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"username":"taken","email":"taken@example.com","password":"password123"}
                        """))
                .andExpect(status().isConflict())
                .andExpect(content().json("{\"message\":\"Username already exists\"}"));
    }

    @Test
    void returnsConflictWithEmailMessage_whenEmailAlreadyExists() throws Exception {
        given(userRegistrationMapper.toEntity(any())).willReturn(new User());
        given(userRegistrationService.registerUser(any()))
                .willThrow(new UserAlreadyExistsException("Email already exists"));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"username":"newuser","email":"taken@example.com","password":"password123"}
                        """))
                .andExpect(status().isConflict())
                .andExpect(content().json("{\"message\":\"Email already exists\"}"));
    }

    @Test
    void returnsCreatedUser_whenRegistrationSucceeds() throws Exception {
        final var registeredUser = new User();
        registeredUser.setUsername("newuser");
        registeredUser.setEmail("newuser@example.com");

        given(userRegistrationMapper.toEntity(any())).willReturn(new User());
        given(userRegistrationService.registerUser(any())).willReturn(registeredUser);
        given(userRegistrationMapper.toRegistrationResponseDto(registeredUser))
                .willReturn(new RegistrationResponseDto("newuser", "newuser@example.com"));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"username":"newuser","email":"newuser@example.com","password":"password123"}
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"username\":\"newuser\",\"email\":\"newuser@example.com\"}"));
    }
}
