package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.CourseCheckoutResponse;
import com.example.onlinequiz.Payload.Response.PaymentResponse;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public interface UserPaymentService {

    boolean checkPay(Subjects s, Users u);
    List<Long> calculatePriceByMonthsInYear(int year);
    List<Long> countPaymentsByMonthsInYear(int year) ;

    CourseCheckoutResponse getCourseCheckout(Long subjectId);

    UserPayment addNewPayment(Long userId, Long subjectId, Long preId);

    PaymentResponse createNewVnPayPayment(Long price) throws UnsupportedEncodingException;
}
