use drgg;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id`    bigint,
    `nickname`    varchar(20)    NULL,
    `image_url`    varchar(100) null,
    `age_range`    varchar(6)    not NULL,
    `created_date`    datetime not NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `survey`;

CREATE TABLE `survey` (
    `id`    int auto_increment    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `friendly`    char(1)    NOT NULL,
    `activity`    char(1)    NOT NULL,
    `dependency`    char(1)    NOT NULL,
    `hair`    char(1)    NOT NULL,
    `bark`    char(1)    NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `pretest`;

CREATE TABLE `pretest` (
    `id`    int auto_increment    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `response_date`    datetime default now() NOT NULL,
    `promise`    varchar(300) NOT NULL,
    `score`    tinyint NOT    NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `pre_cost`;

CREATE TABLE `pre_cost` (
    `id`    int    auto_increment NOT NULL,
    `user_id`    bigint    NOT NULL,
    `board_id`    int    NOT NULL,
    `cost`    varchar(6) NOT NULL,
    `pay_yn`    boolean    NOT NULL,
    `pay_date`    datetime default now()    NOT NULL,
    `return_yn`    boolean    NULL,
    `return_date`    datetime    NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `board`;

CREATE TABLE `board` (
    `id`    int auto_increment NOT NULL,
    `user_id`    bigint    NOT NULL,
    `region_code`    varchar(15)    NOT NULL,
    `dog_type_code`    varchar(15)    NOT NULL,
    `title`    varchar(20)    NOT NULL,
    `friendly`    char(1)    NOT NULL,
    `activity`    char(1)    NOT NULL,
    `dependency`    char(1)    NOT NULL,
    `bark`    char(1)    NOT NULL,
    `hair`    char(1)    NOT NULL,
    `name`    varchar(10)    NOT NULL,
    `gender`    boolean    NOT NULL,
    `age`    tinyint    NOT NULL,
    `chip_yn`    boolean    NOT NULL,
    `health`    varchar(300)    NOT NULL,
    `introduction`    varchar(300)    NOT NULL,
    `created_date`    datetime default now()    NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `chat_room`;

CREATE TABLE `chat_room` (
    `id`    int    auto_increment NOT NULL,
    `board_id`    int    NOT NULL,
    `user_id1`    bigint    NOT NULL,
    `user_id2`    bigint    NOT NULL,
    `scheduled_date`    date    NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `mission`;

CREATE TABLE `mission` (
    `id`    int    auto_increment NOT NULL,
    `adopt_id`    int    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `mission_url1`    varchar(100)    NULL,
    `mission_url2`    varchar(100)    NULL,
    `mission_url3`    varchar(100)    NULL,
    `mission_url4`    varchar(100)    NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `adopt`;

CREATE TABLE `adopt` (
    `id`    int auto_increment    NOT NULL,
    `board_id`    int    NOT NULL,
    `from_user_id`    bigint    NOT NULL,
    `to_user_id`    bigint    NOT NULL,
    `status`    enum('depart','arrive') default 'depart'    NOT NULL,
    `from_confirm_yn`    boolean    NULL,
    `to_confirm_yn`    boolean    NULL,
    `scheduled_date`    date    NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `review_comment`;

CREATE TABLE `review_comment` (
    `id`    int auto_increment    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `review_id`    int    NOT NULL,
    `content`    varchar(100)    NOT NULL,
    `created_date`    datetime default now() NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
    `id`    int auto_increment    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `title`    varchar(20) NOT NULL,
    `content`    text    NOT NULL,
    `created_date`    datetime default now()    NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `simulation`;

CREATE TABLE `simulation` (
    `id`    int auto_increment    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `pet_type`    varchar(20)    NOT NULL,
    `pet_name`    varchar(20)    NOT NULL,
    `background`    varchar(20)    NOT NULL,
    `start_time`    datetime    NOT NULL,
    `end_time`    datetime    NOT NULL,
    `cost`    int    default 300000 NOT NULL,
    `last_time`    datetime    NOT NULL,
    `pet_require`    varchar(20)    NULL,
    `pet_emotion`    varchar(20)    NULL,
    `train1`    float    default 0.0 NOT NULL,
    `train2`    float    default 0.0 NOT NULL,
    `train3`    float    default 0.0 NOT NULL,
    `train4`    float    default 0.0 NOT NULL,
    `health`    tinyint    default 100 NOT NULL,
    `quiz_num`    tinyint    default 0 NOT NULL,
    `title`    varchar(20)    NULL,
    `end`    boolean    default false NULL,
    `end_check`    boolean default false NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `jjim`;

CREATE TABLE `jjim` (
    `id`    int auto_increment    NOT NULL,
    `board_id`    int    NOT NULL,
    `user_id`    bigint    NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `chat_message`;

CREATE TABLE `chat_message` (
    `id`    int auto_increment    NOT NULL,
    `chatroom_id`    int    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `content`    text    NOT NULL,
    `created_date`    datetime    default now() NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `post_cost`;

CREATE TABLE `post_cost` (
    `id`    int auto_increment    NOT NULL,
    `user_id`    bigint    NOT NULL,
    `board_id`    int    NOT NULL,
    `cost`    varchar(6)    default '100000' NOT NULL,
    `pay_yn`    boolean    default true NULL,
    `pay_date`    datetime default now()    NOT NULL,
    `return_yn`    boolean    default false NULL,
    `return_date`    datetime    NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `board_file`;

CREATE TABLE `board_file` (
    `id`    int auto_increment    NOT NULL,
    `board_id`    int    NOT NULL,
    `original_name`    varchar(20)    NOT NULL,
    `saved_name`    varchar(20)    NOT NULL,
    `type`    boolean    NOT NULL,
    `path`    varchar(100)    NOT NULL,
    `created_date`    datetime    default now() NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `detail_code`;

CREATE TABLE `detail_code` (
    `value`    varchar(15)    NOT NULL,
    `id`    varchar(10)    NOT NULL,
    `name`    varchar(15)    NOT NULL,
    PRIMARY KEY (`value`)
);

DROP TABLE IF EXISTS `master_code`;

CREATE TABLE `master_code` (
    `id`    varchar(15)    NOT NULL,
    `name`    varchar(5)    NOT NULL    COMMENT '견종코드
지역코드',
PRIMARY KEY (`id`)

);

ALTER TABLE `survey` ADD CONSTRAINT `FK_user_TO_survey_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `pretest` ADD CONSTRAINT `FK_user_TO_pretest_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `pre_cost` ADD CONSTRAINT `FK_user_TO_pre_cost_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `pre_cost` ADD CONSTRAINT `FK_board_TO_pre_cost_1` FOREIGN KEY (
    `board_id`
)
REFERENCES `board` (
    `id`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_user_TO_board_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_detail_code_TO_board_1` FOREIGN KEY (
    `region_code`
)
REFERENCES `detail_code` (
    `value`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_detail_code_TO_board_2` FOREIGN KEY (
    `dog_type_code`
)
REFERENCES `detail_code` (
    `value`
);

ALTER TABLE `chat_room` ADD CONSTRAINT `FK_board_TO_chat_room_1` FOREIGN KEY (
    `board_id`
)
REFERENCES `board` (
    `id`
);

ALTER TABLE `chat_room` ADD CONSTRAINT `FK_user_TO_chat_room_1` FOREIGN KEY (
    `user_id1`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `chat_room` ADD CONSTRAINT `FK_user_TO_chat_room_2` FOREIGN KEY (
    `user_id2`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `mission` ADD CONSTRAINT `FK_adopt_TO_mission_1` FOREIGN KEY (
    `adopt_id`
)
REFERENCES `adopt` (
    `id`
);

ALTER TABLE `mission` ADD CONSTRAINT `FK_user_TO_mission_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `adopt` ADD CONSTRAINT `FK_board_TO_adopt_1` FOREIGN KEY (
    `board_id`
)
REFERENCES `board` (
    `id`
);

ALTER TABLE `adopt` ADD CONSTRAINT `FK_user_TO_adopt_1` FOREIGN KEY (
    `from_user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `adopt` ADD CONSTRAINT `FK_user_TO_adopt_2` FOREIGN KEY (
    `to_user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `review_comment` ADD CONSTRAINT `FK_user_TO_review_comment_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `review_comment` ADD CONSTRAINT `FK_review_TO_review_comment_1` FOREIGN KEY (
    `review_id`
)
REFERENCES `review` (
    `id`
) ON DELETE CASCADE;

ALTER TABLE `review` ADD CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `simulation` ADD CONSTRAINT `FK_user_TO_simulation_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `jjim` ADD CONSTRAINT `FK_board_TO_jjim_1` FOREIGN KEY (
    `board_id`
)
REFERENCES `board` (
    `id`
) ON DELETE CASCADE;

ALTER TABLE `jjim` ADD CONSTRAINT `FK_user_TO_jjim_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat_room_TO_chat_message_1` FOREIGN KEY (
    `chatroom_id`
)
REFERENCES `chat_room` (
    `id`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_user_TO_chat_message_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `post_cost` ADD CONSTRAINT `FK_user_TO_post_cost_1` FOREIGN KEY (
    `user_id`
)
REFERENCES `user` (
    `id`
);

ALTER TABLE `post_cost` ADD CONSTRAINT `FK_board_TO_post_cost_1` FOREIGN KEY (
    `board_id`
)
REFERENCES `board` (
    `id`
);

ALTER TABLE `board_file` ADD CONSTRAINT `FK_board_TO_board_file_1` FOREIGN KEY (
    `board_id`
)
REFERENCES `board` (
    `id`
) ON DELETE CASCADE;

ALTER TABLE `detail_code` ADD CONSTRAINT `FK_master_code_TO_detail_code_1` FOREIGN KEY (
    `id`
)
REFERENCES `master_code` (
    `id`
);