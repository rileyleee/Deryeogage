package com.kkosunnae.deryeogage.domain.adopt;

import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.mission.MissionEntity;
import com.kkosunnae.deryeogage.domain.mission.MissionRepository;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import com.kkosunnae.deryeogage.global.exception.custom.NoSuchUserException;
import lombok.*;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class AdoptDto {
    private Integer id;
    private Integer boardId;
    private Long fromUserId;
    private Long toUserId;
    private AdoptStatus status;
    private Boolean fromConfirmYn;
    private Boolean toConfirmYn;
    private LocalDate scheduledDate;
    private Integer missionId;

    @Builder
    public AdoptDto(Integer id, Integer boardId, Long fromUserId, Long toUserId, AdoptStatus status, Boolean fromConfirmYn, Boolean toConfirmYn, LocalDate scheduledDate, Integer missionId) {
        this.id = id;
        this.boardId = boardId;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.status = status;
        this.fromConfirmYn = fromConfirmYn;
        this.toConfirmYn = toConfirmYn;
        this.scheduledDate = scheduledDate;
        this.missionId = missionId;
    }

    public AdoptEntity toEntity(UserRepository userRepository, BoardRepository boardRepository, MissionRepository missionRepository){

        UserEntity fromUser = userRepository.findById(this.fromUserId)
                .orElseThrow(()-> new NoSuchElementException("해당 사용자가 존재하지 않습니다.");
        BoardEntity board = BoardRepository.findById(this.boardId)
                .orElseThrow(()-> new NoSuchElementException("해당 게시글이 존재하지 않습니다."));
        MissionEntity mission = MissionRepository.findById(this.missionId)
                .orElseThrow(()-> new NoSuchElementException("해당 입양 미션 내역이 존재하지 않습니다."));

        return AdoptEntity.builder()


    }
}
