package com.kkosunnae.deryeogage.domain.chat;

import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class ChatMessageResponseDto {
    private Integer id;
    private Long userId;
    private String message;
    private String createdDate;
    private String updatedDate;

    public ChatMessageResponseDto(ChatMessageEntity entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.message = entity.getMessage();
        if (entity.getCreatedDate() != null) {
            this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        }
        if (entity.getUpdatedDate() != null) {
            this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        }

    }
}