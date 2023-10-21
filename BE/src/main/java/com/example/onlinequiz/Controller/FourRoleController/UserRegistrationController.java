package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Services.UserRegistrationService;
import com.example.onlinequiz.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/myregistration")
public class UserRegistrationController {
    @Autowired
    public final UserRegistrationService registrationService;

    @Autowired
    public final UserService userService;

    @GetMapping("/myRes")
    @ResponseBody
    public ResponseEntity<List<UserPayment>> getUserRegistration(
            @RequestParam Long userid
    ) {
        System.out.println(userid);
        Users u = userService.getUserById(userid);
        List<UserPayment> userPaymentList = registrationService.getUserPayment(u);
        if (userPaymentList == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(userPaymentList);
        }
    }
}
