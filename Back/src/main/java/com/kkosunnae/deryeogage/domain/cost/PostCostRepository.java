package com.kkosunnae.deryeogage.domain.cost;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostCostRepository extends JpaRepository<PostCostEntity, Integer> {
    PostCostEntity findByBoardId(int boardId);

    public List<PostCostEntity> findByUserId(Long userId);

    PostCostEntity findByUserIdAndBoardId(Long userId, int boardId);
}
