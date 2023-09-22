package com.example.onlinequiz.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordChangeRequest {
    private String email;
    private String oldPassword;
    private String newPassword;
}
