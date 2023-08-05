package com.kkosunnae.deryeogage.domain.adopt;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AdoptRepository extends JpaRepository<AdoptEntity, Integer> {

    // 분양내역 가져오기
    Optional<List<AdoptEntity>> findByFromUserId(Long userId);

    // 입양내역 가져오기
    Optional<List<AdoptEntity>> findByToUserId(Long userId);

    // 1건의 입양정보 가져오기
    Optional<AdoptEntity> findByBoardId(Integer boardId);

}