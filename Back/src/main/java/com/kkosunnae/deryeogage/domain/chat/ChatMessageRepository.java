package com.kkosunnae.deryeogage.domain.chat;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Integer> {
    List<ChatMessageEntity> findByChatRoomId(Integer chatRoomId);
    ChatMessageEntity findTopByChatRoomIdOrderByCreatedDateDesc(Integer chatRoomId);


    @Transactional
    @Modifying
    @Query("UPDATE ChatMessageEntity c SET c.readYN = true WHERE c.chatRoom.id = :chatRoomId AND c.user.id != :userId")
    void markMessagesAsRead(Integer chatRoomId, Long userId);

    int countByChatRoomIdAndReadYNAndUserIdNot(Integer chatRoomId, boolean readYN, Long userId);

    /** ChatMessage 목록조회 - 기본정렬순, ChatRoom 검색 */
    List<ChatMessageEntity> findAllByChatRoom(ChatRoomEntity chatRoom);

    /** ChatMessage 목록조회 - 조건정렬순, ChatRoom 검색 */
    List<ChatMessageEntity> findAllByChatRoom(ChatRoomEntity chatRoom, Sort sort);

    /** ChatMessage 검색조회 - 기본정렬순, Message 검색 */
    List<ChatMessageEntity> findAllByMessageContaining(String message);

    /** ChatMessage 검색조회 - 조건정렬순, Message 검색 */
    List<ChatMessageEntity> findAllByMessageContaining(String message, Sort sort);
}
