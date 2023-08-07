package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionEntity;
import com.kkosunnae.deryeogage.domain.mission.MissionService;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdoptService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final AdoptRepository adoptRepository;
    private final MissionService missionService;

    @Transactional(readOnly = true)
    //내 분양정보 목록 조회하기
    public List<AdoptDto> getFromAdopts(Long userId) {
        List<AdoptEntity> myFromAdoptEntity = adoptRepository.findByFromUserId(userId)
                .orElseThrow(()-> new NoSuchElementException("분양자로서 등록된 입양내역이 없습니다. userId: "+ userId));

        List<AdoptDto> myFromAdoptDto = new ArrayList<>();

        for (AdoptEntity adoptEntity : myFromAdoptEntity) {

            if(adoptEntity.getMission() != null) { //미션이 생성된 때일 때
                AdoptDto thisAdoptDto = adoptEntity.toDto();
                myFromAdoptDto.add(thisAdoptDto);
            } else { //미션이 생성되지 않았을 때
                AdoptDto thisAdoptDto = adoptEntity.toDtoExceptMission();
                myFromAdoptDto.add(thisAdoptDto);
            }
        }
        return myFromAdoptDto;
    }

    @Transactional(readOnly = true)
    //내 입양정보 목록 조회하기
    public List<AdoptDto> getToAdopts(Long userId) {
        List<AdoptEntity> myToAdoptEntity = adoptRepository.findByToUserId(userId)
                .orElseThrow(()-> new NoSuchElementException("입양자로서 등록된 입양내역이 없습니다. userId: "+ userId));

        List<AdoptDto> myToAdoptDto = new ArrayList<>();

        for (AdoptEntity adoptEntity : myToAdoptEntity) {

            if(adoptEntity.getMission() != null) { //미션이 생성된 때일 때
                AdoptDto thisAdoptDto = adoptEntity.toDto();
                myToAdoptDto.add(thisAdoptDto);
            } else { //미션이 생성되지 않았을 때
                AdoptDto thisAdoptDto = adoptEntity.toDtoExceptMission();
                myToAdoptDto.add(thisAdoptDto);
            }
        }
        return myToAdoptDto;
    }


    // 입양 정보 등록하기(약속 일정 잡기 위해서 저장버튼을 누르면 생성)
    public Integer save(AdoptDto adoptDto) {
        adoptDto.setStatus(AdoptStatus.depart); // 상태: 입양 중으로 저장
        AdoptEntity thisAdopt = adoptRepository.save(adoptDto.toEntity(userRepository, boardRepository));
        return thisAdopt.getId();
    }

    public Integer update(Integer boardId, LocalDate scheduledDate) {
        // 입양 정보 찾기
        AdoptEntity adoptEntity = adoptRepository.findByBoardIdAndStatus(boardId, AdoptStatus.depart)
                .orElseThrow(() -> new IllegalArgumentException("게시글 입양정보 중 진행 중인 내역이 존재하지 않습니다." + boardId));

        adoptEntity.scheduleUpdate(scheduledDate);
        return adoptEntity.getId();
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



    // 분양자 입양 확정 버튼 클릭 시 미션 생성하여 입양 정보 업데이트(분양자가 확정버튼 누를 때 실행되도록)
    public void addMission(AdoptDto adoptDto) {

        // 분양자 입양확정 처리
        adoptDto.setFromConfirmYn(true);

        // 입양정보 상태 변경
        adoptDto.setStatus(AdoptStatus.arrive);

        // 입양 정보 찾기
        AdoptEntity adoptEntity = adoptRepository.findById(adoptDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 입양정보가 존재하지 않습니다." + adoptDto.getId()));


        log.info("adoptDto.getToUserId()"+adoptDto.getToUserId());
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
    @Transactional(readOnly = true)
    public boolean confirmCheck(Integer boardId) {
        AdoptEntity adoptEntity = adoptRepository.findByBoardId(boardId)
                .orElseThrow(()-> new NoSuchElementException("해당 게시물의 입양내역이 없습니다. boardId: "+boardId));

        boolean fromConfirm = adoptEntity.getFromConfirmYn();
        boolean toConfirm = adoptEntity.getToConfirmYn();

        if (fromConfirm && toConfirm) {
            return true;
        } else {
            return false;
        }
    }
}