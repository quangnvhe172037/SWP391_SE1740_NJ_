package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Request.RegistrationRequest;
import com.example.onlinequiz.Payload.Request.UpdateProfileRequest;
import com.example.onlinequiz.Payload.Response.AccountResponse;
import com.example.onlinequiz.Payload.Response.ProfileResponse;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<Users> getUsers();

    Users registerUser(RegistrationRequest request);

    Optional<Users> findbyEmail(String email);

    void saveUserVerificationToken(Users theUser, String verificationToken);

    String validateaToken(String theToken);

    ProfileResponse getUserProfileByEmail(String email);

    void updateUserProfile(String email, UpdateProfileRequest request);

    List<AccountResponse> getAllAccounts();

    Users updateAccount(String email, String editedRole, boolean editedEnabled);

    Users getUserByEmail(String email);

    Users getUserById(Long id);

    Long countAllUser();

    Long countNewUser();
}
