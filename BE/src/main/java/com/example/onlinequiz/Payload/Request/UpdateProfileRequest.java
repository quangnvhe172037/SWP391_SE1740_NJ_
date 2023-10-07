package com.example.onlinequiz.Payload.Request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class UpdateProfileRequest {
    public String firstName, lastName, mobile;
    public Boolean gender;
}
