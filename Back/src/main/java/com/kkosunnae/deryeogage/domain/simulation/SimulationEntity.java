package com.kkosunnae.deryeogage.domain.simulation;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
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

    @Column(name = "quiz_num", nullable = false, insertable = false)
    private Byte quizNum;

    @Column(length = 20)
    private String title;

    @Column
    private Boolean end;

    @Column(name = "end_check")
    private Boolean endCheck;

    @Builder
    public SimulationEntity(Integer id, UserEntity user, String petType, String petName, String background, LocalDateTime startTime, LocalDateTime endTime, LocalDateTime lastTime, Integer cost, String petRequire, String petEmotion, Float train1, Float train2, Float train3, Float train4, Byte health, Byte quizNum, String title, Boolean end, Boolean endCheck) {
        this.id=id;
        this.user = user;
        this.petType = petType;
        this.petName = petName;
        this.background = background;
        this.startTime = LocalDateTime.now();
        this.endTime = LocalDateTime.now().plusDays(1);
        this.lastTime = LocalDateTime.now();
        this.cost = cost; // Default value set in Java code
        this.petRequire = petRequire;
        this.petEmotion = petEmotion;
        this.train1 = train1;
        this.train2 = train2;
        this.train3 = train3;
        this.train4 = train4;
        this.health = health;
        this.quizNum = quizNum;
        this.title = title;
        this.end = false;
        this.endCheck = false;
    }

    public SimulationDto toDto() {
        return SimulationDto.builder()
                .id(this.id)
                .user(this.user.getId()) // Consider using a UserDto instead of UserEntity here
                .petType(this.petType)
                .petName(this.petName)
                .background(this.background)
                .startTime(this.startTime)
                .endTime(this.endTime)
                .cost(this.cost)
                .lastTime(this.lastTime)
                .petRequire(this.petRequire)
                .petEmotion(this.petEmotion)
                .train1(this.train1)
                .train2(this.train2)
                .train3(this.train3)
                .train4(this.train4)
                .health(this.health)
                .quizNum(this.quizNum)
                .title(this.title)
                .end(this.end)
                .endCheck(this.endCheck)
                .build();
    }
}