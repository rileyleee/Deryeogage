package com.kkosunnae.deryeogage.domain.user;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String nickname;

    @Column(name="image_url", length = 100)
    private String imageUrl;

    @Column(name="age_range", length = 6)
    private String ageRange;

    @Column(name="created_date")
    private LocalDateTime createdDate;
}