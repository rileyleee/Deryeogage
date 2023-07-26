package com.kkosunnae.deryeogage.domain.cost;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "post_cost")
public class PostCostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "board_id")
    private Integer boardId;

    @Column(length = 6)
    private String cost;

    @Column(name = "pay_yn")
    private Boolean payYn;

    @Column(name = "pay_date")
    private LocalDateTime payDate;

    @Column(name = "return_yn")
    private Boolean returnYn;

    @Column(name = "return_date")
    private LocalDateTime returnDate;
}
