package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import com.kkosunnae.deryeogage.domain.mission.MissionEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
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

    @Builder
    public AdoptEntity(BoardEntity board, UserEntity fromUser, UserEntity toUser, AdoptStatus status, Boolean fromConfirmYn, Boolean toConfirmYn, LocalDate scheduledDate, MissionEntity mission) {
        this.board = board;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.status = status;
        this.fromConfirmYn = fromConfirmYn;
        this.toConfirmYn = toConfirmYn;
        this.scheduledDate = scheduledDate;
        this.mission = mission;
    }

    public AdoptDto toDto() {
        return AdoptDto.builder()
                .id(this.id)
                .boardId(this.board.getId())
                .fromUserId(this.fromUser.getId())
                .toUserId(this.toUser.getId())
                .status(this.status)
                .fromConfirmYn(this.fromConfirmYn)
                .toConfirmYn(this.toConfirmYn)
                .scheduledDate(this.scheduledDate)
                .missionId(this.mission.getId())
                .build();
    }

    public void toUpdate(AdoptDto adoptDto) { // 입양자가 확정버튼 누를 때 실행
        this.toConfirmYn = adoptDto.getToConfirmYn();

    }

    // 입양자가 확정버튼 눌러야만 분양자에 확정버튼 활성화
    public void fromUpdate(AdoptDto adoptDto, MissionEntity missionEntity) { // 분양자가 확정버튼 누를 때 실행
        this.status = adoptDto.getStatus(); // 확정으로 변경
        this.fromConfirmYn = adoptDto.getFromConfirmYn();
        this.mission = missionEntity;
    }

    public void scheduleUpdate(AdoptDto adoptDto) { // 일정 변경 시 실행
        this.scheduledDate = adoptDto.getScheduledDate();
    }


}