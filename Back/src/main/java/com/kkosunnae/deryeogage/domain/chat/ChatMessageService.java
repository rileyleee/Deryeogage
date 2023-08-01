package com.kkosunnae.deryeogage.domain.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    /** ChatMessage 조회 */
    public List<ChatMessageResponseDto> findByChatRoomId(Integer chatRoomId) {
        List<ChatMessageEntity> chatMessages = chatMessageRepository.findByChatRoomId(chatRoomId);
        return chatMessages.stream()
                .map(ChatMessageResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional
    public ChatMessageResponseDto findById(final Integer chatMessageId) {
        ChatMessageEntity chatMessageEntity = this.chatMessageRepository.findById(chatMessageId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatMessage가 존재하지 않습니다. chatMessageId = " + chatMessageId));
        return new ChatMessageResponseDto(chatMessageEntity);
    }

    /** ChatMessage 생성 */
    @Transactional
    public Integer save(final Integer chatRoomId, final ChatMessageRequestDto requestDto) {
        ChatRoomEntity chatRoomEntity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. chatRoomId = " + chatRoomId));
        requestDto.setChatRoom(chatRoomEntity);
        return this.chatMessageRepository.save(requestDto.toEntity()).getId();
    }

    /** ChatMessage 삭제 */
    @Transactional
    public void delete(final Integer chatMessageId) {
        ChatMessageEntity chatMessageEntity = this.chatMessageRepository.findById(chatMessageId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatMessage가 존재하지 않습니다. chatMessageId = " + chatMessageId));
        this.chatMessageRepository.delete(chatMessageEntity);
    }
}