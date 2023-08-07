package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardService;
import com.kkosunnae.deryeogage.domain.user.UserService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    /**
     * 입양 내역 존재 여부 확인 => 챗룸에서 예약일정 있는지 여부 확인
     * true면 등록 수행 (Post)
     * false면 수정 수행 (Put)
     */

    // 프론트에서 보내줘야 할 값 Long fromUserId, Long toUserId, Integer boardId, LocalDate scheduledDate
    // 입양 내역 등록 => 프론트에서 전달받은 값이 false이면! (Chat Controller에서 특정 채팅방 상세로 정보 가져올 듯)
    @PostMapping
    public Response<Object> saveAdopt(@RequestHeader("Authorization") String authorizationHeader, @RequestBody AdoptDto adoptDto) {

        Integer adoptId = adoptService.save(adoptDto);
        return Response.success(adoptId);
    }

    // 입양 내역 일정 수정 => 프론트에서 전달받은 값이 true이면!
    @PutMapping
    public Response<Object> updateAdopt(@RequestBody AdoptDto adoptDto){
        Integer boardId = adoptDto.getBoardId();
        LocalDate scheduledDate = adoptDto.getScheduledDate();
        Integer adoptId = adoptService.update(boardId, scheduledDate);
        return Response.success(adoptId);
    }


    // 입양 내역 일정 외 수정(입양자 입양 확정)
    @PutMapping("/toconfirm")
    public Response<Object> toConfirm(@RequestBody AdoptDto adoptDto){
        adoptService.updateToConfirm(adoptDto);
        return Response.success(null);
    }


    // 분양 내역 일정 외 수정(분양자 분양 확정)
    @PutMapping("/fromconfirm")
    public Response<Object> fromConfirm(@RequestBody AdoptDto adoptDto){
        adoptService.addMission(adoptDto);
        return Response.success(null);
    }


    // 게시글 삭제 시 입양정보 테이블 같이 삭제 되므로 기능 불필요
}
