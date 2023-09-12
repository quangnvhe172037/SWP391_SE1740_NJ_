package com.example.onlinequiz.Payload;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequest {
    @NotEmpty
    private String username;

    @NotEmpty
    private String password;

}
