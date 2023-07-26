package com.kkosunnae.deryeogage.domain.simulation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/simulations")
public class SimulationController {
    @Autowired
    private SimulationService simulationService;

    @GetMapping
    public SimulationEntity simulationStart(){
        SimulationEntity simulation=simulationService.getSimulation(1L);
        if(simulation==null){
            return null;
        }
        else{
            return simulation;
        }
    }
}
