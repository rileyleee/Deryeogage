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

    // 선 책임비 납부하기(게시글 작성 시 납부)
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

    // 입양 확정 후 선 책임비 수정하기(반환)
    @PutMapping("/confirm")
    public Response<Object> normalReturn(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PreCostDto preCostDto) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        preCostService.normalReturn(userId, preCostDto);
        return Response.success(null);
    }

    // 게시글 삭제 버튼 클릭 후 returnYn이 null이면 선 책임비 수정하기(반환) -> 게시글 삭제까지
    @DeleteMapping
    public Response<Object> abnormalReturn(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PreCostDto preCostDto) { //보드ID 유일함
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        preCostService.abnormalReturn(userId, preCostDto);
        return Response.success(null);
    }


}
