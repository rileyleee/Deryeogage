package com.kkosunnae.deryeogage.domain.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Integer id;
    private Long userId;
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
}
