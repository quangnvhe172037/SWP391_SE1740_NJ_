package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.UserPaymentRepository;
import com.example.onlinequiz.Services.UserPaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;

@Service
@Transactional
@RequiredArgsConstructor
public class UserPaymentServiceImpl implements UserPaymentService {

    @Autowired
    private final UserPaymentRepository userPaymentRepository;


    @Override
    public boolean checkPay(Subjects s, Users u) {

        return userPaymentRepository.existsBySubjectAndUsers(s, u);
    }
}
