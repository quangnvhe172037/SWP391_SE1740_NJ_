package com.example.onlinequiz.Config;

import com.example.onlinequiz.Jwt.JwtAuthenticationFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

import java.io.IOException;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
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
                .requestMatchers("/sliders", "/sliders/**", "sliders/edit/**", "/sliders/edit/data", "/sliders/edit"
                        , "/sliders/edit/data/**", "/sliders/edit/image", "/sliders/edit/image/**", "/sliders/delete", "/sliders/delete/**")

                .permitAll() // Cho phép tất cả truy cập /register/**
                .requestMatchers("/register","/api/test/**")
                .permitAll() // Cho phép tất cả truy cập /register/**
//                .anyRequest().authenticated()
                .and()
//                .authorizeHttpRequests()
//                .requestMatchers("/api/test/customer")
//                .hasRole("ROLE_CUSTOMER") // Yêu cầu quyền USER hoặc ADMIN cho /users/**
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers("/api/test/customer")
//                .hasRole("ROLE_CUSTOMER")// Yêu cầu quyền USER hoặc ADMIN cho /users/**
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers("/api/test/customer")
//                .authenticated()
//                .and()
//                .formLogin() // Cho phép xác thực bằng form đăng nhập mặc định
//                .defaultSuccessUrl("/api/test/customer")
//                .and()
                .addFilterAfter(new JwtAuthenticationFilter(), ChannelProcessingFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage()))
                .and()
                .build(); // Xây dựng SecurityFilterChain
    }
}

