package com.kkosunnae.deryeogage.domain.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;


    //새 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<Integer> createRoom(@RequestBody ChatRoomRequestDto requestDto) {
        Integer id = chatRoomService.save(requestDto);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    //전체 채팅방 목록 출력
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponseDto>> getAllRooms() {
        List<ChatRoomResponseDto> rooms = chatRoomService.findAll();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    //특정 채팅방 상세
    @GetMapping("/room/{id}")
    public ResponseEntity<ChatRoomResponseDto> getRoom(@PathVariable Integer id) {
        ChatRoomResponseDto dto = chatRoomService.findById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //채팅 메시지 보내고 받기
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public void send(@RequestBody ChatMessageRequestDto requestDto) {
        Integer id = chatMessageService.save(requestDto.getChatRoom().getId(), requestDto);
        if(id != null) {
            messagingTemplate.convertAndSend("/topic/messages", "Message received successfully!");
        } else {
            messagingTemplate.convertAndSend("/topic/messages", "Message failed to send.");
        }
    }

    //채팅방 접속 시 이전 채팅내역 가져오기
    @GetMapping("/room/{id}/messages")
    public ResponseEntity<List<ChatMessageResponseDto>> getRoomMessages(@PathVariable Integer id) {
        List<ChatMessageResponseDto> messages = chatMessageService.findByChatRoomId(id);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<ChatMessageResponseDto> getMessage(@PathVariable Integer id) {
        ChatMessageResponseDto dto = chatMessageService.findById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
