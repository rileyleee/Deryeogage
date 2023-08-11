package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.board.BoardService;
import com.kkosunnae.deryeogage.domain.user.UserService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import com.kkosunnae.deryeogage.global.util.Response;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {

    private final JwtUtil jwtUtil;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;
    private final BoardService boardService;

    //스케쥴 잡기, 수정, 삭제
    @PutMapping("/room/{roomId}/schedule")
    public ResponseEntity<Integer> updateScheduledDate(@PathVariable Integer roomId, @RequestBody ChatRoomRequestDto chatRoomRequestDto) {
        chatRoomService.updateScheduledDate(roomId, chatRoomRequestDto);
        return new ResponseEntity<>(roomId, HttpStatus.OK);
    }

    //스케줄 존재여부 확인
    @GetMapping("/room/{roomId}/schedule")
    public Response<Object> getExist(@PathVariable Integer roomId){
       boolean exist = chatRoomService.getExist(roomId);
        return Response.success(exist);
    }

    // chatRoom 정보 조회
    @GetMapping("/room/info/{id}")
    public Response<Object> getRoomInfo(@PathVariable Integer id){
        log.info("chat 컨트롤러 roomId"+id);
        ChatRoomDto chatRoomInfo = chatRoomService.getRoomInfo(id);
        return Response.success(chatRoomInfo);
    }


    //새 채팅방 생성
    @PostMapping("/room/{boardId}")
    public ResponseEntity<ChatRoomResponseDto> createRoom(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer boardId) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId2 = jwtUtil.getUserId(jwtToken);
        Long userId1 = boardService.getBoard(boardId).getUserId();
        String boardName = boardService.getBoard(boardId).getName();

        // 이미 있는 채팅방이 있다면 반환
        ChatRoomResponseDto existingChatRoom = chatRoomService.findChatRoomByUsersAndBoardId(userId1, userId2, boardId);
        if (existingChatRoom != null) {
            return new ResponseEntity<>(existingChatRoom, HttpStatus.OK);
        }

        // 새 채팅방 생성 후 반환
        ChatRoomRequestDto chatRoomRequestDto = new ChatRoomRequestDto(userId1,userId2,boardId,boardName);
        ChatRoomResponseDto chatRoomResponseDto = chatRoomService.save(chatRoomRequestDto);
        return new ResponseEntity<>(chatRoomResponseDto, HttpStatus.CREATED);
    }

    //사용자가 속한 전체 채팅방 목록 출력
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponseDto>> getAllRooms(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        List<ChatRoomResponseDto> chatRoomResponseDtoList = chatRoomService.findAll(userId);
        return new ResponseEntity<>(chatRoomResponseDtoList, HttpStatus.OK);
    }

    //내가 올린 분양글에 대한 전체 채팅방 목록 출력
    @GetMapping("/rooms/{boardId}")
    public ResponseEntity<List<ChatRoomResponseDto>> getAllRoomsInBoard(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer boardId) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        List<ChatRoomResponseDto> chatRoomResponseDtoList = chatRoomService.findAllInBoard(userId, boardId);
        return new ResponseEntity<>(chatRoomResponseDtoList, HttpStatus.OK);
    }


    //특정 채팅방 상세
    @GetMapping("/room/{id}")
    public ResponseEntity<ChatRoomResponseDto> getRoom(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        ChatRoomResponseDto chatRoomResponseDto = chatRoomService.findById(userId, id);



        chatMessageService.markMessagesAsRead(id, userId);
        return new ResponseEntity<>(chatRoomResponseDto, HttpStatus.OK);
    }

    //채팅 메시지 보내고 받기
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public void send(@Header("Authorization") String token, @RequestBody ChatMessageRequestDto requestDto) {
        token = token.replace("Bearer ", "");
        long userid=jwtUtil.getUserId(token);
        String nickName = userService.getUserNickname(userid);
        requestDto.setUser(userid);
        requestDto.setNickName(nickName);

        ChatMessageResponseDto chatMessageResponseDto = chatMessageService.save(requestDto.getChatRoom().getId(), requestDto);
        if(chatMessageResponseDto.getId() != null) {
            messagingTemplate.convertAndSend("/topic/messages", chatMessageResponseDto);
            // 채팅방 상태 변경 알림
            messagingTemplate.convertAndSend("/topic/rooms/update", "Chat room updated");
        } else {
            messagingTemplate.convertAndSend("/topic/messages", "Message failed to send.");
        }
    }

    //채팅방 접속 시 이전 채팅내역 가져오기
    @GetMapping("/room/{id}/messages")
    public ResponseEntity<List<ChatMessageResponseDto>> getRoomMessages(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        chatMessageService.markMessagesAsRead(id, userId);

        List<ChatMessageResponseDto> messages = chatMessageService.findByChatRoomId(id);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    //채팅방 밖에서 가장 최근 메시지
    @GetMapping("/room/{roomId}/lastmessage")
    public ResponseEntity<ChatMessageResponseDto> getRoomLastMessage(@PathVariable Integer roomId) {
        ChatMessageResponseDto message = chatMessageService.findLastByChatRoomId(roomId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    //채팅방 밖에서 안 읽은 메시지 수
    @GetMapping("/room/{id}/nonreadcount")
    public Integer getNonReadCount(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        int nonReadCount = chatMessageService.getNonReadCount(id, userId);
        System.out.println("count"+nonReadCount);
        return nonReadCount;
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<ChatMessageResponseDto> getMessage(@PathVariable Integer id) {
        ChatMessageResponseDto dto = chatMessageService.findById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
