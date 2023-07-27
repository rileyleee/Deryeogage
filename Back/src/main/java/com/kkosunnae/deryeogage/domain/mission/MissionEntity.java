package com.kkosunnae.deryeogage.domain.mission;

import com.kkosunnae.deryeogage.domain.adopt.AdoptEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
@Entity
@Getter
@Table(name = "mission")
public class MissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adopt_id")
    private AdoptEntity adopt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(length = 100, name = "mission_url1")
    private String missionUrl1;

    @Column(length = 100, name = "mission_url2")
    private String missionUrl2;

    @Column(length = 100, name = "mission_url3")
    private String missionUrl3;

    @Column(length = 100, name = "mission_url4")
    private String missionUrl4;
}