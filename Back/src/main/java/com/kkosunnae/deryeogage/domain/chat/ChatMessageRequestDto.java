package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.NoSuchElementException;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequestDto {
    private Long user;
    private String nickName;
    private String message;
    private ChatRoomEntity chatRoom;

    @Builder
    public ChatMessageRequestDto(Long user, String nickName, String message, ChatRoomEntity chatRoom) {
        this.user = user;
        this.nickName = nickName;
        this.message = message;
        this.chatRoom = chatRoom;
    }

    public ChatMessageEntity toEntity(UserRepository userRepository) {
        UserEntity user = userRepository.findById(this.user)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        return ChatMessageEntity.builder()
                .user(user)
                .nickName(this.nickName)
                .message(this.message)
                .chatRoom(this.chatRoom)
                .readYN(false)
                .build();
    }
}