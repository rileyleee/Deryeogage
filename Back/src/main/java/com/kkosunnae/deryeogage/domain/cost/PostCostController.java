package com.kkosunnae.deryeogage.domain.cost;

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
@RequestMapping("/api/postcosts")
@RequiredArgsConstructor
public class PostCostController {

    private final JwtUtil jwtUtil;
    private final PostCostService postCostService;


    // 후 책임비 납부하기(입양 일정 저장하기 전에 납부)
    @PostMapping("/{boardId}")
    public Response<Object> payPostCost(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PostCostDto postCostDto, @PathVariable int boardId) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        postCostDto.setUserId(userId);
        postCostDto.setBoardId(boardId);
        int preCostId = postCostService.save(postCostDto);
        return Response.success(preCostId);
    }

    // 후 책임비 조회하기
    @GetMapping
    public Response<List<PostCostDto>> getPostCosts(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        List<PostCostDto> myPostCosts = postCostService.getPostCosts(userId);
        return Response.success(myPostCosts);
    }

    // 후 책임비 수정하기(미션 완료에 따른 반환)
    @PutMapping("/missioncomplete")
    public Response<Object> normalReturn(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PostCostDto postCostDto) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        postCostService.normalReturn(userId, postCostDto);
        return Response.success(null);
    }
}
