-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: schooldatabase
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_number` int NOT NULL,
  `section` int NOT NULL,
  `subject` varchar(45) DEFAULT NULL,
  `time_start` varchar(45) DEFAULT NULL,
  `time_end` varchar(45) DEFAULT NULL,
  `class_name` varchar(45) DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`class_number`,`section`),
  KEY `fk_class_roomid_idx` (`room_id`),
  KEY `fk_class_teacherid_idx` (`teacher_id`),
  CONSTRAINT `fk_class_roomid` FOREIGN KEY (`room_id`) REFERENCES `class_room` (`roomid`),
  CONSTRAINT `fk_class_teacherid` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacherid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,1,'Homeroom','08:00','08:15','Grade 1A Homeroom',1,25),(1,2,'Homeroom','08:00','08:15','Grade 1B Homeroom',2,26),(2,1,'Math','08:15','09:15','Grade 1A Math',1,25),(2,2,'Math','08:15','09:15','Grade 1B Math',2,26),(3,1,'Science','09:20','10:20','Grade 1A Science',1,25),(3,2,'Science','09:20','10:20','Grade 1B Science',2,26),(4,1,'Social Studies','10:25','11:25','Grade 1A Social Studies',1,25),(4,2,'Social Studies','10:25','11:25','Grade 1B Social Studies',2,26),(5,1,'English','11:30','12:30','Grade 1A English',1,25),(5,2,'English','11:30','12:30','Grade 1B English',2,26),(6,1,'Gym','13:00','14:00','Grade 1 Gym',11,306),(6,2,'Gym','13:00','14:00','Grade 1 Gym',11,306),(7,1,'Music','14:05','15:05','Grade 1 Music',12,307),(7,2,'Music','14:05','15:05','Grade 1 Music',12,307),(8,1,'Homeroom','08:00','08:15','Grade 2A Homeroom',3,27),(8,2,'Homeroom','08:00','08:15','Grade 2B Homeroom',4,28),(9,1,'Math','08:15','09:15','Grade 2A Math',3,27),(9,2,'Math','08:15','09:15','Grade 2B Math',4,28),(10,1,'Science','09:20','10:20','Grade 2A Science',3,27),(10,2,'Science','09:20','10:20','Grade 2B Science',4,28),(11,1,'Social Studies','10:25','11:25','Grade 2A Social Studies',3,27),(11,2,'Social Studies','10:25','11:25','Grade 2B Social Studies',4,28),(12,1,'English','11:30','12:30','Grade 2A English',3,27),(12,2,'English','11:30','12:30','Grade 2B English',4,28),(13,1,'Music','13:00','14:00','Grade 2 Music',12,307),(13,2,'Music','13:00','14:00','Grade 2 Music',12,307),(14,1,'Gym','14:05','15:05','Grade 2 Gym',11,306),(14,2,'Gym','14:05','15:05','Grade 2 Gym',11,306),(15,1,'Homeroom','08:00','08:15','Grade 3A Homeroom',5,29),(15,2,'Homeroom','08:00','08:15','Grade 3B Homeroom',6,30),(16,1,'Math','08:15','09:15','Grade 3A Math',5,29),(16,2,'Math','08:15','09:15','Grade 3B Math',6,30),(17,1,'Science','09:20','10:20','Grade 3A Science',5,29),(17,2,'Science','09:20','10:20','Grade 3B Science',6,30),(18,1,'Music','10:25','11:25','Grade 3 Music',12,307),(18,2,'Music','10:25','11:25','Grade 3 Music',12,307),(19,1,'Gym','11:30','12:30','Grade 3 Gym',11,306),(19,2,'Gym','11:30','12:30','Grade 3 Gym',11,306),(20,1,'Social Studies','13:00','14:00','Grade 3A Social Studies',5,29),(20,2,'Social Studies','13:00','14:00','Grade 3B Social Studies',6,30),(21,1,'English','14:05','15:05','Grade 3A English',5,29),(21,2,'English','14:05','15:05','Grade 3B English',6,30),(22,1,'Homeroom','08:00','08:15','Grade 4A Homeroom',7,32),(22,2,'Homeroom','08:00','08:15','Grade 4B Homeroom',8,31),(23,1,'Homeroom','08:00','08:15','Grade 5A Homeroom',9,301),(23,2,'Homeroom','08:00','08:15','Grade 5B Homeroom',10,302),(24,1,'Homeroom','08:00','08:15','Grade 6A Homeroom',12,303),(24,2,'Homeroom','08:00','08:15','Grade 6B Homeroom',13,304),(25,1,'Gym','8:20','9:20','Grade 4 Gym',11,306),(25,2,'Gym','08:20','09:20','Grade 4 Gym',11,306),(26,1,'Gym','9:25','10:25','Grade 5 Gym',11,306),(26,2,'Gym','09:25','10:25','Grade 5 Gym',11,306),(27,1,'Gym','10:30','11:30','Grade 6 Gym',11,306),(27,2,'Gym','10:30','11:30','Grade 6 Gym',11,306),(28,1,'Music','11:35','12:35','Grade 4 Music',12,307),(28,2,'Music','11:35','12:35','Grade 4 Music',12,307),(29,1,'Music','8:20','9:20','Grade 5 Music',12,307),(29,2,'Music','08:20','09:20','Grade 5 Music',12,307),(30,1,'Music','9:25','10:25','Grade 6 Music',12,307),(30,2,'Music','9:25','10:25','Grade 6 Music',12,307),(31,1,'Math','8:20','9:20','Grade 6a Math',12,303),(31,2,'Math','11:35','12:35','Grade 6b Math',12,303),(32,1,'Science','11:35','12:35','Grade 6a Science',13,304),(32,2,'Science','8:20','9:20','Grade 6b Science',13,304),(33,1,'English','13:00','14:00','Grade 6a English',8,31),(33,2,'English','14:05','15:05','Grade 6b English',8,31),(34,1,'Social Studies','14:05','15:05','Grade 6a Social Studies',9,301),(34,2,'Social Studies','13:00','14:00','Grade 6b Social Studies',9,301),(35,1,'English','9:25','10:25','Grade 4a English',8,31),(35,2,'English','10:30','11:30','Grade 4b English',8,31),(36,1,'Social Studies','10:30','11:30','Grade 4a Social Studies',9,303),(36,2,'Social Studies','9:25','10:25','Grade 4b Social Studies',9,303),(37,1,'Math','13:00','14:00','Grade 4a Math',12,303),(37,2,'Math','14:05','15:05','Grade 4b Math',12,303),(38,1,'Science','14:05','15:05','Grade 4a Science',13,304),(38,2,'Science','13:00','14:00','Grade 4b Science',13,304),(39,1,'English','10:30','11:30','Grade 5a English',14,308),(39,2,'English','11:35','12:35','Grade 5b English',14,308),(40,1,'Social Studies','11:35','12:35','Grade 5a Social Studies',15,309),(40,2,'Social Studies','10:30','11:30','Grade 5a Social Studies',15,309),(41,1,'Math','13:00','14:00','Grade 5a Math',7,32),(41,2,'Math','14:05','15:05','Grade 5b Math',7,32),(42,1,'Science','14:05','15:05','Grade 5a Science',8,31),(42,2,'Science','13:00','14:00','Grade 5b Science',8,31);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-23 22:21:48
