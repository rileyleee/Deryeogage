package com.kkosunnae.deryeogage.domain.user;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Slf4j
@Api
@RestController
@RequestMapping("/")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService= userService;
    }
    @ResponseBody
    @GetMapping("/oauth")
    public ResponseEntity<?> oAuthInfo(@RequestParam("code") String code) {
        if (code == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else {
            log.info("code: " + code);
            String accessToken = userService.getAccessToken(code);
            return new ResponseEntity<UserDto>(userService.regist(accessToken), HttpStatus.OK);
        }
    }
}
