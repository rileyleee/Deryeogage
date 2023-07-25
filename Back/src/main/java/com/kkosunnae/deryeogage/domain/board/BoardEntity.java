package com.kkosunnae.deryeogage.domain.board;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "region_code")
    private String regionCode;

    @Column(name = "dog_type_code")
    private String dogTypeCode;

    @Column(name = "title")
    private String title;

    @Column(name = "friendly")
    private Character friendly;

    @Column(name = "activity")
    private Character activity;

    @Column(name = "dependency")
    private Character dependency;

    @Column(name = "bark")
    private Character bark;

    @Column(name = "hair")
    private Character hair;

    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private boolean gender;

    @Column(name = "age")
    private Byte age;

    @Column(name = "chip_yn")
    private boolean chipYn;

    @Column(name = "health")
    private String health;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

}
