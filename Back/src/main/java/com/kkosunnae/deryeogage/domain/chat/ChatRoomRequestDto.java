package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Getter
@NoArgsConstructor
public class ChatRoomRequestDto {
    private String roomName;

    private Integer boardId;

    private Long user1;

    private Long user2;

    private LocalDateTime scheduledDate;

    @Builder
    public ChatRoomRequestDto(String roomName) {
        this.roomName = roomName;
    }


    public ChatRoomEntity toEntity(UserRepository userRepository) {
        if (this.user1 == null || this.user2 == null) {
            throw new IllegalArgumentException("user1과 user2는 null일 수 없습니다.");
        }

        UserEntity user1 = userRepository.findById(this.user1)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        UserEntity user2 = userRepository.findById(this.user2)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        return ChatRoomEntity.builder()
                .boardId(this.boardId)
                .user1(user1)
                .user2(user2)
                .roomName(this.roomName)
                .build();
    }

}