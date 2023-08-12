package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.board.BoardRepository;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;



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
            ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto(chatRoomEntity);
            chatRoomResponseDto.setRoomName(boardRepository.findById(boardId).get().getTitle());
            return chatRoomResponseDto;
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

    /** 내가 올린 분양글에 대한 전체 ChatRoom 조회 */
    @Transactional
    public List<ChatRoomResponseDto> findAllInBoard(Long userId, Integer boardId) {
        List<ChatRoomEntity> chatRooms = chatRoomRepository.findAllByUser1_IdAndBoardId(userId, boardId);
        List<ChatRoomResponseDto> chatRoomResponseDtoList=new ArrayList<>();
        for(ChatRoomEntity chatRoomEntity : chatRooms){
            ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto(chatRoomEntity);
            // 현재 사용자가 입양자면 날짜잡기가 가능하게
            if(chatRoomEntity.getUser2() != null && chatRoomEntity.getUser2().getId().equals(userId)) {
                chatRoomResponseDto.setSchedule(true);
            }

            String myNickName = userRepository.findById(userId).get().getNickname();
            String yourNickName = (chatRoomEntity.getUser1().getId()==userId) ? chatRoomEntity.getUser2().getNickname() : chatRoomEntity.getUser1().getNickname();
            String yourImg = (chatRoomEntity.getUser1().getId()==userId) ? chatRoomEntity.getUser2().getImageUrl() : chatRoomEntity.getUser1().getImageUrl();
            chatRoomResponseDto.setMyNickName(myNickName);
            chatRoomResponseDto.setYourNickName(yourNickName);
            chatRoomResponseDto.setYourImg(yourImg);

            chatRoomResponseDto.setSchedule(this.getExist(chatRoomEntity.getId()));
            chatRoomResponseDto.setScheduledDate(chatRoomEntity.getScheduledDate());

            chatRoomResponseDto.setRoomName(boardRepository.findById(boardId).get().getTitle());

            chatRoomResponseDtoList.add(chatRoomResponseDto);
        }


        return chatRoomResponseDtoList;
    }





    //    @Transactional
//    public ChatRoomResponseDto findById(Long userId, final Integer id) {
//        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
//                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
//        ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto(entity);
//        if(entity.getUser2() != null && entity.getUser2().getId().equals(userId)) {
//            chatRoomResponseDto.setSchedule(true);
//            chatRoomResponseDto.setMyNickName(userRepository.findById(userId).get().getNickname());
//            if(entity.getUser1().getId()==userId){
//                chatRoomResponseDto.setYourNickName(entity.getUser2().getNickname());
//            }
//            else{
//                chatRoomResponseDto.setYourNickName(entity.getUser1().getNickname());
//            }
//        }
//        return chatRoomResponseDto;
//    }
    @Transactional
    public ChatRoomResponseDto findById(Long userId, final Integer id) {
        ChatRoomEntity entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto(entity);
        // 현재 사용자가 입양자면 날짜잡기가 가능하게
        if(entity.getUser2() != null && entity.getUser2().getId().equals(userId)) {
            chatRoomResponseDto.setSchedule(true);
        }

        String myNickName = userRepository.findById(userId).get().getNickname();
        String yourNickName = (entity.getUser1().getId()==userId) ? entity.getUser2().getNickname() : entity.getUser1().getNickname();
        String yourImg = (entity.getUser1().getId()==userId) ? entity.getUser2().getImageUrl() : entity.getUser1().getImageUrl();
                chatRoomResponseDto.setMyNickName(myNickName);
        chatRoomResponseDto.setYourNickName(yourNickName);
        chatRoomResponseDto.setYourImg(yourImg);
        chatRoomResponseDto.setRoomName(boardRepository.findById(entity.getBoardId()).get().getTitle());


        return chatRoomResponseDto;
    }

    /** ChatRoom 생성 */
    @Transactional
    public ChatRoomResponseDto save(ChatRoomRequestDto chatRoomRequestDto) {
        ChatRoomEntity chatRoomEntity = chatRoomRequestDto.toEntity(userRepository, boardRepository);
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
    //채팅방 정보 전달
    public ChatRoomDto getRoomInfo(Integer id) {
        log.info("chat 서비스 roomId"+id);
        ChatRoomEntity chatRoomEntity = chatRoomRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("해당 채팅 방이 존재하지 않습니다."));
        ChatRoomDto chatRoomInfo = chatRoomEntity.toDto();
        return chatRoomInfo;
    }
}