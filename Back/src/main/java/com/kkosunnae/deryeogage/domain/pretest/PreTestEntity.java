package com.kkosunnae.deryeogage.domain.pretest;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
public class PreTestEntity {

    @Id @GeneratedValue
    private Integer id;

    @Column(name = "user_id")
    private UserEntity user;

    @Column(name = "response_date")
    private LocalDateTime responseDate;

    @Column(name = "promise")
    private String promise;

    @Column(name = "score")
    private Byte score;
}
