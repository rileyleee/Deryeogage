package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.survey.SurveyEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PreCostService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PreCostRepository preCostRepository;


    // 선 책임비 납부하기
    public int save(PreCostDto preCostDto) {

        preCostDto.setCost("100000");
        preCostDto.setPayYn(true);
        preCostDto.setPayDate(LocalDateTime.now());

        PreCostEntity preCost = preCostRepository.save(preCostDto.toEntity(userRepository, boardRepository));
        return preCost.getId();
    }

    // 내가 납부한 선 책임비 조회하기(2개 이상인 경우)
    @Transactional(readOnly = true)
    public List<PreCostDto> getPreCosts(Long userId) {
        List<PreCostDto> myPreCosts = new ArrayList<>();

        List<PreCostEntity> preCostsList = preCostRepository.findByUserId(userId);
        for (PreCostEntity preCostEntity : preCostsList) {

            PreCostDto preCost = preCostEntity.toDto();
            myPreCosts.add(preCost);
        }
        return myPreCosts;
    }

    // 선 책임비 수정하기
    public int update(Long userId, PreCostDto preCostDto) {
        int boardId = preCostDto.getBoardId();
        PreCostEntity preCost = getPreCost(userId, boardId).toEntity(userRepository, boardRepository);
        preCost.update(preCostDto);
        preCostRepository.save(preCost);
        return preCost.getId();
    }

    // 선책임비 1개 조회하기
    @Transactional(readOnly = true)
    public PreCostDto getPreCost(Long userId, int boardId) {
        PreCostDto thisPreCost = preCostRepository.findByUserIdAndBoardId(userId, boardId).toDto();
        return thisPreCost;
    }

    // 선 책임비 삭제하기 -> 입양 완료로 인한 반환이 아님
}
