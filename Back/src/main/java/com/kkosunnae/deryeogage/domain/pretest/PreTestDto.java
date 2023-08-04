package com.kkosunnae.deryeogage.domain.pretest;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Getter @Setter
public class PreTestDto {

    private int id;

    private long userId;

    private LocalDateTime responseDate;

    private String promise;

    private byte score;

    @Builder
    public PreTestDto(int id, long userId, LocalDateTime responseDate, String promise, byte score) {
        this.id = id;
        this.userId = userId;
        this.responseDate = responseDate;
        this.promise = promise;
        this.score = score;
    }

    public PreTestEntity toEntity(UserRepository userRepository){

        UserEntity user = userRepository.findById(this.userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        return PreTestEntity.builder()
                .id(this.id)
                .user(user)
                .responseDate(this.responseDate)
                .promise(this.promise)
                .score(this.score)
                .build();
    }
}
