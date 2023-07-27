package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.adopt.AdoptEntity;
import com.kkosunnae.deryeogage.domain.chat.ChatRoomEntity;
import com.kkosunnae.deryeogage.domain.common.DetailCodeEntity;
import com.kkosunnae.deryeogage.domain.cost.PostCostEntity;
import com.kkosunnae.deryeogage.domain.cost.PreCostEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="region_code")
    private DetailCodeEntity regionCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="dog_type_code")
    private DetailCodeEntity dogTypeCode;

    @Column(length = 20)
    private String title;

    private Character friendly;

    private Character activity;

    private Character dependency;

    private Character bark;

    private Character hair;

    @Column(length = 10)
    private String name;

    private Boolean gender;

    private Byte age;

    @Column(name="chip_yn")
    private Boolean chipYn;

    @Column(length = 300)
    private String health;

    @Column(length = 300)
    private String introduction;

    @Column(name="created_date")
    private LocalDateTime createdDate;

    @OneToMany(mappedBy = "board")
    private List<ChatRoomEntity> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<JjimEntity> likes = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardFileEntity> boardFiles = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<PreCostEntity> preCosts = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<PostCostEntity> postCosts = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<AdoptEntity> adopts = new ArrayList<>();
}
