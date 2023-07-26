package com.kkosunnae.deryeogage.domain.cost;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "pre_cost")
public class PreCostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="board_id")
    private Integer boardId;

    @Column(length = 6)
    private String cost;

    @Column(name="pay_yn")
    private Boolean payYN;

    @Column(name="pay_date")
    private LocalDateTime payDate;

    @Column(name="return_yn")
    private Boolean returnYN;

    @Column(name="return_date")
    private LocalDateTime returnDate;
}

