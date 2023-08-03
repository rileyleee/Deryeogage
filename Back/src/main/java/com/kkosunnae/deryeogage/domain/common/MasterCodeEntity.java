package com.kkosunnae.deryeogage.domain.common;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "master_code")
public class MasterCodeEntity {

    @Id
    @Column(length = 15)
    private String id;

    @Column(length = 5)
    private String name;

    @OneToMany(mappedBy = "id")
    private List<DetailCodeEntity> detailCodes = new ArrayList<>();
}
