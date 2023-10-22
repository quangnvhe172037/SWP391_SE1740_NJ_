package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;

public interface UserPaymentService {

    boolean checkPay(Subjects s, Users u);
}
