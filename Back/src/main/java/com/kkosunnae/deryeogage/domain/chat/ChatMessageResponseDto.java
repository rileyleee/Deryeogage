package com.kkosunnae.deryeogage.domain.chat;

import lombok.Getter;
import lombok.Setter;

import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class ChatMessageResponseDto {
    private Integer id;
    private Long userId;
    private String nickName;
    private String message;
    private String createdDate;
    private String updatedDate;


    private boolean readYN;

    public ChatMessageResponseDto(ChatMessageEntity entity) {
        this.id = entity.getId();
        this.nickName = entity.getNickName();
        this.userId = entity.getUser().getId();
        this.message = entity.getMessage();
        if (entity.getCreatedDate() != null) {
            this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        }
        if (entity.getUpdatedDate() != null) {
            this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        }
        this.readYN = entity.isReadYN();
    }
}