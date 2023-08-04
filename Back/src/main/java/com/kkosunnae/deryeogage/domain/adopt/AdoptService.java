package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionEntity;
import com.kkosunnae.deryeogage.domain.mission.MissionRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionService;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@RequiredArgsConstructor
public class AdoptService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final AdoptRepository adoptRepository;
    private final MissionRepository missionRepository;
    private final MissionService missionService;

    //내 분양정보 목록 조회하기

    //분양자의 세부 분양정보 조회하기

    //내 입양정보 목록 조회하기

    //입양자의 세부 입양정보 조회하기


    //입양 정보 등록하기(약속 일정 잡기 위해서 저장버튼을 누르면 생성된다.)
    public Integer save(AdoptDto adoptDto) {
        adoptDto.setStatus(AdoptStatus.DEPART); // 상태: 입양 중으로 저장
        AdoptEntity thisAdopt = adoptRepository.save(adoptDto.toEntity(userRepository, boardRepository));
        return thisAdopt.getId();
    }

    //입양확정 시 미션 생성하여 입양 정보 업데이트
    public void updateAdopt(AdoptDto adoptDto) {

        // 입양정보 상태 변경
        adoptDto.setStatus(AdoptStatus.ARRIVE);

        AdoptEntity adoptEntity = adoptRepository.findById(adoptDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 입양정보가 존재하지 않습니다." + adoptDto.getId()));
        // 입양자 -> 미션 작성 필요
        Long missionUserId = adoptDto.getToUserId();

        // 입양자를 uesrId로 미션 데이터 하나 새로이 생성하고 반환
        MissionEntity missionEntity= missionService.save(missionUserId);

        // 미션 아이디 담기
        adoptDto.setMissionId(missionEntity.getId());

        // 입양정보에 미션 반영 수정
        adoptEntity.update(adoptDto, missionEntity);
    }
}
