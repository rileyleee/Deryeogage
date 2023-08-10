package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        simulationDto.setLastTime(LocalDateTime.now());
        SimulationEntity simulationEntity=simulationDto.toEntity(userRepository);
        SimulationDto savedSimulationDto = simulationRepository.save(simulationEntity).toDto();
        return savedSimulationDto;
    }

    public SimulationEntity result(Long userId){
        SimulationEntity simulationEntity = simulationRepository.findTopByUserIdAndEndCheckFalseOrderByIdDesc(userId);
        return simulationEntity;
    }

    //밥 초기화
    @Scheduled(cron = "0 0 09,18 * * ?")
    public void requireUpdate1() {
        List<SimulationEntity> simulationEntityList = simulationRepository.findByEndFalse();
        for(SimulationEntity simulationEntity : simulationEntityList){
            String newRequirement = simulationEntity.getRequirement().substring(0,1)+"0"+simulationEntity.getRequirement().substring(2);
            simulationEntity.update(newRequirement);
            simulationRepository.save(simulationEntity);
        }
    }

    //간식 초기화
    @Scheduled(cron = "0 0 13,22 * * ?")
    public void requireUpdate2() {
        List<SimulationEntity> simulationEntityList = simulationRepository.findByEndFalse();
        for(SimulationEntity simulationEntity : simulationEntityList){
            String newRequirement = simulationEntity.getRequirement().substring(0,2) + "0"+simulationEntity.getRequirement().substring(3);
            simulationEntity.update(newRequirement);
            simulationRepository.save(simulationEntity);
        }
    }


    private static final Map<String, Integer> titleRankings = new HashMap<>();
    static {
        titleRankings.put("도살자", 7);
        titleRankings.put("생초보 양육자", 6);
        titleRankings.put("새싹 양육자", 5);
        titleRankings.put("중급 양육자", 4);
        titleRankings.put("프로 양육러", 3);
        titleRankings.put("강아지 그 자체🐶", 2);
        titleRankings.put("미래의 강형욱✨", 1);
    }

    public String getTitle(Long userId){
        List<String> titleList = simulationRepository.findDistinctTitlesByUserId(userId);
        return titleList.stream()
                .min((title1, title2) -> titleRankings.get(title1) - titleRankings.get(title2))
                .orElse(null);  // returns null if there's no title, adjust as needed
    }
}
