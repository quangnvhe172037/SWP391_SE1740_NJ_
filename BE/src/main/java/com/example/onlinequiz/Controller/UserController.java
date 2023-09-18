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

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    @Autowired
    private final UserServiceImpl userService;

    @GetMapping
    public ResponseEntity<List<Users>> getUsers() {
        List<Users> users = new ArrayList<>();
        users = userService.getUsers();
        return ResponseEntity.ok(users);
    }
}
