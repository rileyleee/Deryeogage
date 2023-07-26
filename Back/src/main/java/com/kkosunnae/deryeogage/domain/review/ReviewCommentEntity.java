package com.kkosunnae.deryeogage.domain.review;


import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "review_comment")
public class ReviewCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "review_id")
    private Integer reviewId;

    @Column(length = 100)
    private String content;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}