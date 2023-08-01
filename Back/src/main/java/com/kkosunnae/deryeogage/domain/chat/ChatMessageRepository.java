package com.kkosunnae.deryeogage.domain.chat;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Integer> {
    List<ChatMessageEntity> findByChatRoomId(Integer chatRoomId);


    /** ChatMessage 목록조회 - 기본정렬순, ChatRoom 검색 */
    List<ChatMessageEntity> findAllByChatRoom(ChatRoomEntity chatRoom);

    /** ChatMessage 목록조회 - 조건정렬순, ChatRoom 검색 */
    List<ChatMessageEntity> findAllByChatRoom(ChatRoomEntity chatRoom, Sort sort);

    /** ChatMessage 검색조회 - 기본정렬순, Message 검색 */
    List<ChatMessageEntity> findAllByMessageContaining(String message);

    /** ChatMessage 검색조회 - 조건정렬순, Message 검색 */
    List<ChatMessageEntity> findAllByMessageContaining(String message, Sort sort);
}
