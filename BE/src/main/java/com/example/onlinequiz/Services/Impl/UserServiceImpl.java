package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Exception.UserAlreadyExistException;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.RegistrationRequest;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Repo.VerificationTokenRepository;
import com.example.onlinequiz.Services.UserService;
import com.example.onlinequiz.Token.VerificationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final VerificationTokenRepository tokenRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Override
    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Users registerUser(RegistrationRequest request) {
        Optional<Users> user = this.findbyEmail(request.email());
        if(user.isPresent()){
            throw new UserAlreadyExistException("User with email " + request.email() + " already exist!");
        }
        var newUser = new Users();
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setRole(request.role());
        return userRepository.save(newUser);
    }

    @Override
    public Optional<Users> findbyEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void saveUserVerificationToken(Users theUser, String token) {
        var verificationToken = new VerificationToken(token, theUser);
        tokenRepository.save(verificationToken);
    }

    @Override
    public String validateaToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if(token == null){
            return "Innvalid verification token";
        }
        Users user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if(token.getTokenExpirationTime().getTime() - calendar.getTime().getTime() <= 0){
            tokenRepository.delete(token);
            return "Token already expired";
        }
        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
    }
}
