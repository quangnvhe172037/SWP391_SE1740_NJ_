package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String to, String subject, String text) {
        // Tạo một đối tượng SimpleMailMessage để gửi email
        SimpleMailMessage message = new SimpleMailMessage();

        // Đặt người gửi
        message.setFrom("Quizzi's Support <quanpdhe170415@fpt.edu.vn>");

        // Đặt người nhận
        message.setTo(to);

        // Đặt chủ đề email
        message.setSubject(subject);

        // Đặt nội dung email
        message.setText(text);

        // Gửi email bằng JavaMailSender
        javaMailSender.send(message);
    }
}
