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
            "/myregistration/myRes/**",
            "/myregistration/myRes",
            "/practice/add",
            "/practice/delete/**",
            "/practice/list",
            "/practice/view/**",
            "/api/payment/check"

    };
    // Danh sách các URL cho customer
    private static final String[] CUSTOMER_URL = {
            "/user/subject/addToWishList",
            "/user/subject/wishlist",
            "/user/subject/subjects-wishlist",
            "/user/subject/deletesubjectwishlist",
            "/user/subject/get",
            "/user/subject/get/**",
            "/attempt/quiz/**",
            "/attempt/quiz/add/result/**",
            "/attempt/quiz/update/result/**",
            "/attempt/quiz/review/**",
            "/api/payment/get/price/**",
            "/api/payment/add/transaction/**",
            "/api/payment/check/return"


    };
    // Danh sách các URL cho expert
    private static final String[] EXPERT_URL = {
            "/api/questions/get/lesson/**",
            "/api/questions/add/lesson/**",
            "/api/expert/lesson/delete/**",
            "/api/expert/subject/delete/topic/**",
            "/api/expert/subject/update/order/**",
            "/api/expert/subject/add/topic/**",
            "/api/expert/subject/edit/topic/**",
            "/api/expert/lesson/add/quiz/**",
            "/api/expert/lesson/add/video/**",
            "/api/expert/lesson/add/article/**",
            "/api/expert/lesson/get/article/**",
            "/api/expert/lesson/get/video/**",
            "/api/expert/lesson/update/article/**",
            "/api/expert/lesson/update/video/**",
            "/api/questions/update/quiz/data/**",
            "/api/questions/get/quiz/sentence/**",
            "/api/questions/delete/sentence/**",
            "/api/questions/**"


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
            "/quiz/get/lesson/**",
            "/quiz/result/view/**",

    };

    // Danh sach cac url cho admin va marketing
    private static final String[] MarketingAdmin_URL = {
            "/manage/dashboard"
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
                .authorizeHttpRequests().requestMatchers(MarketingAdmin_URL).hasAnyAuthority("MARKETING", "ADMIN").and()
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
