package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public SurveyDto getSurvey(Long userId) {
        SurveyEntity survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("설문조사가 존재하지 않습니다."));

        return survey.toDto();
    }

    public int save(SurveyDto surveyDto) {
        SurveyEntity survey = surveyRepository.save(surveyDto.toEntity(userRepository));
        return survey.getId();
    }

    public int update(Long userId, SurveyDto surveyDto) {
        SurveyEntity survey = getSurvey(userId).toEntity(userRepository);
        survey.update(surveyDto);
        surveyRepository.save(survey);
        return survey.getId();
    }
}
