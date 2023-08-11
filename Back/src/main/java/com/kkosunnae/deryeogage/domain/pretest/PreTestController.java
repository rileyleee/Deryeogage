package com.kkosunnae.deryeogage.domain.pretest;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pretests")
public class PreTestController {

    private final JwtUtil jwtUtil;
    private final PreTestService preTestService;


    //사전테스트 결과 조회
    @GetMapping
    public Response<PreTestDto> getPretest(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: " + jwtToken);
        Long userId = jwtUtil.getUserId(jwtToken);
        PreTestDto pretest = preTestService.getPretest(userId);
        return Response.success(pretest);
    }

    //사전테스트 결과 생성
    @PostMapping
    public Response<Object> savePretest(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PreTestDto pretestDto) {
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: "+ jwtToken);

        Long userId = jwtUtil.getUserId(jwtToken);
        pretestDto.setUserId(userId);
        pretestDto.setResponseDate(LocalDateTime.now());

        preTestService.save(pretestDto);
        return Response.success(null);
    }

    //사전테스트 결과 삭제
    @DeleteMapping
    public Response<Object> deletePretest(@RequestHeader("Authorization") String authorizationHeader){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        //PreTestDto pretest = preTestService.getPretest(userId);
        preTestService.deleteByUserId(userId);

        return Response.success(null);
    }
}
