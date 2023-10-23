package com.example.onlinequiz.Controller.AdminController;

import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Services.UserRegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/user-registration-list/{id}")
    public ResponseEntity<?> findOne(@PathVariable int id) {
        return ResponseEntity.ok(
                userRegistrationService.findByBillID(id));
    }

    @PutMapping("/user-registration-list/{id}")
    public ResponseEntity<?> update(
            @PathVariable int id,
            @RequestBody Map<String, Object> requestData
    ) {
        boolean status = (Boolean) requestData.get("status");
        String notify = (String) requestData.get("notify");
        UserPayment userPayment = userRegistrationService.findByBillID(id);
//        userPayment.setStatus(npm sstatus);
        userPayment.setNotify(notify);
        return ResponseEntity.ok(userRegistrationService.save(userPayment));
    }
}