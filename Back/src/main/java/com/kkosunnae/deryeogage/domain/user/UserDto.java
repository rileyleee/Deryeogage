package com.kkosunnae.deryeogage.domain.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserDto {

    private Long id;
    private String nickname;
    private String ageRange;
    private String imageUrl;
    private LocalDateTime createdDate;


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
