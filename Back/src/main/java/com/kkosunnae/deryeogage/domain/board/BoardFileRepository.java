package com.kkosunnae.deryeogage.domain.board;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BoardFileRepository extends JpaRepository<BoardFileEntity, Integer> {
    // 게시글 조회 시 해당 게시글에 등록된 파일 엔티티 모두 반환
    public Optional<List<BoardFileEntity>> findByBoardId(Integer boardId);

}
