package com.kkosunnae.deryeogage.domain.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChatRoomRequestDto {
    private String roomName;

    private Integer boardId;

    private Long userId1;

    private Long userId2;

    private LocalDateTime scheduledDate;

    @Builder
    public ChatRoomRequestDto(String roomName) {
        this.roomName = roomName;
    }

    public ChatRoomEntity toEntity() {
        return ChatRoomEntity.builder()
                .boardId(this.boardId)
                .userId1(this.userId1)
                .userId2(this.userId2)
                .roomName(this.roomName)
                .build();
    }
}