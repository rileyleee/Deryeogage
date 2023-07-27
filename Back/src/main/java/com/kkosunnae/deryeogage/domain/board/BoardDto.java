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
@AllArgsConstructor
@Builder
public class BoardDto {
    private Integer id;
    private Long user;
    private String regionCode;
    private String dogTypeCode;
    private String title;
    private Character friendly;
    private Character activity;
    private Character dependency;
    private Character bark;
    private Character hair;
    private String name;
    private boolean gender;
    private Byte age;
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

    public BoardEntity toEntity(UserRepository userRepository, DetailCodeRepository detailCodeEntity){
        UserEntity user = userRepository.findById(this.user)
           .orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다."));

        DetailCodeEntity region = detailCodeEntity.findByValue(this.regionCode)
                .orElseThrow(() -> new NoSuchElementException("해당 지역이 존재하지 않습니다."));

        DetailCodeEntity dogType = detailCodeEntity.findByValue(this.dogTypeCode)
                .orElseThrow(() -> new NoSuchElementException("해당 견종이 존재하지 않습니다."));


        return BoardEntity.builder()
                .id(id)
                .user(user)
                .regionCode(region)
                .dogTypeCode(dogType)
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
