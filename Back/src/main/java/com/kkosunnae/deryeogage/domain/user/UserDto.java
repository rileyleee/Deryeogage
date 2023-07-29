package com.kkosunnae.deryeogage.domain.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {

    private Long id;
    //private Long kakaoId;
    private String nickname;
    private String ageRange;
    private String imageUrl;
    private LocalDateTime createdDate; //SQL 수정 또는 날짜형식으로 변환?
    //private String createdDate;

    public UserEntity toEntity(){
        return UserEntity.builder()
                .id(this.id)
                .nickname(this.nickname)
                .ageRange(this.ageRange)
                .imageUrl(this.imageUrl)
                .createdDate(this.createdDate)
                .build();
    }

}
