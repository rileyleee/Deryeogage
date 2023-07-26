package com.kkosunnae.deryeogage.domain.board;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "like")
public class LikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "board_id")
    private Integer boardId;

    @Column(name = "user_id")
    private Long userId;
}