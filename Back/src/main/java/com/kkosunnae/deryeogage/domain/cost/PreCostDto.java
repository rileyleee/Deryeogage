package com.kkosunnae.deryeogage.domain.cost;

import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;

import lombok.*;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class PreCostDto {
        private Integer id;
        private long userId;
        private int boardId;
        private String cost;
        private Boolean payYn;
        private LocalDateTime payDate;
        private Boolean returnYn;
        private LocalDateTime returnDate;

        public boolean isPayYn(){
                return payYn;
        }

        public boolean isReturnYn(){
                return returnYn;
        }

        @Builder
        public PreCostDto(Integer id, long userId, int boardId, String cost, Boolean payYn, LocalDateTime payDate, Boolean returnYn, LocalDateTime returnDate) {
                this.id = id;
                this.userId = userId;
                this.boardId = boardId;
                this.cost = cost;
                this.payYn = payYn;
                this.payDate = payDate;
                this.returnYn = returnYn;
                this.returnDate = returnDate;
        }

        public PreCostEntity toEntity(UserRepository userRepository, BoardRepository boardRepository){
                UserEntity user = userRepository.findById(this.userId)
                        .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

                BoardEntity board = boardRepository.findById(this.boardId)
                        .orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다."));

                return PreCostEntity.builder()
                        .user(user)
                        .board(board)
                        .cost(this.cost)
                        .payYn(this.payYn)
                        .payDate(this.payDate)
                        .returnYn(this.returnYn)
                        .returnDate(this.returnDate)
                        .build();
        }
}
