package com.kkosunnae.deryeogage.domain.chat;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Integer> {
    /** ChatRoom 조회 - RoomName 검색, 정확히 일치 */
    ChatRoomEntity findByRoomName(String roomName);

    /** ChatRoom 목록조회 - 기본정렬순, RoomName 검색, 정확히 일치 */
    List<ChatRoomEntity> findAllByRoomName(String roomName);

    /** ChatRoom 목록조회 - 조건정렬순, RoomName 검색, 정확히 일치 */
    List<ChatRoomEntity> findAllByRoomName(String roomName, Sort sort);

    /** ChatRoom 목록조회 - 기본정렬순, RoomName 검색, 포함 일치 */
    List<ChatRoomEntity> findAllByRoomNameContaining(String roomName);

    /** ChatRoom 목록조회 - 조건정렬순, RoomName 검색, 포함 일치 */
    List<ChatRoomEntity> findAllByRoomNameContaining(String roomName, Sort sort);
}
