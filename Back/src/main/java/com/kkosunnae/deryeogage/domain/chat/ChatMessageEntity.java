package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;
import org.hibernate.annotations.common.util.StringHelper;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "chat_message")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id")
    private ChatRoomEntity chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}