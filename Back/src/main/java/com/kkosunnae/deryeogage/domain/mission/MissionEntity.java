package com.kkosunnae.deryeogage.domain.mission;

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

    @Column(name = "adopt_id")
    private Integer adoptId;

    @Column(name = "user_id")
    private Long userId;

    @Column(length = 100, name = "mission_url1")
    private String missionUrl1;

    @Column(length = 100, name = "mission_url2")
    private String missionUrl2;

    @Column(length = 100, name = "mission_url3")
    private String missionUrl3;

    @Column(length = 100, name = "mission_url4")
    private String missionUrl4;
}