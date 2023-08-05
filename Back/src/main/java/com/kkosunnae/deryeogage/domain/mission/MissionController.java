package com.kkosunnae.deryeogage.domain.mission;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/missions")
public class MissionController {


    // 한 개의 입양내역 중 상세 미션 조회

    // 한 개의 입양내역 중 상세 미션 수행 -> 사진 등록

    // 한 개의 입양내역 중 상세 미션 수행 삭제 -> 사진 삭제




    // 미션 자체의 CUD는 입양내역 CRUD에 의해 부수적으로 발생하는 것임에 따라 controller에서 만들지 않음
}
