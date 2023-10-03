package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    public String firstName;
    public String lastName;
    public String mobile;
    public boolean gender;
}
