package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionEntity;
import com.kkosunnae.deryeogage.domain.mission.MissionService;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdoptService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final AdoptRepository adoptRepository;
    private final MissionService missionService;

    //내 분양정보 목록 조회하기
    public List<AdoptDto> getFromAdopts(Long userId) {
        List<AdoptEntity> myFromAdoptEntity = adoptRepository.findByFromUserId(userId);
        List<AdoptDto> myFromAdoptDto = new ArrayList<>();

        for (AdoptEntity adoptEntity : myFromAdoptEntity) {

            AdoptDto thisAdoptDto = adoptEntity.toDto();
            myFromAdoptDto.add(thisAdoptDto);
        }
        return myFromAdoptDto;
    }

    //내 입양정보 목록 조회하기
    public List<AdoptDto> getToAdopts(Long userId) {
        List<AdoptEntity> myToAdoptEntity = adoptRepository.findByToUserId(userId);
        List<AdoptDto> myToAdoptDto = new ArrayList<>();

        for (AdoptEntity adoptEntity : myToAdoptEntity) {
            AdoptDto thisAdoptDto = adoptEntity.toDto();
            myToAdoptDto.add(thisAdoptDto);
        }
        return myToAdoptDto;
    }


    // 입양 정보 등록하기(약속 일정 잡기 위해서 저장버튼을 누르면 생성)
    public Integer save(AdoptDto adoptDto) {
        adoptDto.setStatus(AdoptStatus.DEPART); // 상태: 입양 중으로 저장
        AdoptEntity thisAdopt = adoptRepository.save(adoptDto.toEntity(userRepository, boardRepository));
        return thisAdopt.getId();
    }

    // 입양 정보 수정하기(약속 일정 수정 버튼 클릭 시 생성)
    // 프론트에서 어떤 정보를 줄 수 있지..?
    public void updateSchedule(AdoptDto adoptDto) {

        // 입양 정보 찾기
        AdoptEntity adoptEntity = adoptRepository.findById(adoptDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 입양정보가 존재하지 않습니다." + adoptDto.getId()));

        // 입양정보에 미션 반영 수정
        adoptEntity.scheduleUpdate(adoptDto);
    }

    // 입양자 입양 확정 버튼 클릭 시 입양내역 업데이트
    public void updateToConfirm(AdoptDto adoptDto) {
        // 입양자 입양 확정처리
        adoptDto.setToConfirmYn(true);

        // 입양 정보 찾기
        AdoptEntity adoptEntity = adoptRepository.findById(adoptDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 입양정보가 존재하지 않습니다." + adoptDto.getId()));

        // 입양정보 수정
        adoptEntity.toUpdate(adoptDto);
    }

    // 분양자 입양 확정 버큰 클릭 시 미션 생성하여 입양 정보 업데이트(분양자가 확정버튼 누를 때 실행되도록)
    public void addMission(AdoptDto adoptDto) {

        // 분양자 입양확정 처리
        adoptDto.setFromConfirmYn(true);

        // 입양정보 상태 변경
        adoptDto.setStatus(AdoptStatus.ARRIVE);

        // 입양 정보 찾기
        AdoptEntity adoptEntity = adoptRepository.findById(adoptDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 입양정보가 존재하지 않습니다." + adoptDto.getId()));

        // 입양자 -> 미션 작성 필요
        Long missionUserId = adoptDto.getToUserId();

        // 입양자를 uesrId로 미션 데이터 하나 새로이 생성하고 반환
        MissionEntity missionEntity = missionService.save(missionUserId, adoptEntity.getId());

        // 미션 아이디 담기
        adoptDto.setMissionId(missionEntity.getId());

        // 입양정보에 미션 반영 수정
        adoptEntity.fromUpdate(adoptDto, missionEntity);
    }


    //분양자와 입양자 확정 여부 확인
    public boolean confirmCheck(Integer boardId) {
        AdoptEntity adoptEntity = adoptRepository.findByBoardId(boardId);

        boolean fromConfirm = adoptEntity.getFromConfirmYn();
        boolean toConfirm = adoptEntity.getToConfirmYn();

        if (fromConfirm && toConfirm) {
            return true;
        } else {
            return false;
        }
    }
}







