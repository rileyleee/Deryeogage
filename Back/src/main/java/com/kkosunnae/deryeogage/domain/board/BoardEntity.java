package com.kkosunnae.deryeogage.domain.board;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;



@Entity
@Getter
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="region_code", length = 15)
    private String regionCode;

    @Column(name="dog_type_code", length = 15)
    private String dogTypeCode;

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

}
