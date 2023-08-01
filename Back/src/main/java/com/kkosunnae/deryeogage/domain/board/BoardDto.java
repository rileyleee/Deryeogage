package com.kkosunnae.deryeogage.domain.board;

import com.kkosunnae.deryeogage.domain.common.DetailCodeEntity;
import com.kkosunnae.deryeogage.domain.common.DetailCodeRepository;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import com.kkosunnae.deryeogage.domain.user.UserRepository;
import lombok.*;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Getter
@Setter
@NoArgsConstructor
public class BoardDto {
    private int id;
    private long userId;
    private String regionCode;
    private String dogTypeCode;
    private String userNickname;
    private String title;
    private char friendly;
    private char activity;
    private char dependency;
    private char bark;
    private char hair;
    private String name;
    private boolean gender;
    private byte age;
    private boolean chipYn;
    private String health;
    private String introduction;
    private LocalDateTime createdDate;


    public boolean isChipYn() {
        return chipYn;
    }
    public boolean isGender() {
        return gender;
    }
    @Builder
    public BoardDto(int id, long userId, String regionCode, String dogTypeCode, String userNickname, String title, char friendly, char activity, char dependency, char bark, char hair, String name, boolean gender, byte age, boolean chipYn, String health, String introduction, LocalDateTime createdDate) {
        this.id = id;
        this.userId = userId;
        this.regionCode = regionCode;
        this.dogTypeCode = dogTypeCode;
        this.userNickname = userNickname;
        this.title = title;
        this.friendly = friendly;
        this.activity = activity;
        this.dependency = dependency;
        this.bark = bark;
        this.hair = hair;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.chipYn = chipYn;
        this.health = health;
        this.introduction = introduction;
        this.createdDate = createdDate;
    }


    public BoardEntity toEntity(UserRepository userRepository, DetailCodeRepository detailCodeRepository){
        UserEntity user = userRepository.findById(this.userId)
           .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        DetailCodeEntity region = detailCodeRepository.findByValue(this.regionCode)
                .orElseThrow(() -> new NoSuchElementException("해당 지역이 존재하지 않습니다."));

        DetailCodeEntity dogType = detailCodeRepository.findByValue(this.dogTypeCode)
                .orElseThrow(() -> new NoSuchElementException("해당 견종이 존재하지 않습니다."));


        return BoardEntity.builder()
                .user(user)
                .regionCode(region)
                .dogTypeCode(dogType)
                .userNickname(userNickname)
                .title(title)
                .friendly(friendly)
                .activity(activity)
                .dependency(dependency)
                .bark(bark)
                .hair(hair)
                .name(name)
                .gender(gender)
                .age(age)
                .chipYn(chipYn)
                .health(health)
                .introduction(introduction)
                .createdDate(createdDate)
                .build();
    }
}
