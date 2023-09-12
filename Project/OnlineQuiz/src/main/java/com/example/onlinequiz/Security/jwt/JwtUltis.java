package com.example.onlinequiz.Security.jwt;

import com.example.onlinequiz.Security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUltis {
    //dùng logger để theo dõi jwt, debug
    private static final Logger logger = LoggerFactory.getLogger(JwtUltis.class);
    @Value("${jwtSecrect}")
    private String JwtSecrect;
    @Value("${jwtExpiration}")
    private int jwtExpirationMs;
    @Value("${jwtCookieName}")
    private String jwtCookie;

    /**
     * Lấy mã JWT từ cookie trong yêu cầu HTTP.
     *
     * @param request Yêu cầu HTTP
     * @return Mã JWT nếu tìm thấy, hoặc null nếu không tìm thấy.
     */
    public String getJwtFromCookie(HttpServletRequest request) {
        // Kiểm tra xem có tồn tại cookie jwtCookie trong yêu cầu hay không
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
        if (cookie != null) {
            // Nếu cookie tồn tại, trả về giá trị của nó (đó là mã JWT)
            return cookie.getValue();
        } else {
            // Nếu không tìm thấy cookie, trả về null
            return null;
        }
    }

    /**
     * Phương thức này được sử dụng để tạo một ResponseCookie chứa JWT (JSON Web Token) dựa trên thông tin
     * của người dùng. JWT được tạo bằng cách sử dụng tên đăng nhập (username) của người dùng.
     * Cookie này sẽ được sử dụng để lưu trữ JWT trên máy khách (client-side).
     *
     * @param userPrincipal Đối tượng UserDetailsImpl chứa thông tin của người dùng.
     * @return Đối tượng ResponseCookie chứa JWT.
     */
    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal){
        // Tạo JWT từ tên đăng nhập của người dùng
        String jwt = generationTokenFromUserName(userPrincipal.getUsername());

        // Tạo một ResponseCookie với tên là jwtCookie, giá trị là JWT, đặt path là "/api",
        // đặt thời gian sống (maxAge) là 24 giờ, chỉ cho phép HTTP-only.
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt)
                .path("/api")
                .maxAge(24*60*60)
                .httpOnly(true)
                .build();

        return cookie;
    }

    /**
     * Phương thức này được sử dụng để tạo một ResponseCookie không chứa giá trị (null) để xóa cookie
     * JWT khỏi máy khách (client-side). Cookie này được đặt cùng tên và đường dẫn với cookie JWT
     * ban đầu để thay thế nó.
     *
     * @return Đối tượng ResponseCookie không chứa giá trị (được sử dụng để xóa cookie).
     */
    public ResponseCookie getCleanJwtCookie(){
        // Tạo một ResponseCookie không chứa giá trị (null) với cùng tên và đường dẫn.
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, null)
                .path("/api")
                .build();

        return cookie;
    }

    /**
     * Phương thức này trích xuất tên người dùng từ chuỗi JWT (JSON Web Token).
     *
     * @param token Chuỗi JWT cần trích xuất thông tin.
     * @return Tên người dùng được trích xuất từ chuỗi JWT.
     */
    public String getUserNameFromJwtToken(String token){
        // Sử dụng thư viện Jwts để giải mã chuỗi JWT và trích xuất thông tin tên người dùng.
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Phương thức này tạo và trả về một đối tượng Key sử dụng để xác thực và giải mã chuỗi JWT.
     *
     * @return Đối tượng Key được sử dụng trong quá trình xác thực và giải mã JWT.
     */
    private Key key() {
        // Sử dụng mã bí mật (secret key) để tạo một đối tượng Key sử dụng trong việc xác thực và giải mã JWT.
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JwtSecrect));
    }

    /**
     * Phương thức này kiểm tra tính hợp lệ của một chuỗi JWT (JSON Web Token).
     *
     * @param authToken Chuỗi JWT cần kiểm tra tính hợp lệ.
     * @return true nếu chuỗi JWT hợp lệ, ngược lại trả về false.
     */
    public boolean validateJwtToken(String authToken){
        try {
            // Sử dụng thư viện Jwts để kiểm tra tính hợp lệ của chuỗi JWT.
            Jwts.parserBuilder()
                    .setSigningKey(key()) // Sử dụng đối tượng Key để xác thực chuỗi JWT.
                    .build()
                    .parse(authToken);
            return true;
        } catch (MalformedJwtException e){
            logger.error("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    /**
     * Phương thức này tạo một chuỗi JSON Web Token (JWT) dựa trên tên người dùng (username).
     *
     * @param username Tên người dùng mà JWT sẽ được tạo cho.
     * @return Chuỗi JWT được tạo.
     */
    private String generationTokenFromUserName(String username) {
        return Jwts.builder()
                .setSubject(username) // Thiết lập thông tin người dùng vào phần subject của JWT.
                .setIssuedAt(new Date()) // Thiết lập thời điểm tạo JWT.
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs)) // Thiết lập thời gian hết hạn của JWT.
                .signWith(key(), SignatureAlgorithm.HS256) // Ký chuỗi JWT bằng mã bí mật (secret key) và thuật toán HS256.
                .compact(); // Tạo chuỗi JWT.
    }
}
