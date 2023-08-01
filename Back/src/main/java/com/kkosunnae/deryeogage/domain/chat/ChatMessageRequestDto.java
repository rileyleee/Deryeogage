package com.kkosunnae.deryeogage.domain.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequestDto {
    private Long userId;
    private String message;
    private ChatRoomEntity chatRoom;

    @Builder
    public ChatMessageRequestDto(Long userId, String message, ChatRoomEntity chatRoom) {
        this.userId = userId;
        this.message = message;
        this.chatRoom = chatRoom;
    }

    public ChatMessageEntity toEntity() {
        return ChatMessageEntity.builder()
                .userId(this.userId)
                .message(this.message)
                .chatRoom(this.chatRoom)
                .build();
    }
}