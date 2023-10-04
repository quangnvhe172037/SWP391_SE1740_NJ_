package com.example.onlinequiz.Controller.PublicController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/home")
public class HomeController {
    @GetMapping
    public String home() {
        return "Home";
    }
}
