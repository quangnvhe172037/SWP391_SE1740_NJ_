package com.example.onlinequiz.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtProvider {
    @Value("${jwtSecrect}")
    private String secrectKey;
    @Value("${jwtExpiration}")
    private long validityInMilliseconds;

    public String generateToken(String gmail){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, gmail);
    }

    private String createToken(Map<String, Object> claims, String gmail) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + 1800000);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(gmail)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secrectKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> jws = Jwts.parser().setSigningKey(secrectKey).parseClaimsJws(token);
            Claims claims = jws.getBody();
            Date expirationDate = claims.getExpiration();
            Date now = new Date();
            return !expirationDate.before(now);
        } catch (Exception e){
            System.out.println("validateToken: " + e.getMessage());
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secrectKey).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private Claims decodeToken(String token){
        return Jwts.parser().setSigningKey(secrectKey).parseClaimsJws(token).getBody();
    }
}
