package com.example.onlinequiz.Payload.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginRequest {
    @NotEmpty
    private String email;
    @NotEmpty
    private String password;
}
