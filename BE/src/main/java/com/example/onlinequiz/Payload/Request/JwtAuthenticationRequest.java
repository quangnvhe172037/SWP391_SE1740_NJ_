package com.example.onlinequiz.Payload.Request;

import lombok.Data;

@Data
public class JwtAuthenticationRequest {
    private String userName;
    private String password;
}
