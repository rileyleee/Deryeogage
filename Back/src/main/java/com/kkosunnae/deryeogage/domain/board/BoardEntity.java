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
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="region_code", length = 15)
    private String regionCode;

    @Column(name="dog_type_code", length = 15)
    private String dogTypeCode;

    @Column(length = 20)
    private String title;

    @Column(length = 1)
    private String friendly;

    @Column(length = 1)
    private String activity;

    @Column(length = 1)
    private String dependency;

    @Column(length = 1)
    private String bark;

    @Column(length = 1)
    private String hair;

    @Column(length = 10)
    private String name;

    @Column
    private Boolean gender;

    @Column
    private Integer age;

    @Column(name="chipYn")
    private Boolean chip_yn;

    @Column(length = 300)
    private String health;

    @Column(length = 300)
    private String introduction;

    @Column(name="createdDate")
    private LocalDateTime created_date;

}
