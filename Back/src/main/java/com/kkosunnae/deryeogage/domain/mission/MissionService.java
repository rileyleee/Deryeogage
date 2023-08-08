package com.kkosunnae.deryeogage.domain.mission;

import com.kkosunnae.deryeogage.domain.adopt.AdoptRepository;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MissionService {

    private final UserRepository userRepository;
    private final AdoptRepository adoptRepository;
    private final MissionRepository missionRepository;

    //입양확정 시 미션 최초 생성(adoptService의 updateAdopt에서 호출)
    public MissionEntity save(Long missionUserId, Integer adoptId) {

        MissionDto missionDto = new MissionDto(missionUserId);
        missionDto.setAdoptId(adoptId);
        MissionEntity mission = missionRepository.save(missionDto.toEntity(userRepository, adoptRepository));

        return mission;
    }

    // 미션 수행 여부 확인(후책임비 반환 시 호출)
    public boolean missionCheck(Integer missionId) {

        MissionEntity missionEntity = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 미션이 존재하지 않습니다. missionId: " + missionId));

        return missionEntity.getMissionUrl1() != null &&
                missionEntity.getMissionUrl2() != null &&
                missionEntity.getMissionUrl3() != null &&
                missionEntity.getMissionUrl4() != null;
    }

    // 한 개의 입양 내역에 대한 미션 조회
    public MissionDto getMission(Integer missionId) {

        MissionEntity missionEntity = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 미션이 존재하지 않습니다. missionId: " + missionId));

        return missionEntity.toDto();
    }

    // 한 개의 입양 내역 중 각각의 미션 단계에 대한 파일 등록
    public String registOne(MissionDto missionDto, int urlId, Map<String, List> nameList) {

        Integer missionId = missionDto.getId();

        MissionEntity eachMission = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 미션이 존재하지 않습니다. missionId: " + missionId));

        // 기존 URL 값 가져오기
        missionDto.setMissionUrl1(eachMission.getMissionUrl1());
        missionDto.setMissionUrl2(eachMission.getMissionUrl2());
        missionDto.setMissionUrl3(eachMission.getMissionUrl3());
        missionDto.setMissionUrl4(eachMission.getMissionUrl4());

        List<String> savedPaths = nameList.get("path");
        switch (urlId) {
            case 1:
                missionDto.setMissionUrl1(savedPaths.get(0));
                break;
            case 2:
                missionDto.setMissionUrl2(savedPaths.get(0));
                break;
            case 3:
                missionDto.setMissionUrl3(savedPaths.get(0));
                break;
            case 4:
                missionDto.setMissionUrl4(savedPaths.get(0));
                break;
            default:
                throw new IllegalArgumentException("존재하지 않는 미션 단계입니다.: " + urlId);
        }

        eachMission.update(missionDto);

        return savedPaths.get(0);
    }

    // 한 개의 입양 내역 중 각각의 미션 단계에 대한 파일 삭제

    public void deleteOne(MissionDto missionDto, int urlId) {

        Integer missionId = missionDto.getId();

        MissionEntity eachMission = missionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 미션이 존재하지 않습니다. missionId: " + missionId));

        // 기존 URL 값 가져오기
        missionDto.setMissionUrl1(eachMission.getMissionUrl1());
        missionDto.setMissionUrl2(eachMission.getMissionUrl2());
        missionDto.setMissionUrl3(eachMission.getMissionUrl3());
        missionDto.setMissionUrl4(eachMission.getMissionUrl4());

        // DB 삭제
        switch (urlId) {
            case 1:
                missionDto.setMissionUrl1(null);
                break;
            case 2:
                missionDto.setMissionUrl2(null);
                break;
            case 3:
                missionDto.setMissionUrl3(null);
                break;
            case 4:
                missionDto.setMissionUrl4(null);
                break;
            default:
                throw new IllegalArgumentException("존재하지 않는 미션 단계입니다.: " + urlId);
        }



        eachMission.update(missionDto);

        //3S 삭제는 아직
    }
}