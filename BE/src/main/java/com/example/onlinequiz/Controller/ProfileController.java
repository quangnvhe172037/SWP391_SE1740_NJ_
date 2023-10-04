package com.example.onlinequiz.Controller;

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

    @GetMapping("/{email}")
    public ResponseEntity<ProfileResponse> getUserProfile(@PathVariable String email){
        ProfileResponse profileResponse = userService.getUserProfileByEmail(email);
        if (profileResponse != null){
            return ResponseEntity.ok(profileResponse);
        } else {
            return (ResponseEntity<ProfileResponse>) ResponseEntity.status(HttpStatus.NOT_FOUND);
        }
    }


}
