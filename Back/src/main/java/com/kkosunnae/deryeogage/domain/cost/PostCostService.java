package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionService;
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
public class PostCostService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PostCostRepository postCostRepository;
    private final MissionService missionService;


    // 후 책임비 납부하기
    public int save(PostCostDto postCostDto) {
        postCostDto.setCost("100000");
        postCostDto.setPayYn(true);
        postCostDto.setPayDate(LocalDateTime.now());

        PostCostEntity postCost = postCostRepository.save(postCostDto.toEntity(userRepository, boardRepository));
        return postCost.getId();
    }

    // 후 책임비 1개 조회하기
    @Transactional(readOnly = true)
    public PostCostDto getPostCost(Long userId, int boardId) {
        return postCostRepository.findByUserIdAndBoardId(userId, boardId).toDto();
    }

    // 내가 납부한 모든 후책임비 조회하기
    @Transactional(readOnly = true)
    public List<PostCostDto> getPostCosts(Long userId) {
        List<PostCostDto> myPostCosts = new ArrayList<>();

        List<PostCostEntity> postCostsList = postCostRepository.findByUserId(userId);
        for (PostCostEntity postCostEntity : postCostsList) {

            PostCostDto postCost = postCostEntity.toDto();
            myPostCosts.add(postCost);
        }
        return myPostCosts;
    }


    // 후 책임비 반환하기 -> 미션 완료에 따른 반환
    public void normalReturn(Long userId, PostCostDto postCostDto) {

        int boardId = postCostDto.getBoardId();

        //미션 완료 여부 확인한 후
        if (missionService.missionCheck) {
            //반환처리
            postCostDto.setReturnYn(true);
            // 반환 날짜 담고
            postCostDto.setReturnDate(LocalDateTime.now());

            PostCostEntity postCost = getPostCost(userId, boardId).toEntity(userRepository, boardRepository);
            postCost.update(postCostDto);
            postCostRepository.save(postCost); // DB에 반영

        } else {
            throw new IllegalArgumentException("미션을 완료해야 책임비를 반환할 수 있습니다.");
        }
    }


    // 후 책임비 반환하기 -> 입양 일정 취소 및 게시글 삭제에 따른 반환
    public void abnormalReturn(Long userId, PostCostDto postCostDto) {

        // 후책임비 반환처리하고
        postCostDto.setReturnYn(true);
        // 후책임비 반환 날짜 담고
        postCostDto.setReturnDate(LocalDateTime.now());

        int boardId = postCostDto.getBoardId();

        PostCostEntity postCost = getPostCost(userId, boardId).toEntity(userRepository, boardRepository);
        postCost.update(postCostDto);
        postCostRepository.save(postCost);
    }
}