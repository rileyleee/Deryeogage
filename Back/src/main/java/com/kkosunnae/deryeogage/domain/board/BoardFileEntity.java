package com.kkosunnae.deryeogage.domain.board;

import lombok.Getter;


import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Getter
@Table(name = "board_file")
public class BoardFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "board_id")
    private Integer boardId;

    @Column(length = 20, name = "original_name")
    private String originalName;

    @Column(length = 20, name = "saved_name")
    private String savedName;

    @Column
    private Boolean type;

    @Column(length = 100)
    private String path;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
