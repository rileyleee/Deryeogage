package com.kkosunnae.deryeogage.domain.common;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DetailCodeRepository extends JpaRepository<DetailCodeEntity, String> {
//    public Optional<DetailCodeEntity> findByValue(String value);
}
