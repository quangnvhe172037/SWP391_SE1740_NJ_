package com.example.onlinequiz.Security;

import com.example.onlinequiz.Security.jwt.AuthEntryPointJwt;
import com.example.onlinequiz.Security.jwt.AuthTokenFilter;
import com.example.onlinequiz.Security.services.UserDetailsImpl;
import com.example.onlinequiz.Security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter(){
        return new AuthTokenFilter();
    }

    /**
     * Tạo và cấu hình một bean của loại DaoAuthenticationProvider để sử dụng trong xác thực người dùng.
     *
     * @return Đối tượng DaoAuthenticationProvider đã được cấu hình.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        // Tạo một đối tượng DaoAuthenticationProvider
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        // Đặt UserDetailsService để sử dụng cho xác thực
        authProvider.setUserDetailsService(userDetailsService);

        // Đặt PasswordEncoder để mã hóa và so sánh mật khẩu
        authProvider.setPasswordEncoder(passwordEncoder());

        // Trả về đối tượng đã cấu hình
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Xây dựng và cấu hình một SecurityFilterChain để quản lý các cài đặt bảo mật cho ứng dụng.
     *
     * @param http Đối tượng HttpSecurity để cấu hình.
     * @return SecurityFilterChain đã được cấu hình.
     * @throws Exception Nếu có lỗi trong quá trình cấu hình.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Tắt CSRF protection (cross-site request forgery)
        http.csrf(csrf -> csrf.disable())

                // Đặt xử lý nếu người dùng chưa xác thực (Unauthorized)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPointJwt))

                // Xác định cách quản lý phiên (session)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Cấu hình quyền truy cập đối với các đường dẫn cụ thể
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .anyRequest().authenticated()
                );

        // Đặt cung cấp xác thực (AuthenticationProvider) đã được cấu hình
        http.authenticationProvider(authenticationProvider());

        // Thêm bộ lọc xác thực token JWT trước bộ lọc UsernamePasswordAuthenticationFilter
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        // Trả về SecurityFilterChain đã được cấu hình
        return http.build();
    }

}
