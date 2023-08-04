package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardService;
import com.kkosunnae.deryeogage.domain.user.UserService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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

    //내 분양정보 목록 조회하기

    //분양자의 세부 분양정보 조회하기

    //내 입양정보 목록 조회하기

    //입양자의 세부 입양정보 조회하기
    
    

    // 입양 정보 생성
    @PostMapping
    public Response<Object> saveAdopt(AdoptDto adoptDto){

        Integer adoptId = adoptService.save(adoptDto);

        return Response.success(adoptId);
    }

    // 입양정보도 다른 요청에 의해 동반되어 실행되기 때문에 service만 생성
    // 게시글 삭제 시 입양정보 테이블 같이 삭제 되므로 기능 불필요
}
