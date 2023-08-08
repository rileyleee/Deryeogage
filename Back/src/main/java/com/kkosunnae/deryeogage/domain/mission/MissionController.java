package com.kkosunnae.deryeogage.domain.mission;

import com.kkosunnae.deryeogage.global.s3file.S3FileService;
import com.kkosunnae.deryeogage.global.util.Response;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Api
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionService missionService;
    private final S3FileService s3FileService;


    // 한 개의 입양내역 중 상세 미션 조회
    @GetMapping("/{missionId}")
    public Response<Object> getMissions(@PathVariable Integer missionId) {
        MissionDto missionDto = missionService.getMission(missionId);
        return Response.success(missionDto);
    }

    // 한 개의 입양내역 중 상세 미션 수행 -> 사진 등록
    @PostMapping("/{missionId}/{urlId}")
    public Response<Object> registOne(MissionDto missionDto, @PathVariable int urlId, @RequestPart("multipartFile") List<MultipartFile> multipartFile) {

        // 원본 파일명과 S3에 저장된 파일명이 담긴 Map
        Map<String, List> nameList = s3FileService.uploadFile(multipartFile);

        String url = missionService.registOne(missionDto, urlId, nameList);
        return Response.success(url);
    }

    // 한 개의 입양내역 중 상세 미션 수행 삭제 -> 사진 삭제
    @PutMapping("/{missionId}/{urlId}")
    public Response<Object> deleteOne(@RequestBody MissionDto missionDto, @PathVariable int urlId){
        missionService.deleteOne(missionDto, urlId);

        return Response.success(null);
    }
    // 미션 자체의 CUD는 입양내역 CRUD에 의해 부수적으로 발생하는 것임에 따라 controller에서 만들지 않음
}
