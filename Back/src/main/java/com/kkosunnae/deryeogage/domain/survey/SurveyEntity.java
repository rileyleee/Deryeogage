package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "survey")
public class SurveyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(length = 1)
    private String friendly;

    @Column(length = 1)
    private String activity;

    @Column(length = 1)
    private String dependency;

    @Column(length = 1)
    private String hair;

    @Column(length = 1)
    private String bark;
}
