package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.UserRegistrationsRepository;
import com.example.onlinequiz.Services.UserRegistrationService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UserRegistrationImpl implements UserRegistrationService {
    @Autowired
    private final UserRegistrationsRepository userRegistrationsRepository;

    @Override
    public  List<UserPayment> findAll() {
        return userRegistrationsRepository.findAll();
    }

    public UserPayment findByBillID (int billID) {
        return userRegistrationsRepository.findByBillID(billID);
    }

    public UserPayment save(UserPayment userPayment) {return userRegistrationsRepository.save(userPayment);}

    @Override
    public List<UserPayment> getUserPayment(Users u) {
        List<UserPayment> listUserPayment = userRegistrationsRepository.findByUsersAndStatus(u, true);
        System.out.println(listUserPayment.toString());
        if(listUserPayment == null){
            return null;
        }else{
            return listUserPayment;
        }


    }
}
