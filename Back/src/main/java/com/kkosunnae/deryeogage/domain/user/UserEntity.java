package com.kkosunnae.deryeogage.domain.user;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "USER")
public class UserEntity {

    @Id
    @GeneratedValue
    private Integer id;

    private String nickname;

    private String image_url;

    private String age_range;

    private LocalDateTime created_date;

}
