package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private UserEntity user;

    private String nickName;

    private String message;

    @ManyToOne
    private ChatRoomEntity chatRoom;

    @Column(name = "read_yn")
    private boolean readYN;

    @Builder
    public ChatMessageEntity(UserEntity user, String nickName, String message, ChatRoomEntity chatRoom, boolean readYN) {
        this.user = user;
        this.nickName = nickName;
        this.message = message;
        this.chatRoom = chatRoom;
        this.readYN = readYN;
    }
}