package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;

import java.util.List;

public interface UserRegistrationService {

    List<UserPayment> findAll();
    List<UserPayment> getUserPayment(Users u);

    public UserPayment findByBillID (int billID);

    public UserPayment save(UserPayment userPayment);


}
