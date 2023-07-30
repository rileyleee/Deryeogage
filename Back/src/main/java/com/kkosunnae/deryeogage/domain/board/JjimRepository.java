package com.kkosunnae.deryeogage.domain.board;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JjimRepository extends JpaRepository<JjimEntity, Integer> {
    void deleteByUserIdAndBoardId(Long userId, Integer boardId);

    boolean existsByUserIdAndBoardId(Long userId, Integer boardId);
}
