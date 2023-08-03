package com.kkosunnae.deryeogage.domain.chat;

import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class ChatRoomResponseDto {
    private Integer id;
    private String roomName;
    private String createdDate;
    private String updatedDate;

    public ChatRoomResponseDto(ChatRoomEntity entity) {
        this.id = entity.getId();
        this.roomName = entity.getRoomName();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}