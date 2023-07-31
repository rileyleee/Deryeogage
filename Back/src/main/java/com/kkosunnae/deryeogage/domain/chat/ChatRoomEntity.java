package com.kkosunnae.deryeogage.domain.chat;

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

    @Column(name="board_id")
    private Integer boardId;

    @Column(name="user_id1")
    private Long userId1;

    @Column(name="user_id2")
    private Long userId2;

    private String roomName;

    @Column(name="scheduled_date")
    private LocalDateTime scheduledDate;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private List<ChatMessageEntity> chatMessageList;

    @Builder
    public ChatRoomEntity(Integer boardId, Long userId1, Long userId2, String roomName) {
        this.boardId = boardId;
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.roomName = roomName;
    }

    public Integer update(ChatRoomRequestDto requestDto) {
        this.roomName = requestDto.getRoomName();
        return this.id;
    }
}