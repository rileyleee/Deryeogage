package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.domain.user.UserDto;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.*;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Getter
@Setter
@NoArgsConstructor
public class SimulationDto {
    private Integer id;
    private Long user; // userId 필드를 userDto 변경
    private String petType;
    private String petName;
    private String background;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer cost;
    private LocalDateTime lastTime;
    private String petRequire;
    private String petEmotion;
    private Float train1;
    private Float train2;
    private Float train3;
    private Float train4;
    private Byte health;
    private Byte quizNum;
    private String title;
    private boolean end;
    private boolean endCheck;

    @Builder
    public SimulationDto(Integer id, Long user, String petType, String petName, String background, LocalDateTime startTime, LocalDateTime endTime, Integer cost, LocalDateTime lastTime, String petRequire, String petEmotion, Float train1, Float train2, Float train3, Float train4, Byte health, Byte quizNum, String title, boolean end, boolean endCheck) {
        this.id = id;
        this.user = user;
        this.petType = petType;
        this.petName = petName;
        this.background = background;
        this.startTime = startTime;
        this.endTime = endTime;
        this.cost = cost;
        this.lastTime = lastTime;
        this.petRequire = petRequire;
        this.petEmotion = petEmotion;
        this.train1 = train1;
        this.train2 = train2;
        this.train3 = train3;
        this.train4 = train4;
        this.health = health;
        this.quizNum = quizNum;
        this.title = title;
        this.end = end;
        this.endCheck = endCheck;
    }

    public SimulationEntity toEntity(UserRepository userRepository) {
        UserEntity user = userRepository.findById(this.user)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));
        return SimulationEntity.builder()
                .id(this.id)
                .user(user)
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
