package com.example.onlinequiz.Payload;

import com.example.onlinequiz.Model.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotEmpty
    @Size(min = 3, max = 20)
    private String username;

    @NotEmpty
    @Size(max = 50)
    private String email;

    private Set<String> role;

    @NotEmpty
    @Size(min = 8, max = 40)
    private String password;


}
