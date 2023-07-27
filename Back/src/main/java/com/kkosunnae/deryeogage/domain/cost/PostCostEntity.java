package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

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
