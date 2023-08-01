package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.global.s3file.S3FileService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@Slf4j
@Api
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final JwtUtil jwtUtil;

    private final BoardService boardService;

    private final S3FileService s3FileService;

    // 글 작성 // Swagger 하려면 @requestBody 삭제 필요
    // 한 가지 주의할 점은, @RequestBody와 @RequestPart를
    // 동시에 사용하려면 요청의 Content-Type이 multipart/form-data이어야 합니다.
    @PostMapping("/boards")
    public Response<Object> saveBoard(@RequestHeader("Authorization") String authorizationHeader, BoardDto boardDto, @RequestPart("multipartFile") List<MultipartFile> multipartFile){
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: "+ jwtToken);

        Long userId = jwtUtil.getUserId(jwtToken);
        boardDto.setUserId(userId);

        log.info("userId :", boardDto.getUserId());

        Integer boardId = boardService.save(boardDto);

        // 원본 파일명과 S3에 저장된 파일명이 담긴 Map
        Map<String, List> nameList = s3FileService.uploadFile(multipartFile);

        // DB에 파일이름 저장
        boardService.saveBoardFile(boardId, nameList);
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
