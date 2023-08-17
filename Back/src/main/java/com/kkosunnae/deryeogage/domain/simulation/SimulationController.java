package com.kkosunnae.deryeogage.domain.simulation;

import com.kkosunnae.deryeogage.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

@Slf4j
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
                LocalDateTime lastTime = simulationDto.getLastTime();
                LocalDateTime nowTime = LocalDateTime.now();

                // lastTime이 23시 59분 이전이고 nowTime이 06시 00분 이후인지 확인
                if(simulationDto.getHealth()>0){
                    if (lastTime.toLocalTime().isBefore(LocalTime.of(23, 59)) &&
                            nowTime.toLocalTime().isAfter(LocalTime.of(8, 0)) &&
                            nowTime.minusDays(1).isAfter(lastTime)) {
                        simulationDto.setHealth((byte)100);
                        log.info("health : zzzzzzzzzz");
                    } else {
                        // nowTime과 lastTime의 차이를 분 단위로 계산
                        Byte minutesDifference = (byte) ChronoUnit.MINUTES.between(lastTime, nowTime);
                        byte newHealth = (byte)(simulationDto.getHealth()-minutesDifference);
                        if(newHealth<0){
                            newHealth=0;
                        }
                        simulationDto.setHealth(newHealth);
                        // minutesDifference를 다른 로직에 사용하거나 출력하실 수 있습니다.
                        System.out.println("Time difference in minutes: " + minutesDifference);
                    }
                }

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
    public boolean simulationSave(@RequestBody SimulationDto simulationDto){

        // simulationDto의 마지막 시간을 가져옵니다.
        LocalTime lastTime = simulationDto.getLastTime().toLocalTime();

        // 현재 시간을 가져옵니다.
        LocalTime currentTime = LocalTime.now();

        // 23시 59분과 06시 00분을 정의합니다.
        LocalTime maxLastTime = LocalTime.of(23, 59);
        LocalTime minCurrentTime = LocalTime.of(8, 0);

        // 조건을 확인합니다.
        if (!lastTime.isAfter(maxLastTime) && currentTime.isAfter(minCurrentTime)) {
            SimulationDto savedSimulation = simulationService.saveSimulation2(simulationDto);
            return true;
        } else {
            return false;
        }
    }
}
