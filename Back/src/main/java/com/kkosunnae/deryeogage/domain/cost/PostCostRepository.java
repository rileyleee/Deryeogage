package com.kkosunnae.deryeogage.domain.cost;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostCostRepository extends JpaRepository<PostCostEntity, Integer> {
    Optional<PostCostEntity> findByBoardId(int boardId);

    Optional<List<PostCostEntity>>findByUserId(Long userId);

    Optional<PostCostEntity> findByUserIdAndBoardId(Long userId, int boardId);
}
