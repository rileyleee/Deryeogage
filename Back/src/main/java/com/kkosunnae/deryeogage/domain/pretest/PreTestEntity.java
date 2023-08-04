package com.kkosunnae.deryeogage.domain.pretest;

import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name="pretest")
public class PreTestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name="response_date")
    private LocalDateTime responseDate;

    @Column(length = 300)
    private String promise;

    @Column
    private Byte score;

    @Builder
    public PreTestEntity(Integer id, UserEntity user, LocalDateTime responseDate, String promise, Byte score) {
        this.id = id;
        this.user = user;
        this.responseDate = responseDate;
        this.promise = promise;
        this.score = score;
    }

    public PreTestDto toDto() {
        return PreTestDto.builder()
                .id(this.id)
                .userId(this.user.getId())
                .responseDate(this.responseDate)
                .promise(this.promise)
                .score(this.score)
                .build();
    }
}
