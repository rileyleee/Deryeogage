package com.kkosunnae.deryeogage.domain.mission;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;

    //입양확정 시 미션 최초 생성
    public Integer save(MissionDto missionDto) {

        MissionEntity mission = missionRepository.save(missionDto.toEntity(adoptRepository));
        return mission.getId();
    }
}
