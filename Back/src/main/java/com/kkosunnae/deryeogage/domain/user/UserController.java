package com.kkosunnae.deryeogage.domain.user;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Api
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final JwtUtil jwtUtil;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @ResponseBody
    @GetMapping("/oauth")
    public Response<Object> oAuthInfo(@RequestParam("code") String code) throws UnsupportedEncodingException {
        if (code == null) {
            return Response.fail(HttpStatus.UNAUTHORIZED);
        } else {
            log.info("code: " + code);
            String accessToken = userService.getAccessToken(code);
            Long userId = userService.regist(accessToken);


            // access 토큰 프론트에 반환
            Map<String, Object> userJwt = new HashMap<>();
            userJwt.put("accessToken", jwtUtil.createToken("claimUser", userId));
            userJwt.put("message", "loginClaimUser");
            return Response.success(userJwt);
        }
    }



    // 현재 로그인된 사용자 닉네임 반환
    @GetMapping
    public Response<Object> loginedUser(@RequestHeader("Authorization") String authorizationHeader) throws Exception {
        log.info("이 메서드 실행 완");

        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        String nickname = userService.getUserNickname(userId);
        return Response.success(nickname);
    }
}
