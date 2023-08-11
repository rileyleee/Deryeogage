package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Transactional
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/simulations")
public class SimulationController {
    private final JwtUtil jwtUtil;

    private final SimulationService simulationService;

    @GetMapping
    public ResponseEntity<Object> simulationStart(@RequestHeader("Authorization") String authorizationHeader){
        String jwtToken = authorizationHeader.substring(7);

        Long userId = jwtUtil.getUserId(jwtToken);

        SimulationDto simulationDto = simulationService.getSimulation(userId);
        if (simulationDto == null) {
            // 새로운 시뮬레이션 시작을 의미하는 메시지와 함께 200 OK 응답
            return new ResponseEntity<>("Start a new simulation", HttpStatus.OK);
        } else {
            if(simulationDto.isEnd()) {
                if(simulationDto.isEndCheck()) {
                    // 시뮬레이션 종료 확인 후 새로운 시뮬레이션 시작을 의미하는 메시지와 함께 200 OK 응답
                    return new ResponseEntity<>("Start a new simulation", HttpStatus.OK);
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
    public SimulationDto simulationCreate(@RequestHeader("Authorization") String authorizationHeader, @RequestBody SimulationDto simulationDto){
        String jwtToken = authorizationHeader.substring(7);

        Long userId = jwtUtil.getUserId(jwtToken);
        simulationDto.setUser(userId);

        SimulationDto createdSimulation = simulationService.saveSimulation(simulationDto);
        return createdSimulation;
    }

    @PutMapping("/save")
    public void simulationSave(@RequestBody SimulationDto simulationDto){
        SimulationDto savedSimulation = simulationService.saveSimulation(simulationDto);
    }

    @GetMapping("/title")
    public String getTitle(@RequestHeader("Authorization") String authorizationHeader){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        return simulationService.getTitle(userId);
    }
}
