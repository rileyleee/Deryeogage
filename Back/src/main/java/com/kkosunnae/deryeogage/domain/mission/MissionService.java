package com.kkosunnae.deryeogage.domain.mission;

import com.kkosunnae.deryeogage.domain.adopt.AdoptRepository;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
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

    private final UserRepository userRepository;
    private final AdoptRepository adoptRepository;
    private final MissionRepository missionRepository;

    //입양확정 시 미션 최초 생성
    public MissionEntity save(Long missionUserId, Integer adoptId) {

        MissionDto missionDto = new MissionDto(missionUserId);
        missionDto.setAdoptId(adoptId);
        MissionEntity mission = missionRepository.save(missionDto.toEntity(userRepository, adoptRepository));

        return mission;
    }
}
