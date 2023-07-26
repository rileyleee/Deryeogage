package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SurveyService {

    private SurveyRepository surveyRepository;

    public SurveyDto getSurvey(Long userId) {
        SurveyEntity survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("설문조사가 존재하지 않습니다."));

        return SurveyDto.toDto(survey);
    }

    public int save(SurveyDto surveyDto) {
        surveyRepository.save(Sur)
    }
}
