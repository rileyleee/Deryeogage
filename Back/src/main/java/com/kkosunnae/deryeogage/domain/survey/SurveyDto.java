package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Getter @Setter
@RequiredArgsConstructor
@Builder
public class SurveyDto {

    private int id;

    private long user;

    private char friendly;

    private char activity;

    private char dependency;

    private char hair;

    private char bark;

    public static SurveyDto toDto(SurveyEntity surveyEntity) {
        return SurveyDto.builder()
                .id(surveyEntity.getId())
                .user(surveyEntity.getUser().getId())
                .friendly(surveyEntity.getFriendly())
                .activity(surveyEntity.getActivity())
                .dependency(surveyEntity.getDependency())
                .hair(surveyEntity.getHair())
                .bark(surveyEntity.getBark())
                .build();
    }
}
