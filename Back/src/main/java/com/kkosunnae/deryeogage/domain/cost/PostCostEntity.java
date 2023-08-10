package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "post_cost")
@NoArgsConstructor
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
    @Builder
    public PostCostEntity(Integer id, UserEntity user, BoardEntity board, String cost, Boolean payYn, LocalDateTime payDate, Boolean returnYn, LocalDateTime returnDate) {
        this.id = id;
        this.user = user;
        this.board = board;
        this.cost = cost;
        this.payYn = payYn;
        this.payDate = payDate;
        this.returnYn = returnYn;
        this.returnDate = returnDate;
    }

    public PostCostDto toDto(){
        return PostCostDto.builder()
                .id(this.id)
                .userId(this.user.getId())
                .boardId(this.board.getId())
                .cost(this.cost)
                .payYn(this.payYn)
                .payDate(this.payDate)
                .returnYn(this.returnYn)
                .returnDate(this.returnDate)
                .build();
    }

    public void update(PostCostDto postCostDto) {
        this.returnYn = postCostDto.getReturnYn();
        this.returnDate = postCostDto.getReturnDate();
    }
}
