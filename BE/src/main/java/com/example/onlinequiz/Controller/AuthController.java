package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Enum.ERole;
import com.example.onlinequiz.Model.Role;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.LoginRequest;
import com.example.onlinequiz.Payload.MessageResponse;
import com.example.onlinequiz.Payload.SignupRequest;
import com.example.onlinequiz.Payload.UserInfoResponse;
import com.example.onlinequiz.Repo.RoleRepository;
import com.example.onlinequiz.Repo.UsersRepository;
import com.example.onlinequiz.Security.jwt.JwtUltis;
import com.example.onlinequiz.Security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUltis jwtUltis;

    @Autowired
    PasswordEncoder encoder;
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // Bắt đầu quá trình xác thực người dùng

        //Thực hiện xác thực người dùng bằng tên đăng nhập và mật khẩu
        Authentication authentication = authenticationManager.authenticate(new
                UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));

        // Đặt thông tin xác thực vào SecurityContextHolder để sử dụng sau này
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //Lấy thông tin chi tiết của người dùng đã xác thực
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Tạo một cookie JWT để gửi cho người dùng
        ResponseCookie jwtCookie = jwtUltis.generateJwtCookie(userDetails);

        //Lấy danh sách các vai trò của người dùng
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        //Trả về phản hồi HTTP với cookie JWT và thông tin người dùng
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        // Kiểm tra xem tên đăng nhập đã tồn tại chưa
        if (usersRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already exist"));
        }
        // Kiểm tra xem email đã tồn tại chưa
        else if (usersRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already exist"));
        }

        // Tạo người dùng mới với thông tin từ SignupRequest
        Users users = new Users(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()));

        // Xác định vai trò của người dùng
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            // Nếu không chỉ định vai trò, mặc định là USER
            Role userRole = roleRepository.findByName(ERole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        // Nếu là admin, thêm vai trò ADMIN
                        Role adminRole = roleRepository.findByName(ERole.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        // Mặc định là USER nếu không phân loại được vai trò
                        Role userRole = roleRepository.findByName(ERole.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                }
            });
        }

        // Gán vai trò cho người dùng và lưu vào cơ sở dữ liệu
        users.setRoles(roles);
        usersRepository.save(users);

        // Trả về phản hồi khi đăng ký thành công
        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        // Lấy ra một cookie JWT trống để đăng xuất người dùng
        ResponseCookie cookie = jwtUltis.getCleanJwtCookie();

        // Trả về phản hồi thành công và gửi cookie để đăng xuất người dùng
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out"));
    }


}
