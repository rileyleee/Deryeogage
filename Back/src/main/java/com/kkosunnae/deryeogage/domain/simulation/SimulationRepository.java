package com.kkosunnae.deryeogage.domain.simulation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SimulationRepository extends JpaRepository<SimulationEntity,Integer> {
    @Override
    SimulationEntity save(SimulationEntity simulationEntity);

    SimulationEntity findTopByUserIdOrderByIdDesc(Long userId);

    SimulationEntity findTopByUserIdAndEndCheckFalseOrderByIdDesc(Long userId);

    List<SimulationEntity> findByEndFalse();

    @Query("SELECT DISTINCT s.title FROM SimulationEntity s WHERE s.user.id = :userId")
    List<String> findDistinctTitlesByUserId(@Param("userId") Long userId);

}
