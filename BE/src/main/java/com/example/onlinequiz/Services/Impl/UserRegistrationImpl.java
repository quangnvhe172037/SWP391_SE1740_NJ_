package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Repo.UserRegistrationsRepository;
import com.example.onlinequiz.Services.UserRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UserRegistrationImpl implements UserRegistrationService {
    @Autowired
    private final UserRegistrationsRepository userRegistrationsRepository;

    @Override
    public List<UserPayment> getUserPaymentList(){
        return  userRegistrationsRepository.findAll();
    }

}
