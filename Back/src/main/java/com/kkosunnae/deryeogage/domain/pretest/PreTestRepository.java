package com.kkosunnae.deryeogage.domain.pretest;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PreTestRepository extends JpaRepository<PreTestEntity, Integer> {
    Optional<PreTestEntity> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}
