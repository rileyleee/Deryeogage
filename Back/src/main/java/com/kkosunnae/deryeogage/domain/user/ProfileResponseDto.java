package com.kkosunnae.deryeogage.domain.user;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProfileResponseDto {
    private Long userId;
    private String nickname;
    private String profilePic;
    private byte preTestScore;
    private String preTestPromise;
    private String simulationTitle;
    private int adoptFromCount;
    private int adoptToCount;

    @Builder
    public ProfileResponseDto(Long userId, String nickname, String profilePic, byte preTestScore, String preTestPromise, String simulationTitle, int adoptFromCount, int adoptToCount) {
        this.userId = userId;
        this.nickname = nickname;
        this.profilePic = profilePic;
        this.preTestScore = preTestScore;
        this.preTestPromise = preTestPromise;
        this.simulationTitle = simulationTitle;
        this.adoptFromCount = adoptFromCount;
        this.adoptToCount = adoptToCount;
    }
}
