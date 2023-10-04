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

    @GetMapping("/all-accounts")
    public ResponseEntity<List<AccountResponse>> getAllAccounts(){
        List<AccountResponse> accountResponses = userService.getAllAccounts();
        if(accountResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(accountResponses);
        }
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<Users> updateAccount(
            @PathVariable String email,
            @RequestParam String editedRole,
            @RequestParam boolean editedEnabled
    ){
        Users updatedAccount = userService.updateAccount(email, editedRole, editedEnabled);
        if(updatedAccount != null){
            return ResponseEntity.ok(updatedAccount);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
