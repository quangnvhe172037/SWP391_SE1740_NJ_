package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Request.UpdateProfileRequest;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import com.example.onlinequiz.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/update")
@AllArgsConstructor
public class UpdateController {
    private final UserService userService;
    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestBody UpdateProfileRequest request){
        userService.updateUserProfile(email, request);
        return ResponseEntity.ok("Update succes");
    }
}