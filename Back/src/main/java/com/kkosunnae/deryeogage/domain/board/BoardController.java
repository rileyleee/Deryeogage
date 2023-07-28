package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    //글 작성
    @PostMapping("/boards")
    public ResponseEntity<?> saveBoard(BoardDto boardDto){
        boardService.save(boardDto);
        return ResponseEntity.status(HttpStatus.OK).body("Save Complete");
    }

    //글 수정
    @PutMapping("/boards/{boardId}")
    public ResponseEntity<?> updateBoard(@PathVariable int boardId, UserDto userDto, BoardDto boardDto){

//        BoardDto thisBoard = boardService.getBoard(boardId).toDto();
        //if(thisBoard.getUser()!=userDto.getId()){ 여기서 board id 못뽑았음!!!
        // return new ResponseEntity<String>("UNAUTHORIZED", HttpStatus.OK);
        // }
        boardService.update(boardId, boardDto);
        return ResponseEntity.status(HttpStatus.OK).body("Update Complete");
    }

    //글 삭제
    @DeleteMapping("/boards/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable int boardId){
        boardService.deleteById(boardId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete Complete");
//        return new ResponseEntity<String>("Delete Complete", HttpStatus.OK);
    }


    //글 상세조회
    @GetMapping("boards/{boardId}")
    public ResponseEntity<?> selectBoard(@PathVariable int boardId){
        BoardDto thisBoard = boardService.getBoard(boardId).toDto();
        return new ResponseEntity<BoardDto>(thisBoard, HttpStatus.OK);
    }

    @GetMapping("/boards")
    //글 목록 조회
    public ResponseEntity<?> boardList(){
       List<BoardDto> boardList = boardService.findAll();
        return new ResponseEntity<List<BoardDto>>(boardList, HttpStatus.OK);
    }

//    //분양글 추천
//    @GetMapping("/boards/recommendations")
//    public ResponseEntity<?> recommendBoards(){
//
//    }

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
