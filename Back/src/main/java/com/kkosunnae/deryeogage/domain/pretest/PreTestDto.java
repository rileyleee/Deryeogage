package com.kkosunnae.deryeogage.domain.pretest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
public class PreTestDto {

    private int id;

    private long user;

    private LocalDateTime responseDate;

    private String promise;

    private byte score;

    @Builder
    public PreTestDto(int id, long user, LocalDateTime responseDate, String promise, byte score) {
        this.id = id;
        this.user = user;
        this.responseDate = responseDate;
        this.promise = promise;
        this.score = score;
    }
}
