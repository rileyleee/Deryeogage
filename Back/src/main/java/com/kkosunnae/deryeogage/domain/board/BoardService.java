package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.common.DetailCodeRepository;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final DetailCodeRepository detailCodeRepository;

    //게시글 작성
    public int save(BoardDto boardDto){
        BoardEntity board = boardRepository.save(boardDto.toEntity(userRepository, detailCodeRepository));
        return board.getId();
    }

    //longValue 맞나..... 모르겠어요 아래 다

    //게시글 수정
    @Transactional
    public int update(Integer id, BoardDto boardDto){
        BoardEntity board = boardRepository.findById(id.longValue()).orElseThrow(()-> new IllegalArgumentException("해당 유저의 게시글이 없습니다. id : "+id));
        board.update(boardDto);
        boardRepository.save(board);
        return board.getId();
    }

    //게시글 삭제
    @Transactional
    public void deleteById(Integer id){
        boardRepository.deleteById(id.longValue());
    }

    //게시글 상세 조회
    @Transactional(readOnly = true)
    public BoardEntity getBoard(Integer id){
        return boardRepository.findById(id.longValue()).orElseThrow(()->{
            return new IllegalArgumentException("글 상세보기 실패 : 게시글을 찾을 수 없습니다. id : " + id);
        });
    }

    //전체 게시글 목록 조회
    public List<BoardEntity> findAll() {
        return boardRepository.findAll();
    }
}
