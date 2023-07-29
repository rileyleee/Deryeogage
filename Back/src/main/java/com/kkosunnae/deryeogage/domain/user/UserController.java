package com.kkosunnae.deryeogage.domain.user;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Api
@RestController
@RequestMapping("/users")
public class UserController {

    private final JwtUtil jwtUtil;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // 카카오 로그인 후 프론트로 accessToken 전달
    @ResponseBody
    @GetMapping("/oauth")
    public ResponseEntity<?> oAuthInfo(@RequestParam("code") String code) throws UnsupportedEncodingException {
        if (code == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else {
            log.info("code: " + code);
            String accessToken = userService.getAccessToken(code);
            Long userId = userService.regist(accessToken);
            // access 토큰 프론트에 반환
            Map<String, Object> userJwt = new HashMap<>();
            userJwt.put("accessToken", jwtUtil.createToken("claimUser", userId));
            userJwt.put("message", "loginClaimUser");
            
            return new ResponseEntity<>(userJwt, HttpStatus.OK);
        }
    }


    // 현재 로그인된 사용자 닉네임 반환
    @GetMapping("/")
    public ResponseEntity<?> loginedUser(@RequestHeader HttpHeaders header) throws Exception {
        String token = header.get("accessToken").toString();
        Long userId = jwtUtil.getUserId(token);
        String nickname = userService.getUserNickname(userId);
        return new ResponseEntity<String>(nickname, HttpStatus.OK);
    }

}
