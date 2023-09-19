package com.example.onlinequiz.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*") // Cho phép CORS từ mọi nguồn
@RestController // Đánh dấu đây là một Controller
@RequestMapping("/home") // Định nghĩa đường dẫn cơ sở cho Controller
@RequiredArgsConstructor // Tự động tạo constructor với tham số cho các trường được đánh dấu là final
public class HomeController {
    @GetMapping("/")
    public String home(){
        return "home";
    }
}
