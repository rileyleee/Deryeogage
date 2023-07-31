package com.kkosunnae.deryeogage.domain.board;

import java.time.LocalDateTime;

public class BoardFileDto {
    private Integer id;
    private Integer boardId ;
    private String originalName;
    private String savedName;
    private boolean type;
    private String path;
    private LocalDateTime createdDate;
}
