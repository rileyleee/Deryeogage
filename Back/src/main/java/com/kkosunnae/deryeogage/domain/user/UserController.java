package com.kkosunnae.deryeogage.domain.user;

import com.kkosunnae.deryeogage.global.s3file.S3FileService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@Api
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final S3FileService s3FileService;

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

    //현재 로그인된 사용자의 프로필 사진 저장
    @PostMapping("/pic")
    public Response<Object> savePicture(@RequestHeader("Authorization") String authorizationHeader, @RequestPart("multipartFile") List<MultipartFile> multipartFile){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        Map<String, List> nameList = s3FileService.uploadFile(multipartFile);
        String path = userService.savePicture(userId, nameList);

        return Response.success(path);
    }

    //현재 로그인된 사용자의 프로필 사진 조회
    @GetMapping("/pic")
    public Response<Object> getPicture(@RequestHeader("Authorization") String authorizationHeader){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        String path = userService.getPicture(userId);
        return Response.success(path);
    }

    //로그인한 사용자의 프로필 사진 수정
    @PutMapping("/pic")
    public Response<Object> updatePicture(@RequestHeader("Authorization") String authorizationHeader, @RequestPart("multipartFile") List<MultipartFile> multipartFile){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        Map<String, List> nameList = s3FileService.uploadFile(multipartFile);


        String newPath = userService.updatePicture(userId, nameList);

        return Response.success(newPath);
    }

    /** 입양게시판 및 채팅 화면에서 타인 닉네임 클릭 시
     * 게시판 및 채팅 entity에 담겨 있는 사용자 id를 활용 **/
    @GetMapping("/profile")
    public Response<Object> getProfile(@RequestBody Long userId){
        ProfileResponseDto profileResponse = userService.getProfile(userId);
        return Response.success(profileResponse);
    }

}
