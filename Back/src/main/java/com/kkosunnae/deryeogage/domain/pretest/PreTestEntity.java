package com.kkosunnae.deryeogage.domain.pretest;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name="pretest")
@RequiredArgsConstructor
public class PreTestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name="response_date")
    private LocalDateTime responseDate;

    @Column(length = 300)
    private String promise;

    @Column
    private Byte score;
}
