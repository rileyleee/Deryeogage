package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PreCostRepository extends JpaRepository<PreCostEntity,Integer> {
    Optional<List<PreCostEntity>> findByUserId(Long userId);

    Optional<PreCostEntity> findByUserIdAndBoardId(Long userId, int boardId);
}
