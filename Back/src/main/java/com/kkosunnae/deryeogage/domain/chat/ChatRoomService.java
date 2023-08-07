package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.adopt.AdoptService;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final AdoptService adoptService;


    @Transactional
    public LocalDate updateScheduledDate(Integer roomId, ChatRoomRequestDto chatRoomRequestDto) {
        ChatRoomEntity chatRoomEntity = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        return chatRoomEntity.update(chatRoomRequestDto);
    }

    @Transactional
    public ChatRoomResponseDto findChatRoomByUsersAndBoardId(Long userId1, Long userId2, Integer boardId) {
        ChatRoomEntity chatRoomEntity = chatRoomRepository.findByUser1_IdAndUser2_IdAndBoardId(userId1, userId2, boardId);

        if (chatRoomEntity != null) {
            // 여기에서 ChatRoomEntity를 ChatRoomResponseDto로 변환하는 로직이 필요할 수 있습니다.
            // 예를 들어, new ChatRoomResponseDto(chatRoomEntity)와 같이 생성자를 사용할 수 있습니다.
            return new ChatRoomResponseDto(chatRoomEntity);
        }
        return null;
    }

    /** ChatRoom 조회 */
    @Transactional
    public List<ChatRoomResponseDto> findAll(Long userId) {
        List<ChatRoomEntity> chatRooms = chatRoomRepository.findAllByUser1_IdOrUser2_Id(userId, userId);
        return chatRooms.stream()
                .map(chatRoom -> {
                    ChatRoomResponseDto dto = new ChatRoomResponseDto(chatRoom);
                    if(chatRoom.getUser2() != null && chatRoom.getUser2().getId().equals(userId)) {
                        dto.setSchedule(true);
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public ChatRoomResponseDto findById(Long userId, final Integer id) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto(entity);
        if(entity.getUser2() != null && entity.getUser2().getId().equals(userId)) {
            chatRoomResponseDto.setSchedule(true);
        }
        return chatRoomResponseDto;
    }



    /** ChatRoom 생성 */
    @Transactional
    public ChatRoomResponseDto save(ChatRoomRequestDto chatRoomRequestDto) {
        ChatRoomEntity chatRoomEntity = chatRoomRequestDto.toEntity(userRepository);
        return new ChatRoomResponseDto(chatRoomRepository.save(chatRoomEntity));
    }

    /** ChatRoom 삭제 */
    public void delete(final Integer id) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
    }
    /**예약 일정 있는지 여부 확인: 달력 불러오고 난 직후에 확인해서 boolean 값을 리턴 받고 일정 등록하고 boolean 값에 따라 입양 정보 등록/수정 호출**/
    public boolean getExist(Integer roomId) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. roomId = " + roomId));

        if(entity.getScheduledDate()==null){ // 일정이 없으면
            return false;
        }else{ // 일정이 있으면
            return true;
        }

    }
}