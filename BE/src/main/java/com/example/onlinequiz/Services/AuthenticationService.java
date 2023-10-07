package com.example.onlinequiz.Services;

import com.example.onlinequiz.Payload.Response.AuthenticationResponse;
import com.example.onlinequiz.Payload.Request.LoginRequest;

public interface AuthenticationService {
    public AuthenticationResponse authenticate(LoginRequest request);
}
