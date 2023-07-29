package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.user.UserDto;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    //글 작성 // Swagger테스트한다고 @requestBody 뺌
    @PostMapping("/boards")
    public Response<Object> saveBoard(BoardDto boardDto){
        boardService.save(boardDto);
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
//        return new ResponseEntity<String>("Delete Complete", HttpStatus.OK);
    }


    //글 상세조회
    @GetMapping("boards/{boardId}")
    public Response<BoardDto> selectBoard(@PathVariable int boardId){
        BoardDto thisBoard = boardService.getBoard(boardId);
        return Response.success(thisBoard);
    }

    //글 목록 조회
    @GetMapping("/boards")
    public ResponseEntity<Page<BoardDto>> findBoards(Pageable pageable) {
        Page<BoardDto> boardList = boardService.findAll(pageable);
        return new ResponseEntity<>(boardList, HttpStatus.OK);
    }



//    //분양글 찜
//    @PostMapping("/boards/{boardId}/like")
//    public ResponseEntity<?> boardLike(){
//
//    }

//    //분양글 찜 취소
//    @DeleteMapping("/boards/{boardId}/like")
//    public ResponseEntity<?> boardUnlike(){
//
//    }
}
