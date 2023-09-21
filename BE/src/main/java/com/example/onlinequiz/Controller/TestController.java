package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Jwt.JwtProvider;
import com.example.onlinequiz.Payload.LoginRequest;
import com.example.onlinequiz.Payload.LoginResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    private final JwtProvider jwtProvider;

    @GetMapping("/all")
    public String allAccess() {
        return "Home";
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            String token = jwtProvider.generateToken(String.valueOf(userDetails));

            String role = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority).findFirst().orElse("");
            System.out.println(token);
            return ResponseEntity.ok(new LoginResponse(token, loginRequest.getEmail(), role));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/customer")
    public String home() {
        return "Home after login for customer";
    }
    @GetMapping("/admin")
    public String admin() {
        return "Home after login for admin";
    }
    @GetMapping("/expert")
    public String expert() {
        return "Home after login for expert";
    }
}
