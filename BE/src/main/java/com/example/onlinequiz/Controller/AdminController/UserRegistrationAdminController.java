package com.example.onlinequiz.Controller.AdminController;
import com.example.onlinequiz.Services.UserRegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class UserRegistrationAdminController {
    @Autowired
    private UserRegistrationService userRegistrationService;

    @GetMapping("/user-registration-list")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(
                userRegistrationService.findAll());
    }
}