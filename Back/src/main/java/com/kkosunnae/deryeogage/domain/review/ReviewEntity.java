package com.kkosunnae.deryeogage.domain.review;


import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "review")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Long userId;

    @Column(length = 20)
    private String title;

    @Column
    private String content;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}