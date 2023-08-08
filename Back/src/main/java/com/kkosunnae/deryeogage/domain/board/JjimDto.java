package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.NoSuchElementException;

@Getter @Setter
@NoArgsConstructor
public class JjimDto {
    private int id;
    private int boardId;
    private long userId;

    @Builder
    public JjimDto(int id, int boardId, long userId) {
        this.id = id;
        this.boardId = boardId;
        this.userId = userId;
    }

    public JjimEntity toEntity(BoardRepository boardRepository, UserRepository userRepository){

        BoardEntity board = boardRepository.findById(this.boardId)
                .orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다."));

        UserEntity user = userRepository.findById(this.userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        return JjimEntity.builder()
                .board(board)
                .user(user)
                .build();
    }

}
