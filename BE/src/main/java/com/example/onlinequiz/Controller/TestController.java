package com.example.onlinequiz.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:8081", allowedHeaders = "*")
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/customer")
    public String testCustomer(){
        return "customer";
    }

    @GetMapping("/expert")
    public String testExpert(){
        return "expert";
    }

    @GetMapping("/admin")
    public String testAdmin(){
        return "admin";
    }
}
