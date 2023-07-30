package com.kkosunnae.deryeogage.domain.chat;

import org.springframework.stereotype.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    public void saveMessage(ChatMessageEntity message) {
        chatMessageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public List<ChatMessageEntity> findMessages(ChatRoomEntity chatRoom) {
        return chatMessageRepository.findByChatRoom(chatRoom);
    }
}