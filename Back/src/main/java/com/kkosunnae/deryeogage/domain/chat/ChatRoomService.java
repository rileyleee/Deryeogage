package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;


    @Transactional
    public LocalDateTime updateScheduledDate(Integer roomId, LocalDateTime scheduledDate) {
        ChatRoomEntity chatRoomEntity = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        return chatRoomEntity.update(scheduledDate);
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
                .map(chatRoom -> new ChatRoomResponseDto(chatRoom))
                .collect(Collectors.toList());
    }
    @Transactional
    public ChatRoomResponseDto findById(final Integer id) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        return new ChatRoomResponseDto(entity);
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
}