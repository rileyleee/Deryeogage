package com.kkosunnae.deryeogage.domain.board;

import lombok.*;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;


@Getter
@Setter
@ToString
public class BoardFileDto {
    private Integer id;
    private Integer boardId;
    private String originalName;
    private String savedName;
    private boolean type;
    private String path;
    private LocalDateTime createdDate;

    @Builder
    public BoardFileDto(Integer id, Integer boardId, String originalName, String savedName, boolean type, String path, LocalDateTime createdDate) {
        this.id = id;
        this.boardId = boardId;
        this.originalName = originalName;
        this.savedName = savedName;
        this.type = type;
        this.path = path;
        this.createdDate = createdDate;
    }

    public BoardFileDto() {
    }

    public boolean isType() {
        return type;
    }

    public BoardFileEntity toEntity(BoardRepository boardRepository) {
        BoardEntity board = boardRepository.findById(this.boardId)
                .orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다."));

        return BoardFileEntity.builder()
                .board(board)
                .originalName(originalName)
                .savedName(savedName)
                .type(type)
                .path(path)
                .createdDate(createdDate)
                .build();
    }
}
