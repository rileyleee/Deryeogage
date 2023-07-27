package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.global.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class SurveyController {

    private final SurveyService surveyService;

    @GetMapping("/surveys/{userId}")
    public Response<SurveyDto> getSurvey(@RequestParam Long userId) {
        SurveyDto survey = surveyService.getSurvey(userId);
        return Response.success(survey);
    }

    @PostMapping("/surveys")
    public Response<Object> saveSurvey(SurveyDto surveyDto) {
        surveyService.save(surveyDto);
        return Response.success(null);
    }

    @PutMapping("/surveys/{userId}")
    public Response<Object> update(@RequestParam Long userId, SurveyDto surveyDto) {
        surveyService.update(userId, surveyDto);
        return Response.success(null);
    }
}

