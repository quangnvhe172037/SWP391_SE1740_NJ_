package com.example.onlinequiz.Service;


import com.example.onlinequiz.Services.Impl.EmailServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertThrows;
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

    @Test
    void sendEmailWithCorrectContent() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Quizzi's Support <quanpdhe170415@fpt.edu.vn>");
        message.setTo("to@example.com");
        message.setSubject("subject");
        message.setText("text");

        emailService.sendEmail("to@example.com", "subject", "text");

        verify(javaMailSender, times(1)).send(message);
    }
    @Test
    void sendEmailWithCorrectSenderAndRecipient() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Quizzi's Support <quanpdhe170415@fpt.edu.vn>");
        message.setTo("to@example.com");
        message.setSubject("subject");
        message.setText("text");

        emailService.sendEmail("to@example.com", "subject", "text");

        verify(javaMailSender, times(1)).send(message);
    }
    @Test
    void sendEmailWithError() {
        // Giả lập việc gửi email thất bại bằng cách mockito javaMailSender để throw exception
        Mockito.doThrow(new MailSendException("Email send failed"))
                .when(javaMailSender).send(any(SimpleMailMessage.class));

        // Kiểm tra xem phương thức sendEmail có xử lý đúng lỗi không
        assertThrows(MailSendException.class, () -> {
            emailService.sendEmail("to@example.com", "subject", "text");
        });
    }
    @Test
    void sendEmailWithEmptyText() {
        // Phương thức sendEmail sẽ trả về một ngoại lệ hoặc thông báo lỗi khi nội dung email rỗng
        assertThrows(IllegalArgumentException.class, () -> {
            emailService.sendEmail("to@example.com", "subject", "");
        });
    }
    @Test
    void sendEmailWithEmptySubject() {
        // Phương thức sendEmail sẽ trả về một ngoại lệ hoặc thông báo lỗi khi chủ đề email rỗng
        assertThrows(IllegalArgumentException.class, () -> {
            emailService.sendEmail("to@example.com", "", "text");
        });
    }

}
