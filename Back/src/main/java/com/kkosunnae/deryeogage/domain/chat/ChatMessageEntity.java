package com.kkosunnae.deryeogage.domain.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "chat_message")
public class ChatMessageEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="user_id")
    private Long userId;
    private String message;

    @ManyToOne
    private ChatRoomEntity chatRoom;

    @Builder
    public ChatMessageEntity(Long userId, String message, ChatRoomEntity chatRoom) {
        this.userId = userId;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}