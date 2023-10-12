package com.example.onlinequiz.Controller.PublicController;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.Impl.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailServiceImpl emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
        // Lấy địa chỉ email từ request body
        String email = requestBody.get("email");

        // Kiểm tra xem có người dùng nào có địa chỉ email này trong cơ sở dữ liệu không
        Optional<Users> usersOptional = userRepository.findByEmail(email);

        if (usersOptional.isPresent()) {
            // Nếu tìm thấy người dùng, thực hiện các bước sau:
            Users users = usersOptional.get();

            // Tạo mật khẩu mới
            String newPassword = generateRandomPassword();

            // Cập nhật mật khẩu mới trong cơ sở dữ liệu
            users.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(users);

            // Gửi email chứa mật khẩu mới đến người dùng
            String subject = "[Notification] - New Password For Quizzi";
            String message = "Hi, " + email +
                    ". Here is your new password, please DO NOT SHARE to anyone. New password is: " + newPassword +
                    ". Please login to change password.";
            emailService.sendEmail(email, subject, message);

            return ResponseEntity.ok("New password was sent to your email");
        } else {
            // Nếu không tìm thấy người dùng, trả về lỗi 401 (UNAUTHORIZED) với thông báo lỗi
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Can not find account");
        }
    }

    private String generateRandomPassword() {
        // Tạo một mật khẩu ngẫu nhiên, ví dụ: 10 ký tự bất kỳ
        String characters = "AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
        StringBuilder newPassword = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 10; i++) {
            char randomChar = characters.charAt(random.nextInt(characters.length()));
            newPassword.append(randomChar);
        }

        return newPassword.toString();
    }
}
