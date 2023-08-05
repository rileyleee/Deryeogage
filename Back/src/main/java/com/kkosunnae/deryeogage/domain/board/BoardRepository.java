package com.kkosunnae.deryeogage.domain.board;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    Optional<BoardEntity> findById(Integer boardId);
    Optional<List<BoardEntity>> findByUserId(Long userId);
}
