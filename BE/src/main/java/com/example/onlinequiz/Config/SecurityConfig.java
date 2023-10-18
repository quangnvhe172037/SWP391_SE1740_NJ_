package com.example.onlinequiz.Config;

import com.example.onlinequiz.Jwt.JwtAuthenticationFilter;
import com.example.onlinequiz.Security.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter authenticationFilter;

    private final UserDetailsServiceImpl userDetailsService;

    // Danh sách các URL không yêu cầu xác thực
    private static final String[] UNSECURED_URLs = {
            "/authenticate/**",
            "/register",
            "/register/**",
            "/home",
            "/forgot-password",
            "/sliders",
            "/subjects/**",
            "/posts/**",
            "/categorysubject/**",
            "/api/payment/**",
            "/subjecttopic/get/**",
            "/lesson/get/*",
            "/lesson/get/data/**",
            "/quiz/get/lesson/**",
            "/quizdata/get/quiz/**",
            "/myregistration/myRes"

            "/api/questions/**"


    };
    // Danh sách các URL cho customer
    private static final String[] CUSTOMER_URL = {

    };
    // Danh sách các URL cho expert
    private static final String[] EXPERT_URL = {
    };

    private static final String[] MARKETING_URL = {
            "/sliders/edit/**",
            "/sliders/edit/image/**",
            "/sliders/edit/data/**",
            "/sliders/edit/**",
            "/sliders/delete/**",
            "/sliders/add",
            "/subjects/all",
            "/sliders/list",
            "/marketing/post/add",
            "/marketing/post/edit/**",
            "/marketing/post/edit",
            "/marketing/post/manage/**",
            "/marketing/post/update/status/**",
            "/marketing/post/delete/**"



    };
    // Danh sách các URL cho admin
    private static final String[] ADMIN_URL = {
            "/admin/**"

    };
    //Danh sách url cho cả 3 role expert, admin, customer
    private static final String[] FourRole_URL = {
            "/change-password",
            "/profile",
            "/update/profile",
            "/quiz/get/**",
            "/quiz/result/get",
            "/quiz/result/get/**",
            "/quiz/get/lesson/**"
    };
    // Cấu hình bộ lọc bảo mật
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors().and().csrf()
                .disable()
                // Cho phép truy cập các URL không yêu cầu xác thực
                .authorizeHttpRequests().requestMatchers(UNSECURED_URLs).permitAll().and()
                // Cấu hình quyền truy cập dựa trên vai trò (authorities)
                .authorizeHttpRequests().requestMatchers(ADMIN_URL).hasAuthority("ADMIN").and()
                .authorizeHttpRequests().requestMatchers(EXPERT_URL).hasAuthority("EXPERT").and()
                .authorizeHttpRequests().requestMatchers(CUSTOMER_URL).hasAuthority("CUSTOMER").and()
                .authorizeHttpRequests().requestMatchers(MARKETING_URL).hasAuthority("MARKETING").and()
                .authorizeHttpRequests().requestMatchers(FourRole_URL).hasAnyAuthority("CUSTOMER", "EXPERT", "ADMIN" , "MARKETING")
                .anyRequest().authenticated().and()
                // Quản lý phiên làm việc (session)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // Cấu hình AuthenticationProvider
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Cấu hình quản lý xác thực
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Cấu hình mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cấu hình AuthenticationProvider
    public AuthenticationProvider authenticationProvider(){
        var authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
}
