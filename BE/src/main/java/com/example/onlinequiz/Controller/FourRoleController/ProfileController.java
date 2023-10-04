package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Request.UpdateProfileRequest;
import com.example.onlinequiz.Payload.Response.ProfileResponse;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private UserServiceImpl userService;

    // Endpoint để lấy thông tin cá nhân của người dùng dựa trên địa chỉ email
    @GetMapping("/{email}")
    public ResponseEntity<ProfileResponse> getUserProfile(@PathVariable String email) {
        // Gọi userService để lấy thông tin cá nhân của người dùng và trả về ứng dụng
        ProfileResponse profileResponse = userService.getUserProfileByEmail(email);
        if (profileResponse != null) {
            return ResponseEntity.ok(profileResponse);
        } else {
            // Trả về mã HTTP NOT_FOUND nếu không tìm thấy thông tin cá nhân
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
