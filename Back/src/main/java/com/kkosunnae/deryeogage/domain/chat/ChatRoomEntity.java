package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.board.BoardEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "chat_room")
public class ChatRoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id1")
    private UserEntity provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id2")
    private UserEntity adopter;

    @Column(name = "scheduled_date")
    private LocalDate scheduledDate;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessageEntity> chatMessages = new ArrayList<>();
}