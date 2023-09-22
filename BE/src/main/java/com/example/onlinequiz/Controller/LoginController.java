package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Services.Impl.JWTService;
import com.example.onlinequiz.Payload.JwtAuthenticationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/authenticate")
public class LoginController {
    @Autowired
    private JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    @PostMapping
    public String getTokenForAuthenticateUser(@RequestBody JwtAuthenticationRequest authRequest){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(authRequest.getUserName());
        } else {
            throw new UsernameNotFoundException("Invalid user credential");
        }
    }
}
