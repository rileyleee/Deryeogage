package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.NoSuchElementException;

@Getter
@NoArgsConstructor
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

    @Column(length = 5)
    private String ranking;

    @Builder
    private SurveyEntity(Integer id, UserEntity user, Character friendly, Character activity, Character dependency, Character hair, Character bark, String ranking) {
        this.id = id;
        this.user = user;
        this.friendly = friendly;
        this.activity = activity;
        this.dependency = dependency;
        this.hair = hair;
        this.bark = bark;
        this.ranking = ranking;
    }

    public SurveyDto toDto() {
        return SurveyDto.builder()
                .id(this.id)
                .userId(this.user.getId())
                .friendly(this.friendly)
                .activity(this.activity)
                .dependency(this.dependency)
                .hair(this.hair)
                .bark(this.bark)
                .ranking(this.ranking)
                .build();
    }

    public void update(SurveyDto surveyDto) {
        this.friendly = surveyDto.getFriendly();
        this.activity = surveyDto.getActivity();
        this.dependency = surveyDto.getDependency();
        this.hair = surveyDto.getHair();
        this.bark = surveyDto.getBark();
        this.ranking = surveyDto.getRanking();
    }
}
