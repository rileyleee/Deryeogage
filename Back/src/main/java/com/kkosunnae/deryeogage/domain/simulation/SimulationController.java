package com.kkosunnae.deryeogage.domain.simulation;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/simulations")
public class SimulationController {
    private final SimulationService simulationService;

    @GetMapping("/{userId}")
    public ResponseEntity<Object> simulationStart(@PathVariable Long userId){
        SimulationDto simulationDto = simulationService.getSimulation(userId);
        if (simulationDto == null) {
            // 새로운 시뮬레이션 시작을 의미하는 메시지와 함께 200 OK 응답
            return new ResponseEntity<>("Start a new simulation", HttpStatus.OK);
        } else {
            if(simulationDto.isEnd()) {
                if(simulationDto.isEndCheck()) {
                    // 시뮬레이션 종료 확인 후 새로운 시뮬레이션 시작을 의미하는 메시지와 함께 200 OK 응답
                    return new ResponseEntity<>("End confirmed, start a new simulation", HttpStatus.OK);
                } else {
                    // 시뮬레이션이 종료되었으나 확인되지 않았음을 의미하는 시뮬레이션 객체와 함께 200 OK 응답
                    return new ResponseEntity<>(simulationDto, HttpStatus.OK);
                }
            } else {
                // 진행 중인 시뮬레이션 객체와 함께 200 OK 응답
                return new ResponseEntity<>(simulationDto, HttpStatus.OK);
            }
        }
    }

    @PostMapping("/create")
    public SimulationDto simulationCreate(@RequestBody SimulationDto simulationDto){
        SimulationDto createdSimulation = simulationService.saveSimulation(simulationDto);
        return createdSimulation;
    }

    @PutMapping("/save")
    public SimulationDto simulationSave(@RequestBody SimulationDto simulationDto){
        SimulationDto savedSimulation = simulationService.saveSimulation(simulationDto);
        return savedSimulation;
    }
}
