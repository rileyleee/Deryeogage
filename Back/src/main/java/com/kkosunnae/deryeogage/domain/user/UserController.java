package com.kkosunnae.deryeogage.domain.user;

import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Slf4j
@Api
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService= userService;
    }
    @ResponseBody
    @GetMapping("/oauth")
    public Response<Object> oAuthInfo(@RequestParam("code") String code) {
        if (code == null) {
            return Response.fail(HttpStatus.UNAUTHORIZED);
        } else {
            log.info("code: " + code);
            String accessToken = userService.getAccessToken(code);
            return Response.success(userService.regist(accessToken));
        }
    }

    // 로그인
    @PostMapping("/login")
    public Response<Object> login(UserDto user) {
        UserDto loginedUser = userService.login(user.getNickname());
        if (loginedUser == null) {
            return Response.fail(HttpStatus.UNAUTHORIZED);
        }
        return Response.success(loginedUser);
    }
}
