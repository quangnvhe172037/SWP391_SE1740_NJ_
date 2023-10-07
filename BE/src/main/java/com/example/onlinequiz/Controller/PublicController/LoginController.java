package com.example.onlinequiz.Controller.PublicController;

import com.example.onlinequiz.Services.Impl.JWTService;
import com.example.onlinequiz.Payload.Request.JwtAuthenticationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/authenticate")
public class LoginController {

    // Inject đối tượng JWTService để tạo token
    @Autowired
    private JWTService jwtService;

    // Inject AuthenticationManager để xác thực người dùng
    private final AuthenticationManager authenticationManager;

    // Xử lý yêu cầu POST để nhận token cho việc xác thực người dùng
    @PostMapping
    public String getTokenForAuthenticateUser(@RequestBody JwtAuthenticationRequest authRequest) {

        // Thực hiện quá trình xác thực người dùng
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));

        // Kiểm tra xem người dùng có được xác thực thành công không
        if (authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String userRole = userDetails.getAuthorities().iterator().next().getAuthority();
            // Nếu xác thực thành công, tạo và trả về token
            return jwtService.generateToken(authRequest.getUserName(), userRole);
        } else {
            // Nếu xác thực thất bại, ném ra ngoại lệ UsernameNotFoundException
            throw new UsernameNotFoundException("Invalid user credential");
        }
    }
}
