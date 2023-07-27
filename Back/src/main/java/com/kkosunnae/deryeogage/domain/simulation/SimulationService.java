package com.kkosunnae.deryeogage.domain.simulation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SimulationService {
    private final SimulationRepository simulationRepository;
    private final SimulationMapper simulationMapper;

    @Autowired
    public SimulationService(SimulationRepository simulationRepository, SimulationMapper simulationMapper){
        this.simulationRepository = simulationRepository;
        this.simulationMapper=simulationMapper;
    }

    public SimulationDto getSimulation(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdOrderByIdDesc(userId);
        return simulationMapper.toDto(simulationEntity);
    }

    public boolean isSimulationEnded(SimulationEntity simulationEntity){
        if(simulationEntity.getEnd()){
            return true;
        }
        else{
            return false;
        }
    }

    public boolean isResultChecked(SimulationEntity simulationEntity){
        if(simulationEntity.getEndCheck()){
            return true;
        }
        else{
            return false;
        }
    }

    public void saveSimulation(SimulationDto simulationDto){
        SimulationEntity simulationEntity=simulationMapper.toEntity(simulationDto);
        simulationRepository.save(simulationEntity);
    }



    public SimulationEntity result(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdAndEndCheckFalseOrderByIdDesc(userId);
        return simulationEntity;
    }
}
