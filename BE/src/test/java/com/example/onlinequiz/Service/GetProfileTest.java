package com.example.onlinequiz.Service;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.ProfileResponse;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

public class GetProfileTest {
    @Mock
    private UserService userService;
    @Mock
    private UserRepository userRepository;
    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testGetUserProfileByEmailValid() {
        String email = "test@example.com";
        Users testUser = new Users();
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
        testUser.setEmail(email);
        testUser.setGender(true);
        testUser.setPassword("hashed_password");
        testUser.setMobile("1234567890");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertEquals(testUser.getFirstName(), response.getFirstName());
        assertEquals(testUser.getLastName(), response.getLastName());
        assertEquals(testUser.getEmail(), response.getEmail());
        assertEquals(testUser.isGender(), response.isGender());
        assertEquals(testUser.getPassword(), response.getPassword());
        assertEquals(testUser.getMobile(), response.getMobile());
    }

    @Test
    void testGetUserProfileByEmailNonExistentUser() {
        String email = "nonexistent@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertNull(response);
    }

    @Test
    void testGetUserProfileByEmailWithEmptyName() {
        String email = "test@example.com";
        Users testUser = new Users();
        testUser.setEmail(email);
        testUser.setGender(true);
        testUser.setPassword("hashed_password");
        testUser.setMobile("1234567890");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertEquals("", response.getFirstName());
        assertEquals("", response.getLastName());
    }

    @Test
    void testGetUserProfileByEmailWithNullGender() {
        String email = "test@example.com";
        Users testUser = new Users();
        testUser.setEmail(email);
        testUser.setPassword("hashed_password");
        testUser.setMobile("1234567890");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertEquals(false, response.isGender());
    }

    @Test
    void testGetUserProfileByEmailWithNullPassword() {
        String email = "test@example.com";
        Users testUser = new Users();
        testUser.setEmail(email);
        testUser.setGender(true);
        testUser.setMobile("1234567890");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertNull(response.getPassword());
    }

    @Test
    void testGetUserProfileByEmailWithEmptyMobile() {
        String email = "test@example.com";
        Users testUser = new Users();
        testUser.setEmail(email);
        testUser.setGender(true);
        testUser.setPassword("hashed_password");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertEquals("", response.getMobile());
    }

    @Test
    void testGetUserProfileByEmailWithNullUser() {
        String email = "test@example.com";

        when(userRepository.findByEmail(email)).thenReturn(null);

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertNull(response);
    }
    @Test
    void testGetUserProfileByEmailEmptyUser() {
        String email = "test@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertNull(response);
    }

    @Test
    void testGetUserProfileByEmailWithNullEmail() {
        String email = null;

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertNull(response);
    }
    @Test
    void testGetUserProfileByEmailWithMissingAttributes() {
        String email = "test@example.com";
        Users testUser = new Users();
        testUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertEquals("", response.getFirstName());
        assertEquals("", response.getLastName());
        assertEquals(false, response.isGender());
        assertNull(response.getPassword());
        assertEquals("", response.getMobile());
    }

    @Test
    void testGetUserProfileByEmailWithEmptyEmail() {
        String email = "";
        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertNull(response);
    }

    @Test
    void testGetUserProfileByEmailWithMissingAttributesAndEmptyEmail() {
        String email = "";
        Users testUser = new Users();
        testUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        ProfileResponse response = userService.getUserProfileByEmail(email);

        assertEquals("", response.getFirstName());
        assertEquals("", response.getLastName());
        assertEquals(false, response.isGender());
        assertNull(response.getPassword());
        assertEquals("", response.getMobile());
    }

}
