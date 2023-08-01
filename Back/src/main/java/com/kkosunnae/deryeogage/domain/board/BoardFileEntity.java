package com.kkosunnae.deryeogage.domain.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Getter
@NoArgsConstructor
@Table(name = "board_file")
public class BoardFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    @Column(length = 100, name = "original_name")
    private String originalName;

    @Column(length = 100, name = "saved_name")
    private String savedName;

    @Column
    private Boolean type;

    @Column(length = 100)
    private String path;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Builder
    public BoardFileEntity(Integer id, BoardEntity board, String originalName, String savedName, Boolean type, String path, LocalDateTime createdDate) {
        this.id = id;
        this.board = board;
        this.originalName = originalName;
        this.savedName = savedName;
        this.type = type;
        this.path = path;
        this.createdDate = createdDate;
    }

    public BoardFileDto toDto(){
        return BoardFileDto.builder()
                .boardId(this.board.getId())
                .originalName(this.originalName)
                .savedName(this.savedName)
                .type(this.type)
                .path(this.path)
                .createdDate(this.createdDate)
                .build();
    }
}
