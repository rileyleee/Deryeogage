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
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Character friendly;

    private Character activity;

    private Character dependency;

    private Character hair;

    private Character bark;
}
