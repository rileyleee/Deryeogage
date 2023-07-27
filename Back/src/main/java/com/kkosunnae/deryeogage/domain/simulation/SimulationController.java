package com.kkosunnae.deryeogage.domain.simulation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/simulations")
public class SimulationController {
    @Autowired
    private SimulationService simulationService;

    @GetMapping
    public SimulationDto simulationStart(){
        SimulationDto simulationDto=simulationService.getSimulation(1L);
        if(simulationDto==null){
            return null;
        }
        else{
            return simulationDto;
        }
    }

    @PostMapping
    public void simulationCreate(@RequestBody SimulationDto simulationDto){
        simulationService.saveSimulation(simulationDto);
    }
}
