package com.kkosunnae.deryeogage.global.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SK = "B307willbethewinnerofthefirstproject";


    private long tokenValidTime = 30*60*1000L; // 토큰 유효시간 30분

    // 토큰 생성
    public String createToken(String claimUser, Long data) throws UnsupportedEncodingException {

        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("enc", "HS256")
                .setHeaderParam("type","JWT")
                .claim("userId", data)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, SK.getBytes("UTF-8"))
                .compact();
    }


    // 유효성 검사
    public void validation(String token) throws UnsupportedEncodingException {
        Jwts.parser().setSigningKey(SK.getBytes("UTF-8")).parseClaimsJws(token);
    }


   // 토큰에서 회원 ID 추출
    public Long getUserId(String token){

        //디코더 객체 생성
        Base64.Decoder decoder = Base64.getDecoder();

        //토큰에서 payload 추출
        final String[] splitJwt = token.split("\\.");

        //payload 디코딩
        final String payloadStr = new String(decoder.decode(splitJwt[1].getBytes()));

        //디코딩된 문자열 JSON으로 변환
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(payloadStr).getAsJsonObject();

        //사용자의 id를 반환
        return jsonObject.get("userId").getAsLong();
    }
}
