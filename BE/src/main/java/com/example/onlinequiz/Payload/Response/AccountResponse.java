package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AccountResponse {
    private String firstName, lastName, email, mobile, role;
    boolean gender, isEnabled;
}
