package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Repo.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
@Service
@RequiredArgsConstructor
public class JWTService {
    private final UserRepository userRepository;
    @Value("${jwtSecrect}")
    private String JWT_SECRECT;
    @Value("${jwtExpiration}")
    private int JWT_EXPIRATION_TIME;

    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return generateTokenForUser(claims, userName);
    }

    /*
    Thuật toán SignatureAlgorithm.HS256 thường được sử dụng trong JWT (JSON Web Tokens) để tạo và
    xác minh chữ ký số (digital signature) trên dữ liệu. Lý do mà nó thường được sử dụng bao gồm:

    Bảo mật đủ: Thuật toán HS256 cung cấp mức độ bảo mật đủ cho hầu hết các ứng dụng.
    Nó sử dụng mã hóa HMAC-SHA256 để tạo chữ ký số, là một trong những thuật toán mã hóa chưa
    bị bẻ khóa mạnh.

    Tốc độ và hiệu suất tốt: HS256 là một thuật toán nhanh và hiệu quả, điều này có nghĩa là nó
    không tạo ra quá nhiều tải cho ứng dụng của bạn.

    Được hỗ trợ rộng rãi: HS256 là một trong những thuật toán chữ ký số JWT được hỗ trợ rộng rãi
    bởi nhiều thư viện và framework phổ biến. Điều này đồng nghĩa với việc bạn có khả năng tích
    hợp và sử dụng nó một cách dễ dàng trong ứng dụng của bạn.
     */
    private String generateTokenForUser(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRECT);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsernameFromToken(String theToken){
        return extractClaim(theToken, Claims ::getSubject);
    }
    public Date extractExpirationTimeFromToken(String theToken) {
        return extractClaim(theToken, Claims :: getExpiration);
    }

    public Boolean validateToken(String theToken, UserDetails userDetails){
        final String userName = extractUsernameFromToken(theToken);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(theToken));
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }
    private boolean isTokenExpired(String theToken) {
        return extractExpirationTimeFromToken(theToken).before(new Date());
    }
}
