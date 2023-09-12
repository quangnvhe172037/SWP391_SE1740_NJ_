package com.example.onlinequiz.Payload;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
}
