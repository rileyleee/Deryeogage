package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.mission.MissionEntity;
import com.kkosunnae.deryeogage.domain.mission.MissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@RequiredArgsConstructor
public class AdoptService {

    private final AdoptRepository adoptRepository;
    private final MissionRepository missionRepository;


    //내 입양정보 목록 조회하기

    //세부 입양정보 조회하기

    //입양 정보 등록하기

    //입양 정보 수정하기
    public void updateAdopt(AdoptDto adoptDto) {
        AdoptEntity adoptEntity = adoptRepository.findById(adoptDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid adopt id: " + adoptDto.getId()));
        MissionEntity missionEntity = missionRepository.findById(adoptDto.getMissionId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid mission id: " + adoptDto.getMissionId()));
        adoptEntity.update(adoptDto, missionEntity);
    }
}
