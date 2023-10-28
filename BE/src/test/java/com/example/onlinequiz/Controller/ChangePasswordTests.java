//package com.example.onlinequiz.Controller;
//
//import com.example.onlinequiz.Controller.FourRoleController.ChangePasswordController;
//import com.example.onlinequiz.Payload.Request.PasswordChangeRequest;
//import com.example.onlinequiz.Security.UserDetailsServiceImpl;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//
//public class ChangePasswordTests {
//
//    private ChangePasswordController controller;
//    private UserDetailsServiceImpl userDetailsService;
//    private BCryptPasswordEncoder passwordEncoder;
//
//    @BeforeEach
//    public void setUp() {
//        userDetailsService = mock(UserDetailsServiceImpl.class);
//        passwordEncoder = new BCryptPasswordEncoder();
//        controller = new ChangePasswordController();
//    }
//
//    @Test
//    public void testChangePassword_Successful() {
//        // Arrange
//        String email = "test@example.com";
//        String oldPassword = "oldPassword";
//        String newPassword = "newPassword";
//
//        UserDetails userDetails = User.withUsername("test")
//                .password(passwordEncoder.encode(oldPassword))
//                .roles("USER")
//                .build();
//
//        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(userDetails);
//
//        PasswordChangeRequest request = new PasswordChangeRequest();
//        request.setEmail(email);
//        request.setOldPassword(oldPassword);
//        request.setNewPassword(newPassword);
//
//        // Act
//        ResponseEntity<String> response = controller.changePassword(request);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals("Password change successfully!", response.getBody());
//    }
//
//    @Test
//    public void testChangePassword_Unsuccessful() {
//        // Arrange
//        String email = "quangnv1911@gmail.com";
//        String oldPassword = "oldPassword";
//        String incorrectOldPassword = "incorrectOldPassword";
//        String newPassword = "newPassword";
//
//        UserDetails userDetails = User.withUsername("test")
//                .password(passwordEncoder.encode(oldPassword))
//                .roles("USER")
//                .build();
//
//        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(userDetails);
//
//        PasswordChangeRequest request = new PasswordChangeRequest();
//        request.setEmail(email);
//        request.setOldPassword(incorrectOldPassword); // Wrong old password
//        request.setNewPassword(newPassword);
//
//        // Act
//        ResponseEntity<String> response = controller.changePassword(request);
//
//        // Assert
//        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
//        assertEquals("Something wrong in email or password", response.getBody());
//    }
//}
//
