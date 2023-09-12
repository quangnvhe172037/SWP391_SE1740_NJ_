package com.example.onlinequiz.Security.jwt;

import com.example.onlinequiz.Security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
    @Autowired
    private JwtUltis jwtUltis;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Override
    /**
     * Phương thức này thực hiện việc xử lý bộ lọc (filter) để kiểm tra và xác thực JSON Web Token (JWT)
     * từ yêu cầu HTTP.
     *
     * @param request      Yêu cầu HTTP đến.
     * @param response     Phản hồi HTTP trả về.
     * @param filterChain Filter chain để tiếp tục xử lý yêu cầu.
     * @throws ServletException Nếu xảy ra lỗi trong quá trình xử lý.
     * @throws IOException      Nếu có lỗi IO xảy ra.
     */
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            //Trích xuất JWT từ yêu cầu HTTP
            String jwt = parseJwt(request);

            //Kiểm tra JWT và xác thực người dùng nếu JWT hợp lệ
            if (jwt != null && jwtUltis.validateJwtToken(jwt)) {
                String username = jwtUltis.getUserNameFromJwtToken(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                //Tạo đối tượng Authentication và đặt thông tin xác thực
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //Đặt đối tượng Authentication vào SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            logger.error("Cannot set user authentication: " + e.getMessage());
        }

        //Tiếp tục xử lý yêu cầu bằng filterChain
        filterChain.doFilter(request, response);
    }

    /**
     * Phương thức này trích xuất JWT từ cookie trong yêu cầu HTTP.
     *
     * @param request Yêu cầu HTTP đến.
     * @return Chuỗi JWT hoặc null nếu không tìm thấy.
     */
    private String parseJwt(HttpServletRequest request) {
        // Trích xuất JWT từ cookie
        String jwt = jwtUltis.getJwtFromCookie(request);
        return jwt;
    }

}
