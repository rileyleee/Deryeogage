package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.NoSuchElementException;

@Getter
@RequiredArgsConstructor
@Builder
@Entity
@Table(name = "survey")
public class SurveyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Character friendly;

    private Character activity;

    private Character dependency;

    private Character hair;

    private Character bark;

    public static SurveyEntity toEntity(SurveyDto surveyDto, UserRepository userRepository) {
        UserEntity user = userRepository.findById(surveyDto.getUserId())
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        return SurveyEntity.builder()
                .user(user)
                .friendly(surveyDto.getFriendly())
                .activity(surveyDto.getActivity())
                .dependency(surveyDto.getDependency())
                .hair(surveyDto.getHair())
                .bark(surveyDto.getBark())
                .build();
    }

}
