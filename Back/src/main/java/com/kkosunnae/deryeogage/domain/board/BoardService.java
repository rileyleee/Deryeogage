package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.common.DetailCodeRepository;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final DetailCodeRepository detailCodeRepository;

    //게시글 작성
    @Transactional
    public int save(BoardDto boardDto){
        log.info("게시글 제목 : ", boardDto.getTitle());
        boardDto.setCreatedDate(LocalDateTime.now());
        BoardEntity board = boardRepository.save(boardDto.toEntity(userRepository, detailCodeRepository));
        return board.getId();
    }

    //longValue 맞나..... 모르겠어요 아래 다

    //게시글 수정
    @Transactional
    public int update(Integer id, BoardDto boardDto){
        BoardEntity board = boardRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("해당 유저의 게시글이 없습니다. id : "+id));
        boardDto.setCreatedDate(LocalDateTime.now());
        board.update(boardDto);
        boardRepository.save(board);
        return board.getId();
    }

    //게시글 삭제
    @Transactional
    public void deleteById(Integer id){
        boardRepository.deleteById(id);
    }

    //게시글 상세 조회
    @Transactional(readOnly = true)
    public BoardDto getBoard(Integer id){
        BoardEntity board = boardRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("게시글을 찾을 수 없습니다."));
        return board.toDto();
    }

    //전체 게시글 목록 조회
    @Transactional
    public Page<BoardDto> findAll(final Pageable pageable) {
        Page<BoardEntity> boardPage = boardRepository.findAll(pageable);
        return boardPage.map(BoardEntity::toDto);
    }
}
