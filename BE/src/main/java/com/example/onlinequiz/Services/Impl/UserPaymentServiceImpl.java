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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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


    @Override
    public List<Long> countPaymentsByMonthsInYear(int year) {
        List<Long> monthlyCounts = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, year);
            calendar.set(Calendar.MONTH, i - 1);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date startOfMonth = calendar.getTime();

            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date endOfMonth = calendar.getTime();

            long count = userPaymentRepository.countPaymentsInMonth(startOfMonth, endOfMonth);
            monthlyCounts.add(count);
        }
        return monthlyCounts;
    }

    @Override
    public List<Long> calculatePriceByMonthsInYear(int year) {
        List<Long> monthlyPrices = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, year);
            calendar.set(Calendar.MONTH, i - 1);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            Date startOfMonth = calendar.getTime();

            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            Date endOfMonth = calendar.getTime();

            Long price = userPaymentRepository.calculatePriceInMonth(startOfMonth, endOfMonth);
            monthlyPrices.add(price != null ? price : 0L);
        }
        return monthlyPrices;
    }


}
