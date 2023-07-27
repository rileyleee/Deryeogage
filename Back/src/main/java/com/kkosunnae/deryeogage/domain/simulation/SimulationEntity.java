package com.kkosunnae.deryeogage.domain.simulation;


import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@Table(name = "simulation")
public class SimulationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(length = 20, name = "pet_type")
    private String petType;

    @Column(length = 20, name = "pet_name")
    private String petName;

    @Column(length = 20)
    private String background;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column
    private Integer cost;

    @Column(name = "last_time")
    private LocalDateTime lastTime;

    @Column(length = 20, name = "pet_require")
    private String petRequire;

    @Column(length = 20, name = "pet_emotion")
    private String petEmotion;

    @Column
    private Float train1;

    @Column
    private Float train2;

    @Column
    private Float train3;

    @Column
    private Float train4;

    @Column
    private Byte health;

    @Column(name = "quiz_num")
    private Byte quizNum;

    @Column(length = 20)
    private String title;

    @Column
    private Boolean end;

    @Column(name = "end_check")
    private Boolean endCheck;
}