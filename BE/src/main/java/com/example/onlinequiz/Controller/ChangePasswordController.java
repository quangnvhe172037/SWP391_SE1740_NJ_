package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Payload.PasswordChangeRequest;
import com.example.onlinequiz.Security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/change-password")
public class ChangePasswordController {
    @Autowired
    UserDetailsServiceImpl userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest){
        String email = passwordChangeRequest.getEmail();
        String oldPassword = passwordChangeRequest.getOldPassword();
        String newPassword = passwordChangeRequest.getNewPassword();

        UserDetails userDetails = userService.loadUserByUsername(email);
        if (userDetails != null && passwordEncoder.matches(oldPassword, userDetails.getPassword())){
            String encodedPassword = passwordEncoder.encode(newPassword);
            userService.updatePassword(email, encodedPassword);
            return ResponseEntity.ok("Password change success!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Something wrong in email or password");
        }
    }
}
