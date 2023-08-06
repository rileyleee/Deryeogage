package com.kkosunnae.deryeogage.domain.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JjimRepository extends JpaRepository<JjimEntity, Integer> {
    void deleteByUserIdAndBoardId(Long userId, Integer boardId);

    boolean existsByUserIdAndBoardId(Long userId, Integer boardId);

    Optional<List<JjimEntity>> findByUserId(Long userId);
}
