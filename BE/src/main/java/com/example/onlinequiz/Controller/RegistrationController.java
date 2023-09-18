package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Event.RegistrationCompleteEvent;
import com.example.onlinequiz.Exception.UserAlreadyExistException;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.RegistrationRequest;
import com.example.onlinequiz.Repo.VerificationTokenRepository;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import com.example.onlinequiz.Token.VerificationToken;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
public class RegistrationController {
    @Autowired
    private final UserServiceImpl userService;
    @Autowired
    private final ApplicationEventPublisher publisher;

    @Autowired
    private final VerificationTokenRepository tokenRepository;
    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request, final HttpServletRequest httpServletRequest){
        Map<String, Object> response = new HashMap<>();
        try {
            Users user = userService.registerUser(request);
            publisher.publishEvent(new RegistrationCompleteEvent(user, applicatioUrl(httpServletRequest)));

            response.put("success", true);
            response.put("message", "Register success! Please check your email for registration");
            return ResponseEntity.ok(response);
        } catch (UserAlreadyExistException e){
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserAlreadyExistException(e.getMessage()));
        }
    }

    @GetMapping("/verifyEmail")
    public String verifyEmail(@RequestParam("token") String token){
        VerificationToken theToken = tokenRepository.findByToken(token);
        if(theToken.getUser().isEnabled()){
            return "This account has already been verified, please login";
        }
        String verificationResult = userService.validateaToken(token);
        if(verificationResult.equalsIgnoreCase("valid")){
            return "Email verified successfully. Now you can login to your account";
        }
        return "Invalid verification token";
    }
    private String applicatioUrl(HttpServletRequest httpServletRequest) {
        return "http://"+httpServletRequest.getServerName()+":"+httpServletRequest.getServerPort()+httpServletRequest.getContextPath();
    }

}
