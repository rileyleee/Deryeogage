package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.adopt.AdoptService;
import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.board.BoardService;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PreCostService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PreCostRepository preCostRepository;
    private final PostCostRepository postCostRepository;
    private final AdoptService adoptService;
    private final BoardService boardService;
    private final PostCostService postCostService;


    // 선 책임비 납부하기(납부버튼 클릭 시) -> 첫 생성 시기
    public int save(PreCostDto preCostDto) {

        preCostDto.setCost("100000");
        preCostDto.setPayYn(true);
        preCostDto.setPayDate(LocalDateTime.now());

        PreCostEntity preCost = preCostRepository.save(preCostDto.toEntity(userRepository, boardRepository));
        return preCost.getId();
    }


    // 선책임비 1개 조회하기
    @Transactional(readOnly = true)
    public PreCostDto getPreCost(Long userId, int boardId) {
        PreCostEntity preCostEntity = preCostRepository.findByUserIdAndBoardId(userId, boardId)
                .orElseThrow(() -> new NoSuchElementException("해당 분양자의 책임비 납부내역이 없습니다. userId: " + userId));
        return preCostEntity.toDto();
    }

    // 내가 납부한 선 책임비 조회하기(2개 이상인 경우)
    @Transactional(readOnly = true)
    public List<PreCostDto> getPreCosts(Long userId) {
        List<PreCostDto> myPreCosts = new ArrayList<>();

        List<PreCostEntity> preCostsList = preCostRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 분양자의 책임비 납부내역이 없습니다. userId: " + userId));

        for (PreCostEntity preCostEntity : preCostsList) {
            PreCostDto preCost = preCostEntity.toDto();
            myPreCosts.add(preCost);
        }

        return myPreCosts;
    }

    // 선 책임비 반환하기(반환요청 버튼 클릭 시 입양자 및 분양자 확정 처리 확인 후 반환)
    public void normalReturn(Long userId, PreCostDto preCostDto) {

        int boardId = preCostDto.getBoardId();
        // 입양자와 분양자 모두 확정처리 여부 확인하고
        if (adoptService.confirmCheck(boardId)) {

            // 반환처리하고
            preCostDto.setReturnYn(true);
            // 반환 날짜 담고
            preCostDto.setReturnDate(LocalDateTime.now());

            PreCostEntity preCost = getPreCost(userId, boardId).toEntity(userRepository, boardRepository);
            preCost.update(preCostDto);
            preCostRepository.save(preCost); // DB에 반영
        } else {
            throw new IllegalArgumentException("입양자와 분양자 모두가 확정처리해야 책임비를 반환할 수 있습니다.");
        }
    }


    // 선 책임비 반환하기(게시글 삭제에 따른 반환 -> 후책임비도 반환 필요)
    public void abnormalReturn(Long userId, PreCostDto preCostDto) {

        int boardId = preCostDto.getBoardId();

        PreCostEntity entity = preCostRepository.findByUserIdAndBoardId(userId, boardId)
                .orElseThrow(()-> new NoSuchElementException("해당 게시물의 선책임비가 없습니다."));

        Integer id = entity.getId();

        Optional<PostCostEntity> postCostOptional = postCostRepository.findByBoardId(boardId);

        if (postCostOptional.isPresent()) {
            PostCostEntity postCostEntity = postCostOptional.get();
            PostCostDto postCostDto = postCostEntity.toDto();
            postCostService.abnormalReturn(postCostDto);
        }

        // 책임비 row 삭제하기
        preCostRepository.deleteById(id);

        //분양게시글 삭제
        boardService.deleteById(boardId);
    }
}
