package com.example.onlinequiz.Service;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Request.UpdateProfileRequest;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

public class ProfileTest {
    @Mock
    private UserService userService;
    @Mock
    private UserRepository userRepository;
    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testUpdateUserProfileValidName() {
        String email = "quanpdhe170415@fpt.edu.vn";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("NewFirstName");
        request.setLastName("NewLastName");

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        userService.updateUserProfile(email, request);

        verify(userRepository, times(1)).save(existingUser);
        assertEquals(request.getFirstName(), existingUser.getFirstName());
        assertEquals(request.getLastName(), existingUser.getLastName());
    }
    @Test
    void testUpdateUserProfileValidPhoneAndGender() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setMobile("1234567890");
        request.setGender(true);

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        userService.updateUserProfile(email, request);

        verify(userRepository, times(1)).save(existingUser);
        assertEquals(request.getMobile(), existingUser.getMobile());
        assertEquals(request.getGender(), existingUser.isGender());
    }
    @Test
    void testUpdateUserProfileEmptyFirstName() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("");  // Tên rỗng

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }
    @Test
    void testUpdateUserProfileUserNotFound() {
        String email = "nonexistent@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("NewFirstName");

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }
    @Test
    void testUpdateUserProfileEmptyGender() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setGender(null);  // Giới tính rỗng

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }
    @Test
    void testUpdateUserProfileEmptyPhone() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setMobile("");  // Số điện thoại rỗng

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }
    @Test
    void testUpdateUserProfileNoChanges() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();  // Không có thay đổi

        Users existingUser = new Users();
        existingUser.setEmail(email);
        existingUser.setFirstName("InitialFirstName");
        existingUser.setLastName("InitialLastName");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        userService.updateUserProfile(email, request);

        verify(userRepository, never()).save(any());
    }
    @Test
    void testUpdateUserProfileEmptyLastName() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setLastName("");  // Họ rỗng

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }

    @Test
    void testUpdateUserProfileEmptyPhoneAndGender() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setMobile("");  // Số điện thoại rỗng
        request.setGender(null);  // Giới tính rỗng

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }

    @Test
    void testUpdateUserProfileEmptyFirstNameAndLastName() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("");  // Tên rỗng
        request.setLastName("");   // Họ rỗng

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, request);
        });

        verify(userRepository, never()).save(any());
    }

    @Test
    void testUpdateUserProfileWithNullRequest() {
        String email = "test@example.com";

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserProfile(email, null);
        });

        verify(userRepository, never()).save(any());
    }

    @Test
    void testUpdateUserProfileValidNameAndPhone() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("NewFirstName");
        request.setLastName("NewLastName");
        request.setMobile("1234567890");

        Users existingUser = new Users();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));

        userService.updateUserProfile(email, request);

        verify(userRepository, times(1)).save(existingUser);
        assertEquals(request.getFirstName(), existingUser.getFirstName());
        assertEquals(request.getLastName(), existingUser.getLastName());
        assertEquals(request.getMobile(), existingUser.getMobile());
    }

}
