package com.example.onlinequiz.Controller.AdminController;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.AccountResponse;
import com.example.onlinequiz.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AccountController {
    @Autowired
    private final UserService userService;

    // Endpoint để lấy danh sách tất cả các tài khoản người dùng
    @GetMapping("/all-accounts")
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        // Gọi userService để lấy danh sách tài khoản và trả về ứng dụng
        List<AccountResponse> accountResponses = userService.getAllAccounts();
        if (accountResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            //return về account
            return ResponseEntity.ok(accountResponses);
        }
    }

    // Endpoint để cập nhật tài khoản người dùng dựa trên email
    @PutMapping("/update/{email}")
    public ResponseEntity<Users> updateAccount(
            @PathVariable String email,
            @RequestParam String editedRole,
            @RequestParam boolean editedEnabled
    ) {
        // Gọi userService để cập nhật thông tin tài khoản và trả về ứng dụng
        Users updatedAccount = userService.updateAccount(email, editedRole, editedEnabled);
        if (updatedAccount != null) {
            return ResponseEntity.ok(updatedAccount);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/get/expert")
    public ResponseEntity<List<Users>> getAllExpert(

    ) {
        List<Users> usersList = userService.getAllUserByRole("Expert");
        if (usersList != null) {
            return ResponseEntity.ok(usersList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
