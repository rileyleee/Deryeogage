package com.kkosunnae.deryeogage.domain.simulation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SimulationRepository extends JpaRepository<SimulationEntity,Integer> {
    @Override
    SimulationEntity save(SimulationEntity simulationEntity);

    SimulationEntity findTopByUserIdOrderByIdDesc(Long userId);

    SimulationEntity findTopByUserIdAndEndCheckFalseOrderByIdDesc(Long userId);
}
