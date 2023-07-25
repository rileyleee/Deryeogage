package com.kkosunnae.deryeogage.domain.simulation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SimulationService {
    private SimulationRepository simulationRepository;

    @Autowired
    public SimulationService(SimulationRepository simulationRepository){
        this.simulationRepository = simulationRepository;
    }

    public SimulationEntity getSimulation(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdAndEndTimeAfterOrderByIdDesc(userId, LocalDateTime.now());
        return simulationRepository.findTopByUserIdAndEndTimeAfterOrderByIdDesc(userId, LocalDateTime.now());
    }

    public SimulationEntity result(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdAndEndCheckFalseOrderByIdDesc(userId);
        return simulationRepository.findTopByUserIdAndEndCheckFalseOrderByIdDesc(userId);
    }
}
