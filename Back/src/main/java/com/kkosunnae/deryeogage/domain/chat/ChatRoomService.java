package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    /** ChatRoom 조회 */

    public List<ChatRoomResponseDto> findAll(Long userId) {
        List<ChatRoomEntity> chatRooms = chatRoomRepository.findAllByUser1_IdOrUser2_Id(userId, userId);
        return chatRooms.stream()
                .map(chatRoom -> new ChatRoomResponseDto(chatRoom))
                .collect(Collectors.toList());
    }

    public ChatRoomResponseDto findById(final Integer id) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        return new ChatRoomResponseDto(entity);
    }



    /** ChatRoom 생성 */
    public Integer save(final ChatRoomRequestDto requestDto) {
        return this.chatRoomRepository.save(requestDto.toEntity(userRepository)).getId();
    }

    /** ChatRoom 수정 */
    public Integer update(final Integer id, ChatRoomRequestDto requestDto) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        return entity.update(requestDto);
    }

    /** ChatRoom 삭제 */
    public void delete(final Integer id) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
    }
}