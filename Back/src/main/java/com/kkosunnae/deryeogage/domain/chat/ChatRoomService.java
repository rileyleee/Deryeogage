package com.kkosunnae.deryeogage.domain.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    /** ChatRoom 조회 */

    public List<ChatRoomResponseDto> findAll() {
        List<ChatRoomEntity> chatRooms = chatRoomRepository.findAll();
        // 여기서 ChatRoom을 ChatRoomResponseDto로 변환하는 로직이 필요합니다.
        // 예를 들어, Java 8 Stream API를 사용하여 변환할 수 있습니다.
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
    public Integer save(final ChatRoomRequestDto requestDto) {
        return this.chatRoomRepository.save(requestDto.toEntity()).getId();
    }

    /** ChatRoom 수정 */
    @Transactional
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