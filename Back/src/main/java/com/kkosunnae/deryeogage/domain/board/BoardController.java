package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@Slf4j
@Api
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final JwtUtil jwtUtil;

    private final BoardService boardService;

    //글 작성 // Swagger테스트한다고 @requestBody 뺌
    @PostMapping("/boards")
    public Response<Object> saveBoard(@RequestHeader("Authorization") String authorizationHeader, @RequestBody BoardDto boardDto){
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: "+ jwtToken);

        Long userId = jwtUtil.getUserId(jwtToken);

        log.info("글작성아이디 "+ userId);
//        log.info("글작성닉네임 "+ userDto.getNickname());

        boardDto.setUserId(userId);
//        boardDto.setUserNickname(userDto.getNickname());

        log.info("userId :", boardDto.getUserId());

        boardService.save(boardDto);
        return Response.success(null);

    }


    //글 수정
    @PutMapping("/boards/{boardId}")
    public Response<Object> updateBoard(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int boardId, @RequestBody BoardDto boardDto){

        String jwtToken = authorizationHeader.substring(7);
        Long requestUserId = jwtUtil.getUserId(jwtToken);

        BoardDto thisBoard = boardService.getBoard(boardId);

        log.info("수정: 게시글 유저 정보 : "+thisBoard.getUserId());
        log.info("요청 유저 정보 : "+requestUserId);

        if(thisBoard.getUserId()!=requestUserId){
            return Response.fail(null);
        }
        boardDto.setUserId(requestUserId);

        boardService.update(boardId, boardDto);
        return Response.success(null);
    }

    //글 삭제
    @DeleteMapping("/boards/{boardId}")
    public Response<Object> deleteBoard(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int boardId){

        String jwtToken = authorizationHeader.substring(7);
        Long requestUserId = jwtUtil.getUserId(jwtToken);

        BoardDto thisBoard = boardService.getBoard(boardId);
        if(thisBoard.getUserId()!=requestUserId){
            return Response.fail(null);
        }

        boardService.deleteById(boardId);
        return Response.success(null);
  }

    //글 상세조회
    @GetMapping("boards/{boardId}")
    public Response<BoardDto> selectBoard(@PathVariable int boardId){
        BoardDto thisBoard = boardService.getBoard(boardId);
        return Response.success(thisBoard);
    }

    //글 목록 조회
    @GetMapping("/boards/list")
    public Response<Page<BoardDto>> findBoards(Pageable pageable) {
        Page<BoardDto> boardList = boardService.findAll(pageable);
        return Response.success(boardList);
    }



    //분양글 찜
    @PostMapping("/boards/{boardId}/like")
    public Response<Object> boardLike(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int boardId, JjimDto jjimDto){

        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        jjimDto.setUserId(userId);
        jjimDto.setBoardId(boardId);

        boardService.like(jjimDto);
        return Response.success(null);
    }

    //분양글 찜 취소
    @DeleteMapping("/boards/{boardId}/like")
    public Response<Object> boardUnlike(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int boardId){

        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        boardService.unlike(userId, boardId);

        return Response.success(null);

    }
}
