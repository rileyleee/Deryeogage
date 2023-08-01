package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "chat_room")
public class ChatRoomEntity extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id1")
    private UserEntity user1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id2")
    private UserEntity user2;


    @Column(name="board_id")
    private Integer boardId;

    private String roomName;

    @Column(name="scheduled_date")
    private LocalDateTime scheduledDate;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private List<ChatMessageEntity> chatMessageList;

    @Builder
    public ChatRoomEntity(Integer boardId, UserEntity user1, UserEntity user2, String roomName) {
        this.boardId = boardId;
        this.user1 = user1;
        this.user2 = user2;
        this.roomName = roomName;
    }

    public Integer update(ChatRoomRequestDto requestDto) {
        this.roomName = requestDto.getRoomName();
        return this.id;
    }
}