package com.example.onlinequiz.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class UserRegistrationSecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors() // Cấu hình CORS
                .and().csrf().disable() // Tắt CSRF
                .authorizeHttpRequests()
                .requestMatchers("/home/**", "/register/**","")
                .permitAll() // Cho phép tất cả truy cập /register/**
                .and()
//                .authorizeHttpRequests()
//                .requestMatchers("/users/**")
//                .hasAnyAuthority("CUSTOMER", "ADMIN", "EXPERT") // Yêu cầu quyền USER hoặc ADMIN cho /users/**
//                .and()
                .formLogin() // Cho phép xác thực bằng form đăng nhập mặc định
                .and()
                .build(); // Xây dựng SecurityFilterChain
    }
}

