package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.RegistrationRequest;
import com.example.onlinequiz.Token.VerificationToken;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<Users> getUsers();

    Users registerUser(RegistrationRequest request);

    Optional<Users> findbyEmail(String email);

    void saveUserVerificationToken(Users theUser, String verificationToken);

    String validateaToken(String theToken);


}
