-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 3.38.151.59    Database: deryeogage
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adopt`
--

DROP TABLE IF EXISTS `adopt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adopt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `from_user_id` bigint NOT NULL,
  `to_user_id` bigint NOT NULL,
  `status` enum('depart','arrive') NOT NULL DEFAULT 'depart',
  `from_confirm_yn` tinyint(1) DEFAULT NULL,
  `to_confirm_yn` tinyint(1) DEFAULT NULL,
  `scheduled_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_board_TO_adopt_1` (`board_id`),
  KEY `FK_user_TO_adopt_1` (`from_user_id`),
  KEY `FK_user_TO_adopt_2` (`to_user_id`),
  CONSTRAINT `FK_board_TO_adopt_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_adopt_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_adopt_2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `region_code` varchar(30) NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `dog_type_code` varchar(20) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `friendly` char(1) NOT NULL,
  `activity` char(1) NOT NULL,
  `dependency` char(1) NOT NULL,
  `bark` char(1) NOT NULL,
  `hair` char(1) NOT NULL,
  `name` varchar(10) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `age` tinyint NOT NULL,
  `chip_yn` tinyint(1) NOT NULL,
  `health` varchar(300) NOT NULL,
  `introduction` varchar(300) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_board_1` (`user_id`),
  CONSTRAINT `FK_user_TO_board_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `board_file`
--

DROP TABLE IF EXISTS `board_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `original_name` varchar(100) NOT NULL,
  `saved_name` varchar(100) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `path` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_board_TO_board_file_1` (`board_id`),
  CONSTRAINT `FK_board_TO_board_file_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `nick_name` varchar(20) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `chat_room_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `read_yn` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chat_room_id` (`chat_room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_message_ibfk_1` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
  CONSTRAINT `chat_message_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `user_id1` bigint NOT NULL,
  `user_id2` bigint NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `scheduled_date` date DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id1` (`user_id1`),
  KEY `user_id2` (`user_id2`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`user_id1`) REFERENCES `user` (`id`),
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`user_id2`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jjim`
--

DROP TABLE IF EXISTS `jjim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jjim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_board_TO_jjim_1` (`board_id`),
  KEY `FK_user_TO_jjim_1` (`user_id`),
  CONSTRAINT `FK_board_TO_jjim_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_jjim_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adopt_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  `mission_url1` varchar(100) DEFAULT NULL,
  `mission_url2` varchar(100) DEFAULT NULL,
  `mission_url3` varchar(100) DEFAULT NULL,
  `mission_url4` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_adopt_TO_mission_1` (`adopt_id`),
  KEY `FK_user_TO_mission_1` (`user_id`),
  CONSTRAINT `FK_adopt_TO_mission_1` FOREIGN KEY (`adopt_id`) REFERENCES `adopt` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_mission_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_cost`
--

DROP TABLE IF EXISTS `post_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_cost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `board_id` int NOT NULL,
  `cost` varchar(6) NOT NULL DEFAULT '100000',
  `pay_yn` tinyint(1) DEFAULT '1',
  `pay_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `return_yn` tinyint(1) DEFAULT '0',
  `return_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_post_cost_1` (`user_id`),
  KEY `FK_board_TO_post_cost_1` (`board_id`),
  CONSTRAINT `FK_board_TO_post_cost_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`),
  CONSTRAINT `FK_user_TO_post_cost_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pre_cost`
--

DROP TABLE IF EXISTS `pre_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_cost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `board_id` int NOT NULL,
  `cost` varchar(6) NOT NULL,
  `pay_yn` tinyint(1) NOT NULL,
  `pay_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `return_yn` tinyint(1) DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_pre_cost_1` (`user_id`),
  KEY `FK_board_TO_pre_cost_1` (`board_id`),
  CONSTRAINT `FK_board_TO_pre_cost_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`),
  CONSTRAINT `FK_user_TO_pre_cost_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pretest`
--

DROP TABLE IF EXISTS `pretest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pretest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `response_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `promise` varchar(300) NOT NULL,
  `score` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_pretest_1` (`user_id`),
  CONSTRAINT `FK_user_TO_pretest_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `title` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_review_1` (`user_id`),
  CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review_comment`
--

DROP TABLE IF EXISTS `review_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `review_id` int NOT NULL,
  `content` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_review_comment_1` (`user_id`),
  KEY `FK_review_TO_review_comment_1` (`review_id`),
  CONSTRAINT `FK_review_TO_review_comment_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_review_comment_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `simulation`
--

DROP TABLE IF EXISTS `simulation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simulation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `pet_type` varchar(20) NOT NULL,
  `pet_name` varchar(20) NOT NULL,
  `background` varchar(20) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `cost` int DEFAULT '300000',
  `last_time` datetime NOT NULL,
  `train` varchar(8) DEFAULT '0',
  `health` tinyint DEFAULT '100',
  `quiz_num` tinyint DEFAULT '0',
  `requirement` varchar(5) DEFAULT '0',
  `title` varchar(20) DEFAULT NULL,
  `end` tinyint(1) DEFAULT '0',
  `end_check` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_simulation_1` (`user_id`),
  CONSTRAINT `FK_user_TO_simulation_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `friendly` char(1) NOT NULL,
  `activity` char(1) NOT NULL,
  `dependency` char(1) NOT NULL,
  `hair` char(1) NOT NULL,
  `bark` char(1) NOT NULL,
  `ranking` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_survey_1` (`user_id`),
  CONSTRAINT `FK_user_TO_survey_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `image_url` varchar(100) DEFAULT NULL,
  `age_range` varchar(6) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:20:08
