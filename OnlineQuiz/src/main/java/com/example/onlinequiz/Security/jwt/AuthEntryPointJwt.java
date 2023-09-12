package com.example.onlinequiz.Security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);
    /**
     * Xử lý một tình huống không được ủy quyền (Unauthorized) khi người dùng cố gắng truy cập một phần tử bảo mật mà họ không có quyền.
     *
     * @param request       HttpServletRequest chứa thông tin về yêu cầu gửi đến máy chủ.
     * @param response      HttpServletResponse chứa thông tin về phản hồi trả về người dùng.
     * @param authException Đối tượng AuthException đại diện cho lỗi xác thực.
     * @throws IOException      Ném ra khi có lỗi trong việc ghi dữ liệu ra đối tượng HttpServletResponse.
     * @throws ServletException Ném ra khi xảy ra lỗi trong quá trình xử lý Servlet.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // Ghi thông báo lỗi vào bản ghi (log) của ứng dụng
        logger.error("Unauthorized error: " , authException.getMessage());

        // Đặt kiểu dữ liệu của phản hồi là JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Đặt mã trạng thái của phản hồi là 401 (Unauthorized)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Tạo một Map chứa thông tin về lỗi để chuyển thành JSON và gửi về client
        final Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");
        body.put("message", authException.getMessage());
        body.put("path", request.getServletPath());

        // Sử dụng ObjectMapper để chuyển Map thành định dạng JSON và ghi vào phản hồi
        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), body);
    }

}
