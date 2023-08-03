package com.kkosunnae.deryeogage.global.util;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;


@Slf4j
@Component
public class JwtUtil {

    @Value("${security.jwt.token.SK}")
    private String SK;

    @Value("${security.jwt.token.tokenValidTime}")
    private long tokenValidTime;

    // 토큰 생성

    public String createToken(String claimId, Long data) throws UnsupportedEncodingException {

        Date now = new Date();

        SecretKey secretKey = Keys.hmacShaKeyFor(SK.getBytes(StandardCharsets.UTF_8));

        String token = Jwts.builder()
                //.setHeaderParam("enc", "HS256")
                .setHeaderParam("typ","JWT")
                .claim("userId", data)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+tokenValidTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
        return token;
    }

    // 토큰에서 회원 ID 추출
    public Long getUserId(String token){
        // 유효성 검사
        try {
            validateToken(token);
        } catch (RuntimeException e) {
            throw new RuntimeException("토큰에 문제가 있어요 Invalid token: " + e.getMessage());
        }

        //디코더 객체 생성
        Base64.Decoder decoder = Base64.getDecoder();

        //토큰에서 payload 추출
        final String[] splitJwt = token.split("\\.");
        if (splitJwt.length < 2) {
            throw new IllegalArgumentException("잘못된 토큰 형식입니다.");
        }

        //payload 디코딩
        final String payLoadStr = new String(decoder.decode(splitJwt[1].getBytes()));

        //디코딩된 문자열 JSON으로 변환
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(payLoadStr).getAsJsonObject();

        //사용자의 id를 반환
        JsonElement userIdElement = jsonObject.get("userId");
        if (userIdElement == null || userIdElement.isJsonNull()) {
            throw new IllegalStateException("토큰에 userId가 없습니다.");
        }
        return userIdElement.getAsLong();
    }

    // 유효성 검사
    public boolean validateToken(String token) throws RuntimeException {
        SecretKey secretKey = Keys.hmacShaKeyFor(SK.getBytes(StandardCharsets.UTF_8));

        try {
         Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
         return true;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Expired JWT token: 토큰 만료");
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException("Unsupported JWT token: 지원되지 않는 토큰");
        } catch (MalformedJwtException e) {
            throw new RuntimeException("Invalid JWT token: 유효하지 않은 토큰");
        } catch (SignatureException e) {
            throw new RuntimeException("Invalid JWT signature: 유효하지 않은 서명");
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("JWT claims string is empty.: claims이 비어있음");
        }
    }

}
