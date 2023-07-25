package com.kkosunnae.deryeogage.domain.simulation;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "simulation")
public class SimulationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "pet_type")
    private String petType;

    @Column(name = "pet_name")
    private String petName;

    @Column(name = "background")
    private String background;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "cost")
    private Integer cost;

    @Column(name = "last_time")
    private LocalDateTime lastTime;

    @Column(name = "pet_require")
    private String petRequire;

    @Column(name = "pet_emotion")
    private String petEmotion;

    @Column(name = "train1")
    private Float train1;

    @Column(name = "train2")
    private Float train2;

    @Column(name = "train3")
    private Float train3;

    @Column(name = "train4")
    private Float train4;

    @Column(name = "health")
    private Byte health;

    @Column(name = "title")
    private String title;

    @Column(name = "quiz_num")
    private Byte quizNum;

    @Column(name = "end")
    private Byte end;

    @Column(name = "end_check")
    private Byte endCheck;

    // getters and setters
}

