package com.kkosunnae.deryeogage.domain.survey;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import com.kkosunnae.deryeogage.global.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/surveys")
public class SurveyController {

    private final JwtUtil jwtUtil;

    private final SurveyService surveyService;

    @GetMapping
    public Response<SurveyDto> getSurvey(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: "+ jwtToken);
        Long userId = jwtUtil.getUserId(jwtToken);
        SurveyDto survey = surveyService.getSurvey(userId);
        return Response.success(survey);
    }

    @PostMapping
    public Response<Object> saveSurvey(@RequestHeader("Authorization") String authorizationHeader, @RequestBody SurveyDto surveyDto) {
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: "+ jwtToken);

        Long userId = jwtUtil.getUserId(jwtToken);
        surveyDto.setUserId(userId);
        log.info("설문조사 dto 정보 : " + surveyDto.getActivity());
        surveyService.save(surveyDto);
        return Response.success(null);
    }

    @PutMapping
    public Response<Object> update(@RequestHeader("Authorization") String authorizationHeader, @RequestBody SurveyDto surveyDto) {
        String jwtToken = authorizationHeader.substring(7);
        log.info("헤더에서 가져온 토큰 정보: "+ jwtToken);

        Long userId = jwtUtil.getUserId(jwtToken);
        surveyService.update(userId, surveyDto);
        return Response.success(null);
    }
}


