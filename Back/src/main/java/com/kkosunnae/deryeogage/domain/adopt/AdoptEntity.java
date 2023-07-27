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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private UserEntity fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private UserEntity toUser;

    @Column(columnDefinition = "enum('depart', 'arrive')")
    @Enumerated(EnumType.STRING)
    private AdoptStatus status;

    @Column(name = "from_confirm_yn")
    private Boolean fromConfirmYn;

    @Column(name = "to_confirm_yn")
    private Boolean toConfirmYn;

    @Column(name = "scheduled_date")
    private LocalDate scheduledDate;

    @OneToOne(mappedBy = "adopt")
    private MissionEntity mission;

}