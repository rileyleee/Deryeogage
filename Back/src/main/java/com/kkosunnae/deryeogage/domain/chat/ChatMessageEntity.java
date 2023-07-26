package com.kkosunnae.deryeogage.domain.chat;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "chat_message")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "chatroom_id")
    private Integer chatroomId;

    @Column(name = "user_id")
    private Long userId;

    @Column
    private String content;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}