package com.kkosunnae.deryeogage.domain.chat;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ChatRoomDto {
    private Integer id;
    private Long user1;
    private Long user2;
    private Integer boardId;
    private LocalDate scheduledDate;

    @Builder
    public ChatRoomDto(Integer id, Long user1, Long user2, Integer boardId, LocalDate scheduledDate) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.boardId = boardId;
        this.scheduledDate = scheduledDate;
    }
}
