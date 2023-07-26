package com.kkosunnae.deryeogage.domain.user;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로 설정
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요한 파라미터를 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter((new OutputStreamWriter(conn.getOutputStream())));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=5350906875f54e9bff0134a84d70e619");
            sb.append("&redirect_uri=http://localhost:3000/oauth");
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : " + responseCode);

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            String result = getResponse(conn);

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);


            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();


            log.info("access_token : " + accessToken);
            log.info("refresh_token : " + refreshToken);

            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return accessToken;
    }

    private String getResponse(HttpURLConnection conn) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = br.readLine()) != null) {
            response.append(inputLine);
        }
        br.close();
        return response.toString();
    }


    public Long regist(String accessToken) {

        String reqURL = "https://kapi.kakao.com/v2/user/me";
        UserEntity user = null;


        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            String result = getResponse(conn);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
            JsonElement profile = kakaoAccount.getAsJsonObject().get("profile");
            JsonElement age_range = kakaoAccount.getAsJsonObject().get("age_range");

            //dto에 저장하기

//            userInfo.setId(element.getAsJsonObject().get("id").getAsLong());
//            userInfo.setCreatedDate(element.getAsJsonObject().get("connected_at").getAsString());
//            userInfo.setNickname(profile.getAsJsonObject().get("nickname").getAsString());
//            userInfo.setAgeRange(age_range.getAsString());

            Long id = element.getAsJsonObject().get("id").getAsLong();
            String createdDate = element.getAsJsonObject().get("connected_at").getAsString();
            String nickname = profile.getAsJsonObject().get("nickname").getAsString();
            String ageRange = age_range.getAsString();

            // 디비에서 확인하고
            Optional<UserEntity> existingUser = userRepository.findById(id);
            if (existingUser.isPresent()) {
                // 유저가 이미 존재한다면;
                user = existingUser.get(); //유저 반영
                log.info("User already exists: " + existingUser.get().getId());
                // 로그인 처리...가능하도록
                // 유저 아이디 반환
                return existingUser.get().getId();
            } else {
                // 없으면 저장하고
                user = UserEntity.builder()
                        .id(id)
                        .createdDate(createdDate)
                        .nickname(nickname)
                        .ageRange(ageRange)
                        .build();

                log.info("Info confirm: " + user.toString());
                userRepository.save(user); //디비에 저장
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return user.getId();
    }
}

