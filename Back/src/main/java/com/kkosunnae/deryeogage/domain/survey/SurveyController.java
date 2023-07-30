package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.global.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequiredArgsConstructor
@RestController
public class SurveyController {

    private final SurveyService surveyService;

    @GetMapping("/surveys/{userId}")
    public Response<SurveyDto> getSurvey(@PathVariable Long userId) {
        SurveyDto survey = surveyService.getSurvey(userId);
        return Response.success(survey);
    }

    @PostMapping("/surveys")
    public Response<Object> saveSurvey(@RequestBody SurveyDto surveyDto) {
        log.info("설문조사 dto 정보 : " + surveyDto.getActivity());
        surveyService.save(surveyDto);
        return Response.success(null);
    }

    @PutMapping("/surveys/{userId}")
    public Response<Object> update(@PathVariable Long userId, @RequestBody SurveyDto surveyDto) {
        surveyService.update(userId, surveyDto);
        return Response.success(null);
    }
}


