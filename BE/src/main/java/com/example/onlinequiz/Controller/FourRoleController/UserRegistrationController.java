package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Services.UserRegistrationService;
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

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<UserPayment>> getUserRegistration(){
        List<UserPayment> userPaymentList = registrationService.getUserPaymentList();
        return ResponseEntity.ok(userPaymentList);
    }
}
