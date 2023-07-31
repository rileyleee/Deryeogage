package com.kkosunnae.deryeogage.domain.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    public Optional<BoardEntity> findByUserId(Long userId);
}