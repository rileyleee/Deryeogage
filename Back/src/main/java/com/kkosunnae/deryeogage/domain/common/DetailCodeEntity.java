package com.kkosunnae.deryeogage.domain.common;


import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "detail_code")
public class DetailCodeEntity {

    @Id
    @Column(length = 15)
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private MasterCodeEntity id;

    @Column(length = 15)
    private String name;

    @OneToMany(mappedBy = "regionCode")
    private List<BoardEntity> regionCodeBoards = new ArrayList<>();

    @OneToMany(mappedBy = "dogTypeCode")
    private List<BoardEntity> dogTypeCodeBoards = new ArrayList<>();
}