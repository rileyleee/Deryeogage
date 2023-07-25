package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class SurveyEntity {

    @Id @GeneratedValue
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id")
    private UserEntity user;

    @Column(name = "friendly")
    private Character friendly;

    @Column(name = "activity")
    private Character activity;

    @Column(name = "dependency")
    private Character dependency;

    @Column(name = "hair")
    private Character hair;

    @Column(name = "bark")
    private Character bark;
}
