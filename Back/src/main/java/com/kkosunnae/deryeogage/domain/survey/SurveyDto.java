package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.*;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.NoSuchElementException;

@Getter @Setter
@NoArgsConstructor
public class SurveyDto {

    private int id;

    private long userId;

    private char friendly;

    private char activity;

    private char dependency;

    private char hair;

    private char bark;

    @Builder
    public SurveyDto(int id, long userId, char friendly, char activity, char dependency, char hair, char bark) {
        this.id = id;
        this.userId = userId;
        this.friendly = friendly;
        this.activity = activity;
        this.dependency = dependency;
        this.hair = hair;
        this.bark = bark;
    }

    public SurveyEntity toEntity(UserRepository userRepository) {
        UserEntity user = userRepository.findById(this.userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        return SurveyEntity.builder()
                .id(this.id)
                .user(user)
                .friendly(this.friendly)
                .activity(this.activity)
                .dependency(this.dependency)
                .hair(this.hair)
                .bark(this.bark)
                .build();
    }
}

