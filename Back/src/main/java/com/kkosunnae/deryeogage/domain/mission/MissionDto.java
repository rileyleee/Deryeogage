package com.kkosunnae.deryeogage.domain.mission;

import com.kkosunnae.deryeogage.domain.adopt.AdoptEntity;
import com.kkosunnae.deryeogage.domain.adopt.AdoptRepository;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.*;

import java.util.NoSuchElementException;

@Getter
@Setter
@ToString
public class MissionDto {
    private Integer id;
    private int adoptId;
    private Long userId;
    private String missionUrl1;
    private String missionUrl2;
    private String missionUrl3;
    private String missionUrl4;

    public MissionDto() {
    }

    public MissionDto(Long userId) {
        this.userId = userId;
    }

    @Builder

    public MissionDto(Integer id, int adoptId, Long userId, String missionUrl1, String missionUrl2, String missionUrl3, String missionUrl4) {
        this.id = id;
        this.adoptId = adoptId;
        this.userId = userId;
        this.missionUrl1 = missionUrl1;
        this.missionUrl2 = missionUrl2;
        this.missionUrl3 = missionUrl3;
        this.missionUrl4 = missionUrl4;
    }

    public MissionEntity toEntity(UserRepository userRepository, AdoptRepository adoptRepository) {
        UserEntity user = userRepository.findById(this.userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));
        AdoptEntity adopt = adoptRepository.findById(this.adoptId)
                .orElseThrow(() -> new NoSuchElementException("해당 입양정보가 존재하지 않습니다."));

        return MissionEntity.builder()
                .adopt(adopt)
                .user(user)
                .missionUrl1(missionUrl1)
                .missionUrl2(missionUrl2)
                .missionUrl3(missionUrl3)
                .missionUrl4(missionUrl4)
                .build();
    }
}
