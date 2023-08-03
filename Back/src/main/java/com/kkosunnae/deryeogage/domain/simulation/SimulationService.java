package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
