package com.example.onlinequiz.Service;


import com.example.onlinequiz.Services.Impl.EmailServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;
public class EmailServiceTest {
    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EmailServiceImpl emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void sendEmail() {
        // Tạo một đối tượng SimpleMailMessage để gửi email
        SimpleMailMessage message = new SimpleMailMessage();

        // Đặt người gửi
        message.setFrom("Quizzi's Support <quanpdhe170415@fpt.edu.vn>");

        // Đặt người nhận
        message.setTo("to@example.com");

        // Đặt chủ đề email
        message.setSubject("subject");

        // Đặt nội dung email
        message.setText("text");

        // Gọi phương thức sendEmail
        emailService.sendEmail("to@example.com", "subject", "text");

        // Kiểm tra xem phương thức send của javaMailSender đã được gọi chưa
        verify(javaMailSender, times(1)).send(message);
    }
}
