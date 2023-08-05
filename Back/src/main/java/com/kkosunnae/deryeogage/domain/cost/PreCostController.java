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
@RequestMapping("/api/precosts")
@RequiredArgsConstructor
public class PreCostController {

    private final JwtUtil jwtUtil;
    private final PreCostService preCostService;

    // 선 책임비 납부하기
    @PostMapping("/{boardId}")
    public Response<Object> payPreCost(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PreCostDto preCostDto, @PathVariable int boardId) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        preCostDto.setUserId(userId);
        preCostDto.setBoardId(boardId);
        int preCostId = preCostService.save(preCostDto);
        return Response.success(preCostId);
    }

    // 선 책임비 조회하기
    @GetMapping
    public Response<List<PreCostDto>> getPreCosts(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        List<PreCostDto> myPreCosts = preCostService.getPreCosts(userId);
        return Response.success(myPreCosts);
    }

    // 입양 확정 후 선책임비 수정하기
    @PutMapping("/confirm")
    public Response<Object> normalReturn(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PreCostDto preCostDto) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        preCostService.normalReturn(userId, preCostDto);
        return Response.success(null);
    }

    // 게시글 삭제 시 선책임비 수정하기
    @PutMapping
    public Response<Object> abnormalReturn(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PreCostDto preCostDto) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        preCostService.abnormalReturn(userId, preCostDto);
        return Response.success(null);
    }


}
