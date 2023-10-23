package com.example.onlinequiz.Event.Listener;

import com.example.onlinequiz.Event.RegistrationCompleteEvent;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Slf4j // Sử dụng Lombok để tạo logger với tên là "log"
@Component // Đánh dấu đây là một Spring Component, để Spring quản lý và có thể tiêm vào các bean khác
@RequiredArgsConstructor // Tự động tạo constructor với tham số cho các trường được đánh dấu là final
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    @Autowired
    private final UserServiceImpl userService; // Sử dụng Spring để tiêm UserServiceImpl vào Event Listener

    @Autowired
    private final JavaMailSender mailSender; // Sử dụng Spring để tiêm JavaMailSender vào Event Listener

    private Users theUser; // Biến để lưu trữ người dùng

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        theUser = event.getUsers(); // Lấy thông tin người dùng từ sự kiện

        String verificationToken = UUID.randomUUID().toString(); // Tạo mã xác thực ngẫu nhiên

        userService.saveUserVerificationToken(theUser, verificationToken); // Lưu mã xác thực vào cơ sở dữ liệu

        String url = event.getApplicationUrl() + "/register/verifyEmail?token=" + verificationToken; // Tạo URL xác thực

        try {
            sendVerificationEmail(url); // Gửi email xác thực
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        log.info("Click the link to verify your registration: {}", url); // Ghi log về URL xác thực
    }

    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "[Notification] - Quizzi's Email active";
        String senderName = "Quizzi Support";
        String mailContent = /*"<p> Hi, "+ theUser.getFirstName() + ", </p>" +
                "<p>Thank you for registering with us,"  +
                "Please, follow the link below to complete your registration.</p>" +
                "<a href=\"" + url + "\">Verify your email to activate your account</a>" +
                "<p> Thank you <br> Quizzi"+
*/
                "<p> Hi, " + theUser.getFirstName() + ", </p>" +
                        "<p>We are delighted to inform you that your account has been successfully created on our website. To complete the registration process and secure your account, please click on the link below to confirm your email address:</p>" +
                        "<a href=\"" + url + "\">Verify your email to activate your account</a>" +
                        " <p>This token will be expired after 15 minutes.</p>" +
                        "<p>If you do not remember registering for an account or did not initiate this action, you may disregard this email.</p>" +
                        "<p>Thank you for joining us. If you have any questions or need further assistance, please do not hesitate to contact us at [support email or support phone number].</p>" +
                        "Sincerely,<br>" +
                        "<p>Quizzi</p>";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("quanpdhe170415@fpt.edu.vn", senderName);
        messageHelper.setTo(theUser.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message); // Gửi email xác thực
    }
}
