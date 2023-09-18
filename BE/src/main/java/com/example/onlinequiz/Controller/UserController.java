package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController // Đánh dấu đây là một Controller cho việc xử lý HTTP requests và trả về JSON
@RequiredArgsConstructor // Tự động tạo constructor với tham số cho các trường được đánh dấu là final
@RequestMapping("/users") // Định nghĩa đường dẫn cơ sở cho Controller
public class UserController {
    @Autowired
    private final UserServiceImpl userService; // Sử dụng Spring để tiêm UserServiceImpl vào Controller

    @GetMapping // Xử lý các yêu cầu GET đến /users
    public ResponseEntity<List<Users>> getUsers() {
        List<Users> users = new ArrayList<>();
        users = userService.getUsers(); // Gọi UserService để lấy danh sách người dùng
        return ResponseEntity.ok(users); // Trả về danh sách người dùng dưới dạng JSON
    }
}

