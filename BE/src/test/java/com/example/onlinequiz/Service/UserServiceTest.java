package com.example.onlinequiz.Service;

import com.example.onlinequiz.Exception.InvalidRoleException;
import com.example.onlinequiz.Exception.PasswordMismatchException;
import com.example.onlinequiz.Exception.UserAlreadyExistException;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Request.RegistrationRequest;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class UserServiceTest {
    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testRegisterUser_UserAlreadyExists() {
        // Giả lập một yêu cầu đăng ký với email đã tồn tại
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "johndoe@example.com", "password", "USER", true);

        // Giả lập UserRepository trả về một Optional chứa người dùng đã tồn tại
        Users existingUser = new Users();
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(existingUser));

        // Kiểm tra rằng khi gọi phương thức registerUser với yêu cầu có email đã tồn tại
        // nó ném ngoại lệ UserAlreadyExistException
        assertThrows(UserAlreadyExistException.class, () -> userService.registerUser(request));
    }

    @Test
    public void testRegisterUser_WithValidRequest_ShouldReturnUser() {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "johndoe@example.com", "password", "USER", true);

        Users newUser = new Users();
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setEmail(request.email());
        newUser.setPassword("encodedPassword"); // Mã hóa mật khẩu
        newUser.setRole(request.role());

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());
        when(userRepository.save(any(Users.class))).thenReturn(newUser);
        when(passwordEncoder.encode(request.password())).thenReturn("encodedPassword");

        // Act
        Users registeredUser = userService.registerUser(request);

        // Assert
        assertNotNull(registeredUser);
        assertEquals(newUser.getFirstName(), registeredUser.getFirstName());
        assertEquals(newUser.getLastName(), registeredUser.getLastName());
        assertEquals(newUser.getEmail(), registeredUser.getEmail());
        assertEquals(newUser.getRole(), registeredUser.getRole());
        // Kiểm tra thêm các giá trị khác ở đây nếu cần
    }

    @Test
    public void testRegisterUser_WithExistingUser_ShouldThrowException() {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "johndoe@example.com", "password", "USER", true);

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(new Users()));

        // Act and Assert
        assertThrows(UserAlreadyExistException.class, () -> userService.registerUser(request));
    }

    @Test
    public void testRegisterUser_WithNullRequest_ShouldThrowException() {
        // Arrange
        RegistrationRequest request = null;

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> userService.registerUser(request));
    }

    @Test
    public void testRegisterUser_WithDifferentPassword_ShouldThrowException() {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "johndoe@example.com", "password1", "USER", false);

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(PasswordMismatchException.class, () -> userService.registerUser(request));
    }

    @Test
    public void testRegisterUser_WithInvalidRole_ShouldThrowException() {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "johndoe@example.com", "password", "INVALID_ROLE", false);

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(InvalidRoleException.class, () -> userService.registerUser(request));
    }

}







