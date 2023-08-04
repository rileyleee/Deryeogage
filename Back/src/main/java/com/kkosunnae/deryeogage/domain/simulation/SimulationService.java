package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class SimulationService {
    private final SimulationRepository simulationRepository;
    private final UserRepository userRepository;

    public SimulationDto getSimulation(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdOrderByIdDesc(userId);
        if(simulationEntity==null){
            return null;
        }
        else{
            return simulationEntity.toDto();
        }
    }

    public SimulationDto saveSimulation(SimulationDto simulationDto){
        SimulationEntity simulationEntity=simulationDto.toEntity(userRepository);
        SimulationDto savedSimulationDto = simulationRepository.save(simulationEntity).toDto();
        return savedSimulationDto;
    }

    public SimulationEntity result(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdAndEndCheckFalseOrderByIdDesc(userId);
        return simulationEntity;
    }

    @Scheduled(cron = "0 0 09,18 * * ?")
    public void requireUpdate1() {
        List<SimulationEntity> simulationEntityList = simulationRepository.findByEndFalse();
        for(SimulationEntity simulationEntity : simulationEntityList){
            String newRequirement = "0"+simulationEntity.getRequirement().substring(1);
            simulationEntity.update(newRequirement);
            simulationRepository.save(simulationEntity);
        }
    }

    @Scheduled(cron = "0 0 13,22 * * ?")
    public void requireUpdate2() {
        List<SimulationEntity> simulationEntityList = simulationRepository.findByEndFalse();
        for(SimulationEntity simulationEntity : simulationEntityList){
            String newRequirement = simulationEntity.getRequirement().substring(0,1) + "0"+simulationEntity.getRequirement().substring(2);
            simulationEntity.update(newRequirement);
            simulationRepository.save(simulationEntity);
        }
    }
}
