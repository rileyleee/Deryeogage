package com.kkosunnae.deryeogage.domain.simulation;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTime {
    @CreatedDate
    @Column(name = "start_time",updatable = false)
    private LocalDateTime startTime;

    @CreatedDate
    @Column(name = "end_time",updatable = false)
    private LocalDateTime endTime;

    @LastModifiedDate
    @Column(name = "last_time",updatable = true)
    private LocalDateTime lastTime;
}