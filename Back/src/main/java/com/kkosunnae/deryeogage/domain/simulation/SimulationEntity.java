package com.kkosunnae.deryeogage.domain.simulation;


import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "simulation")
public class SimulationEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",updatable = false)
    private UserEntity user;


    @Column(length = 20, name = "pet_type",updatable = false)
    private String petType;

    @Column(length = 20, name = "pet_name",updatable = false)
    private String petName;

    @Column(length = 20,updatable = false)
    private String background;

    @Column(name = "start_time",updatable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time",updatable = false)
    private LocalDateTime endTime;

    @Column(name = "cost")
    private Integer cost;

    @Column(name = "last_time")
    private LocalDateTime lastTime;

    @Column
    private String train;

    @Column
    private Byte health;

    @Column(name = "quiz_num", nullable = false, insertable = false)
    private Byte quizNum;

    @Column
    private String requirement;

    @Column(length = 20)
    private String title;

    @Column
    private Boolean end;

    @Column(name = "end_check")
    private Boolean endCheck;

    @Builder
    public SimulationEntity(Integer id, UserEntity user, String petType, String petName, String background, LocalDateTime startTime, LocalDateTime endTime, LocalDateTime lastTime, Integer cost, String train, Byte health, Byte quizNum, String requirement, String title, Boolean end, Boolean endCheck) {
        this.id=id;
        this.user = user;
        this.petType = petType;
        this.petName = petName;
        this.background = background;
        this.startTime = LocalDateTime.now();
        this.endTime = LocalDateTime.now().plusDays(1);
        this.lastTime = LocalDateTime.now();
        this.cost = cost; // Default value set in Java code
        this.train = train;
        this.health = health;
        this.quizNum = quizNum;
        this.requirement = requirement;
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
                .train(this.train)
                .health(this.health)
                .quizNum(this.quizNum)
                .requirement(this.requirement)
                .title(this.title)
                .end(this.end)
                .endCheck(this.endCheck)
                .build();
    }

    public void update(String requirement) {
        this.requirement = requirement;
    }
}