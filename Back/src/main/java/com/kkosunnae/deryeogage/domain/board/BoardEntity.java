package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.adopt.AdoptEntity;
import com.kkosunnae.deryeogage.domain.chat.ChatRoomEntity;
import com.kkosunnae.deryeogage.domain.cost.PostCostEntity;
import com.kkosunnae.deryeogage.domain.cost.PreCostEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private UserEntity user;


    @Column(name="region_code")
    private String regionCode;

    @Column
    private Double lat;

    @Column
    private Double lon;

    @Column(name="dog_type_code")
    private String  dogTypeCode;

    @Column(length = 20)
    private String userNickname;

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

//    @OneToMany(mappedBy = "board")
//    private List<ChatRoomEntity> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<JjimEntity> jjims = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardFileEntity> boardFiles = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<PreCostEntity> preCosts = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<PostCostEntity> postCosts = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<AdoptEntity> adopts = new ArrayList<>();

    @Builder
    public BoardEntity(UserEntity user, String regionCode, Double lat, Double lon , String dogTypeCode, String userNickname, String title, Character friendly, Character activity, Character dependency, Character bark, Character hair, String name, Boolean gender, Byte age, Boolean chipYn, String health, String introduction, LocalDateTime createdDate) {
        this.user = user;
        this.regionCode = regionCode;
        this.lat = lat;
        this.lon = lon;
        this.dogTypeCode = dogTypeCode;
        this.userNickname = userNickname;
        this.title = title;
        this.friendly = friendly;
        this.activity = activity;
        this.dependency = dependency;
        this.bark = bark;
        this.hair = hair;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.chipYn = chipYn;
        this.health = health;
        this.introduction = introduction;
        this.createdDate = createdDate;
    }

    public BoardDto toDto(){
        return BoardDto.builder()
                .id(this.id)
                .userId(this.user.getId())
                .regionCode(this.regionCode)
                .lat(this.lat)
                .lon(this.lon)
                .dogTypeCode(this.dogTypeCode)
                .userNickname(this.userNickname)
                .title(this.title)
                .friendly(this.friendly)
                .activity(this.activity)
                .dependency(this.dependency)
                .bark(this.bark)
                .hair(this.hair)
                .name(this.name)
                .gender(this.gender)
                .age(this.age)
                .chipYn(this.chipYn)
                .health(this.health)
                .introduction(this.introduction)
                .createdDate(this.createdDate)
                .build();
    }
    public void update(BoardDto boardDto) {
        this.title = boardDto.getTitle();
        this.friendly = boardDto.getFriendly();
        this.activity = boardDto.getActivity();
        this.dependency = boardDto.getDependency();
        this.bark = boardDto.getBark();
        this.hair = boardDto.getHair();
        this.name = boardDto.getName();
        this.gender = boardDto.isGender();
        this.age = boardDto.getAge();
        this.chipYn = boardDto.isChipYn();
        this.health = boardDto.getHealth();
        this.introduction = boardDto.getIntroduction();
        this.createdDate = boardDto.getCreatedDate();
    }

}
