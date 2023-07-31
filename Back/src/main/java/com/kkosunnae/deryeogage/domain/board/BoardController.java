package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.user.UserDto;
import com.kkosunnae.deryeogage.global.s3file.S3FileService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
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
    public Response<Object> updateBoard(@PathVariable int boardId, UserDto userDto, BoardDto boardDto){

//        BoardDto thisBoard = boardService.getBoard(boardId).toDto();
        //if(thisBoard.getUser()!=userDto.getId()){ 여기서 board id 아직 안뽑았음!!
        // return new ResponseEntity<String>("UNAUTHORIZED", HttpStatus.OK);
        // }
        boardService.update(boardId, boardDto);
        return Response.success(null);
    }

    //글 삭제
    @DeleteMapping("/boards/{boardId}")
    public Response<Object> deleteBoard(@PathVariable int boardId){
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
    public Response<Object> boardLike(@RequestHeader HttpHeaders header, @PathVariable int boardId, JjimDto jjimDto){

        String token = header.get("accessToken").toString();
        Long userId = jwtUtil.getUserId(token);

        jjimDto.setUserId(userId);
        jjimDto.setBoardId(boardId);

        boardService.like(jjimDto);
        return Response.success(null);
    }

    //분양글 찜 취소
    @DeleteMapping("/boards/{boardId}/like")
    public Response<Object> boardUnlike(@RequestHeader HttpHeaders header, @PathVariable int boardId){

        String token = header.get("accessToken").toString();
        Long userId = jwtUtil.getUserId(token);

        boardService.unlike(userId, boardId);

        return Response.success(null);

    }
}
