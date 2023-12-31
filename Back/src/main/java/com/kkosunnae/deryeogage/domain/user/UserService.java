package com.kkosunnae.deryeogage.domain.user;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.kkosunnae.deryeogage.domain.adopt.AdoptEntity;
import com.kkosunnae.deryeogage.domain.adopt.AdoptRepository;
import com.kkosunnae.deryeogage.domain.pretest.PreTestEntity;
import com.kkosunnae.deryeogage.domain.pretest.PreTestRepository;
import com.kkosunnae.deryeogage.domain.simulation.SimulationEntity;
import com.kkosunnae.deryeogage.domain.simulation.SimulationRepository;
import com.kkosunnae.deryeogage.domain.simulation.SimulationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PreTestRepository preTestRepository;
    private final SimulationService simulationService;
    private final AdoptRepository adoptRepository;


    @Transactional(readOnly = true)
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
            sb.append("&client_id=5350906875f54e9bff0134a84d70e619"); //현재 프론트 서버
            // 로컬용 주소
            // sb.append("&redirect_uri=http://localhost:3000/users/oauth");
            // 배포용 주소
            sb.append("&redirect_uri=https://i9b307.p.ssafy.io/users/oauth");
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
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
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
        UserDto userInfo = new UserDto();
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

            // 선택항목인 연령대를 제공하지 않을 경우 코드 구현
            // 기존 코드(필수 수집처리)
            //JsonElement age_range = kakaoAccount.getAsJsonObject().get("age_range");


            // age_range를 Optional로 감싸서 선언(미동의시 )
            Optional<JsonElement> age_range = Optional.ofNullable(kakaoAccount.getAsJsonObject().get("age_range"));

            // age_range가 존재하는 경우에만 값을 DTO에 설정
            if (age_range.isPresent()) {
                userInfo.setAgeRange(age_range.get().getAsString());
            } else { // 없을 경우에 등록 값
                userInfo.setAgeRange("0");
            }

            //dto에 저장하기
            Long id = element.getAsJsonObject().get("id").getAsLong();
            userInfo.setId(id);
            userInfo.setCreatedDate(LocalDateTime.now());
            userInfo.setNickname(profile.getAsJsonObject().get("nickname").getAsString());

            //카카오 제공 사용자 정보 확인
            System.out.println("userInfo.id = " + userInfo.getId());
            System.out.println("userInfo.nickname = " + userInfo.getNickname());
            System.out.println("userInfo.age_range = " + userInfo.getAgeRange());
            System.out.println("userInfo.created_date = " + userInfo.getCreatedDate());


            // 디비에서 확인하고
            Optional<UserEntity> existingUser = userRepository.findById(id);
            if (existingUser.isPresent()) {
                // 유저가 이미 존재한다면;
                user = existingUser.get(); //유저 반영
                log.info("User already exists: " + existingUser.get().getId());

            } else {
                // 없으면 Entity에 담기
                user = userInfo.toEntity();
                userRepository.save(user); //디비에 저장
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        // 로그인 처리 가능하도록 유저 프론트에 반환
        return userInfo.getId();
    }

    // 로그인한 사용자의 닉네임 가져오기
    @Transactional(readOnly = true)
    public String getUserNickname(Long userId) {

        UserEntity loginedUser = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("사용자가 존재하지 않습니다."));

        String nickname = loginedUser.getNickname();
        return nickname;
    }

    // 로그인한 사용자의 프로필 사진 등록
    public String savePicture(Long userId, Map<String, List> nameList) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다. userId" + userId));

        List<String> savedPaths = nameList.get("path");
        String path = savedPaths.get(0);
        userEntity.update(path);
        return path;
    }

    // 로그인한 사용자의 프로필 사진 조회
    @Transactional(readOnly = true)
    public String getPicture(Long userId) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다. userId" + userId));

        UserDto userDto = userEntity.toDto();

        String path = userDto.getImageUrl();

        return path;
    }


    // 로그인한 사용자의 프로필 사진 수정
    public String updatePicture(Long userId, Map<String, List> nameList) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다. userId" + userId));

        List<String> updatedPaths = nameList.get("path");
        String newPath = updatedPaths.get(0);
        userEntity.update(newPath);

        userRepository.save(userEntity);  // 변경 사항을 데이터베이스에 저장
        return newPath;
    }

    // 사용자의 프로필 조회 (없는 경우는 예외 아니고 optional
    public ProfileResponseDto getProfile(Long userId) {

        // 사용자
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        // 사전 테스트
        Optional<PreTestEntity> pretest = preTestRepository.findByUserId(userId);

        // 가장 최근 시뮬레이션 수행 내역
        String title = simulationService.getTitle(userId);

        // 분양 내역
        Optional<List<AdoptEntity>> adoptFromEntities = adoptRepository.findByFromUserId(userId);

        // 입양 내역
        Optional<List<AdoptEntity>> adoptToEntities = adoptRepository.findByToUserId(userId);


        String nickname = user.getNickname();
        String userImg = user.getImageUrl();
        byte pretestScore = 0;
        String pretestPromise = null;
        String simulationTitle = null;
        int adoptFromCount = 0;
        int adoptToCount = 0;


        if (pretest.isPresent()) {
            pretestScore = pretest.get().getScore();
            pretestPromise = pretest.get().getPromise();
        }

        if (title != null) {
            simulationTitle = title;
        }

        if (adoptFromEntities.isPresent()) {
            adoptFromCount = adoptFromEntities.get().size();
        }

        if (adoptToEntities.isPresent()) {
            adoptToCount = adoptToEntities.get().size();
        }

        ProfileResponseDto profile = new ProfileResponseDto(userId, nickname, userImg, pretestScore, pretestPromise, simulationTitle, adoptFromCount, adoptToCount);

        return profile;
    }
}
