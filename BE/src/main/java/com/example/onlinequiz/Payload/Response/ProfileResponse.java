package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    public String firstName, lastName, email, mobile, password;
    public boolean gender;
}
