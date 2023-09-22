package com.example.onlinequiz.Services;

import com.example.onlinequiz.Payload.AuthenticationResponse;
import com.example.onlinequiz.Payload.LoginRequest;

public interface AuthenticationService {
    public AuthenticationResponse authenticate(LoginRequest request);
}
