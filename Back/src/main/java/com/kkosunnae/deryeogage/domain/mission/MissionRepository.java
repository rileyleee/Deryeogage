package com.kkosunnae.deryeogage.domain.mission;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MissionRepository extends JpaRepository<MissionEntity, Integer> {

    Optional<MissionEntity> findById(Integer missionId);

    Optional<MissionEntity> findByAdoptId(Integer AdoptId);
}
