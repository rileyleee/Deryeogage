package com.kkosunnae.deryeogage.domain.simulation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SimulationMapper {
    @Mapping(source = "user.id", target = "userId")
    SimulationDto toDto(SimulationEntity simulationEntity);
    SimulationEntity toEntity(SimulationDto simulationDto);
}
