package com.kkosunnae.deryeogage.domain.adopt;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Table(name = "adopt")
public class AdoptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "board_id")
    private Integer boardId;

    @Column(name = "from_user_id")
    private Long fromUserId;

    @Column(name = "to_user_id")
    private Long toUserId;

    @Column(columnDefinition = "enum('depart', 'arrive')")
    @Enumerated(EnumType.STRING)
    private AdoptStatus status;

    @Column(name = "from_confirm_yn")
    private Boolean fromConfirmYn;

    @Column(name = "to_confirm_yn")
    private Boolean toConfirmYn;

    @Column(name = "scheduled_date")
    private LocalDate scheduledDate;

}
