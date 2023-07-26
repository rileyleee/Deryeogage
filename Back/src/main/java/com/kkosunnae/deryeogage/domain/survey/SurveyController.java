package com.kkosunnae.deryeogage.domain.survey;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class SurveyController {

    private final SurveyService surveyService;

    @GetMapping("/surveys/{userId}")
    public ResponseEntity<SurveyDto> getSurvey(@RequestParam Long userId) {
        SurveyDto survey = surveyService.getSurvey(userId);
        return ResponseEntity.status(HttpStatus.OK).body(survey);
    }

    @PostMapping("/surveys")
    public ResponseEntity<Object> saveSurvey(SurveyDto survey) {
        return null;
    }

    @PutMapping("/surveys/{userId}")
    public ResponseEntity<Object> update(@RequestParam Long userId) {
        return null;
    }
}

