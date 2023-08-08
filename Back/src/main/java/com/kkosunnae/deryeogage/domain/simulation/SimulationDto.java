package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String train;
    private Byte health;
    private Byte quizNum;
    private String requirement;
    private String title;
    private boolean end;
    private boolean endCheck;

    @Builder
    public SimulationDto(Integer id, Long user, String petType, String petName, String background, LocalDateTime startTime, LocalDateTime endTime, Integer cost, LocalDateTime lastTime, String train, Byte health, Byte quizNum, String requirement, String title, boolean end, boolean endCheck) {
        this.id = id;
        this.user = user;
        this.petType = petType;
        this.petName = petName;
        this.background = background;
        this.startTime = startTime;
        this.endTime = endTime;
        this.cost = cost;
        this.lastTime = lastTime;
        this.train = train;
        this.health = health;
        this.quizNum = quizNum;
        this.requirement = requirement;
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
                .cost((cost != null) ? cost : 300000)
                .lastTime(this.lastTime)
                .train((train != null) ? train : "00000000")
                .health((health != null) ? health : 100)
                .quizNum((quizNum != null) ? quizNum : 0)
                .requirement((requirement != null) ? requirement : "00000")
                .title(this.title)
                .end(this.end)
                .endCheck(this.endCheck)
                .build();
    }
}
