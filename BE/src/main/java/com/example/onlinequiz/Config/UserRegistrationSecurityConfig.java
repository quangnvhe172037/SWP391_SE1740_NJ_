package com.example.onlinequiz.Config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import java.io.IOException;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class UserRegistrationSecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(Collections.singletonList(provider));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors() // Cấu hình CORS
                .and().csrf().disable() // Tắt CSRF
                .authorizeHttpRequests()
                .requestMatchers("/register/**", "/api/test/all", "/api/test/login")
                .permitAll() // Cho phép tất cả truy cập /register/**
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/users/**")
                .hasAnyAuthority("CUSTOMER", "ADMIN", "EXPERT") // Yêu cầu quyền USER hoặc ADMIN cho /users/**
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/test/customer")
                .hasAnyAuthority("CUSTOMER", "ADMIN", "EXPERT") // Yêu cầu quyền USER hoặc ADMIN cho /users/**
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/test/home")
                .hasAnyAuthority("CUSTOMER")
                .and()
                .formLogin() // Cho phép xác thực bằng form đăng nhập mặc định
                .defaultSuccessUrl("/api/test/customer")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                    @Override
                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                    }
                })
                .and()
                .build(); // Xây dựng SecurityFilterChain
    }
}

