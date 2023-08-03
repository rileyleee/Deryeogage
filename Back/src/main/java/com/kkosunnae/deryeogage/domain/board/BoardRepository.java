package com.kkosunnae.deryeogage.domain.board;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    List<BoardEntity> findByUserId(Long userId);
}
