package com.example.onlinequiz.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestAuthorizationController {
    @GetMapping("/all")
    public String allAccess() {
        // Phương thức này có thể được truy cập bởi bất kỳ ai, không cần xác thực.
        return "Public Content";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userAccess() {
        // Phương thức này yêu cầu người dùng phải có vai trò 'USER' hoặc 'ADMIN' để truy cập.
        return "User Content";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        // Phương thức này yêu cầu người dùng phải có vai trò 'ADMIN' để truy cập.
        return "Admin Board.";
    }

}
