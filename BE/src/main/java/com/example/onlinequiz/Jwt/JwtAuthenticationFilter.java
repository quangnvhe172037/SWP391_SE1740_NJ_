package com.example.onlinequiz.Jwt;

import com.example.onlinequiz.Security.UserDetailsServiceImpl;
import com.example.onlinequiz.Services.Impl.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Tiêm JWTService vào Filter
    @Autowired
    private final JWTService jwtService;

    // Tiêm UserRegistrationService vào Filter
    @Autowired
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String token = null;
        String userName = null;
        String authHeader = request.getHeader("Authorization");

        // Kiểm tra header Authorization để lấy token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            userName = jwtService.extractUsernameFromToken(token);
        }

        // Kiểm tra xem người dùng đã xác thực chưa và có token không
        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Lấy thông tin người dùng từ UserDetailsService
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);

            // Kiểm tra tính hợp lệ của token
            if (jwtService.validateToken(token, userDetails)){
                // Tạo đối tượng Authentication và đặt nó trong SecurityContextHolder
                var authToken = new UsernamePasswordAuthenticationToken(token, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Chuyển tiếp yêu cầu đến Filter tiếp theo
        filterChain.doFilter(request, response);
    }
}
