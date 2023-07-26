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
    private String nickname;
    private String ageRange;
    private String imageUrl;
    //private LocalDateTime createdDate; //SQL 수정 또는 날짜형식으로 변환?
    private String createdDate;

}
