package com.example.onlinequiz.Service;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Repo.VerificationTokenRepository;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import com.example.onlinequiz.Token.VerificationToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;
public class ValidateTokenTest {
    private UserServiceImpl userService;
    @Mock
    private VerificationTokenRepository tokenRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userService = new UserServiceImpl(userRepository, tokenRepository, passwordEncoder); // Khởi tạo UserServiceImpl thực
    }

    @Test
    public void testValidateTokenWithInValidToken() {
        VerificationToken validToken = new VerificationToken();
        when(tokenRepository.findByToken(anyString())).thenReturn(validToken);
        when(userRepository.save(any(Users.class))).thenReturn(new Users());

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("valid", result);
        assertTrue(validToken.getUser().isEnabled());
    }

    @Test
    public void testValidateTokenWithExpiredToken() {
        VerificationToken expiredToken = new VerificationToken();
        expiredToken.setExpirationTime(new Date(System.currentTimeMillis() - 1000000));
        when(tokenRepository.findByToken(anyString())).thenReturn(expiredToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("Token already expired", result);
        verify(tokenRepository).delete(expiredToken);
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithValidToken() {
        when(tokenRepository.findByToken(anyString())).thenReturn(null);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d2");

        assertEquals("Invalid verification token", result);
        verify(tokenRepository, never()).delete(any(VerificationToken.class));
        verify(userRepository, never()).save(any(Users.class));
    }
    @Test
    public void testValidateTokenWithNullToken() {
        when(tokenRepository.findByToken(null)).thenReturn(null);

        String result = userService.validateaToken(null);

        assertEquals("Invalid verification token", result);
        verify(tokenRepository, never()).delete(any(VerificationToken.class));
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithValidTokenAndAlreadyEnabledUser() {
        VerificationToken validToken = new VerificationToken();
        Users user = new Users();
        user.setEnabled(true);
        validToken.setUser(user);

        when(tokenRepository.findByToken(anyString())).thenReturn(validToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("User is already enabled", result);
        verify(tokenRepository, never()).delete(any(VerificationToken.class));
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithExpiredTokenAndAlreadyEnabledUser() {
        VerificationToken expiredToken = new VerificationToken();
        expiredToken.setExpirationTime(new Date(System.currentTimeMillis() - 1000000));
        Users user = new Users();
        user.setEnabled(true);
        expiredToken.setUser(user);

        when(tokenRepository.findByToken(anyString())).thenReturn(expiredToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("User is already enabled", result);
        verify(tokenRepository, never()).delete(expiredToken);
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithExpiredTokenAndDisabledUser() {
        VerificationToken expiredToken = new VerificationToken();
        expiredToken.setExpirationTime(new Date(System.currentTimeMillis() - 1000000));
        Users user = new Users();
        user.setEnabled(false);
        expiredToken.setUser(user);

        when(tokenRepository.findByToken(anyString())).thenReturn(expiredToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("Token already expired", result);
        verify(tokenRepository).delete(expiredToken);
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithValidTokenAndDisabledUser() {
        VerificationToken validToken = new VerificationToken();
        Users user = new Users();
        user.setEnabled(false);
        validToken.setUser(user);

        when(tokenRepository.findByToken(anyString())).thenReturn(validToken);
        when(userRepository.save(any(Users.class))).thenReturn(new Users());

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("valid", result);
        assertTrue(validToken.getUser().isEnabled());
    }

    @Test
    public void testValidateTokenWithNullExpirationTime() {
        VerificationToken validToken = new VerificationToken();
        Users user = new Users();
        user.setEnabled(false);
        validToken.setUser(user);
        validToken.setExpirationTime(null);

        when(tokenRepository.findByToken(anyString())).thenReturn(validToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("Token expiration time is missing", result);
        verify(tokenRepository, never()).delete(any(VerificationToken.class));
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithValidTokenAndExpirationTimeInTheFuture() {
        VerificationToken validToken = new VerificationToken();
        Users user = new Users();
        user.setEnabled(false);
        validToken.setUser(user);
        validToken.setExpirationTime(new Date(System.currentTimeMillis() + 1000000));

        when(tokenRepository.findByToken(anyString())).thenReturn(validToken);
        when(userRepository.save(any(Users.class))).thenReturn(new Users());

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("valid", result);
        assertTrue(validToken.getUser().isEnabled());
    }

    @Test
    public void testValidateTokenWithExpiredTokenAndNullUser() {
        VerificationToken expiredToken = new VerificationToken();
        expiredToken.setExpirationTime(new Date(System.currentTimeMillis() - 1000000));
        expiredToken.setUser(null);

        when(tokenRepository.findByToken(anyString())).thenReturn(expiredToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("Token already expired", result);
        verify(tokenRepository).delete(expiredToken);
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    public void testValidateTokenWithValidTokenAndNullUser() {
        VerificationToken validToken = new VerificationToken();
        validToken.setUser(null);

        when(tokenRepository.findByToken(anyString())).thenReturn(validToken);

        String result = userService.validateaToken("ddff5da1-6d6d-4139-84b2-55b4ae1e801d");

        assertEquals("Invalid verification token", result);
        verify(tokenRepository, never()).delete(any(VerificationToken.class));
        verify(userRepository, never()).save(any(Users.class));
    }

}
