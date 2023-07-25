package com.kkosunnae.deryeogage.domain.board;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Table(name = "board_file")
public class BoardFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "board_id", nullable = false)
    private Integer boardId ;

    @Column(name = "original_name")
    private String originalName;
    @Column(name = "saved_name")
    private String savedName;
    @Column(name = "type")
    private boolean type;
    @Column(name = "path")
    private String path;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
