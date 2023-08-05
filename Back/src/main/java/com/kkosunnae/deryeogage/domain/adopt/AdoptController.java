package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardService;
import com.kkosunnae.deryeogage.domain.user.UserService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/adopts")
public class AdoptController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final BoardService boardService;
    private final AdoptService adoptService;


    //내 분양정보 목록 조회하기 (마이페이지)
    @GetMapping("/from")
    public Response<Object> getFromAdopts(@RequestHeader("Authorization") String authorizationHeader) {

        // 로그인한 유저 정보 가져오기
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        // 분양자로 등록된 정보 가져오기
        List<AdoptDto> myFromAdopts = adoptService.getFromAdopts(userId);
        return Response.success(myFromAdopts);
    }


    //내 입양정보 목록 조회하기 (마이페이지)
    @GetMapping("/to")
    public Response<Object> getToAdopts(@RequestHeader("Authorization") String authorizationHeader) {

        // 로그인한 유저 정보 가져오기
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        // 입양자로 등록된 정보 가져오기
        List<AdoptDto> myToAdopts = adoptService.getToAdopts(userId);
        return Response.success(myToAdopts);
    }



    /* 입양 약속 일정 생성 시 입양 정보 생성(보류)
     다른 요청에 의해 동반되어 실행되기 때문에 service만 생성(준용이 약속 일정 코드에 서비스 호출하면 필요없음)*/

//    @PostMapping
//    public Response<Object> saveAdopt(AdoptDto adoptDto){
//
//        Integer adoptId = adoptService.save(adoptDto);
//
//        return Response.success(adoptId);
//    }


    // 게시글 삭제 시 입양정보 테이블 같이 삭제 되므로 기능 불필요
}
