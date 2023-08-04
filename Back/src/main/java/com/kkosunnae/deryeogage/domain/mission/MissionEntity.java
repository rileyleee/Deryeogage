package com.kkosunnae.deryeogage.domain.mission;

import com.kkosunnae.deryeogage.domain.adopt.AdoptEntity;
import com.kkosunnae.deryeogage.domain.user.UserEntity;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
@Entity
@Getter
@Table(name = "mission")
public class MissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adopt_id")
    private AdoptEntity adopt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(length = 100, name = "mission_url1")
    private String missionUrl1;

    @Column(length = 100, name = "mission_url2")
    private String missionUrl2;

    @Column(length = 100, name = "mission_url3")
    private String missionUrl3;

    @Column(length = 100, name = "mission_url4")
    private String missionUrl4;

    @Builder
    public MissionEntity(Integer id, AdoptEntity adopt, UserEntity user, String missionUrl1, String missionUrl2, String missionUrl3, String missionUrl4) {
        this.id = id;
        this.adopt = adopt;
        this.user = user;
        this.missionUrl1 = missionUrl1;
        this.missionUrl2 = missionUrl2;
        this.missionUrl3 = missionUrl3;
        this.missionUrl4 = missionUrl4;
    }

    public MissionDto toDto(){
        return MissionDto.builder()
                .id(this.id)
                .adoptId(this.adopt.getId())
                .userId(this.user.getId())
                .missionUrl1(this.missionUrl1)
                .missionUrl2(this.missionUrl2)
                .missionUrl3(this.missionUrl3)
                .missionUrl4(this.missionUrl4)
                .build();

    }

    public void update(MissionDto missionDto){
        this.missionUrl1 = missionDto.getMissionUrl1();
        this.missionUrl2 = missionDto.getMissionUrl2();
        this.missionUrl3 = missionDto.getMissionUrl3();
        this.missionUrl4 = missionDto.getMissionUrl4();
    }
}