package com.kkosunnae.deryeogage.domain.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chats")
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")    // client에서 "/app/chat" 으로 요청
    @SendTo("/topic/chat")      // "/topic/chat" 구독 중인 client에게 전송
    public void processMessage(ChatMessageEntity message) {
        chatService.saveMessage(message);
        simpMessagingTemplate.convertAndSend("/topic/chat", message);
    }

}
