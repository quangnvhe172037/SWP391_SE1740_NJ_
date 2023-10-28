package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public interface UserPaymentService {

    boolean checkPay(Subjects s, Users u);
    List<Long> calculatePriceByMonthsInYear(int year);
    List<Long> countPaymentsByMonthsInYear(int year) ;
}
