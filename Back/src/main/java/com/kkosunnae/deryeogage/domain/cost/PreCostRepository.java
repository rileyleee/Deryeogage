package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreCostRepository extends JpaRepository<PreCostEntity,Integer> {
    public List<PreCostEntity> findByUserId(Long userId);

    PreCostEntity findByUserIdAndBoardId(Long userId, int boardId);
}
