package com.kkosunnae.deryeogage.domain.common;


import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name = "detail_code")
public class DetailCodeEntity {

    @Id
    @Column(length = 15)
    private String value;

    @Column(length = 10)
    private String id;

    @Column(length = 15)
    private String name;
}