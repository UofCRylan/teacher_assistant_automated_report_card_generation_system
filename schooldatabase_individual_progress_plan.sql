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
-- Table structure for table `individual_progress_plan`
--

DROP TABLE IF EXISTS `individual_progress_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `individual_progress_plan` (
  `teacherid` int NOT NULL,
  `studentid` int NOT NULL,
  `goals` longtext,
  `specified_disability` varchar(45) DEFAULT NULL,
  `educational_aids` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`teacherid`,`studentid`),
  KEY `fk_ipp_student_idx` (`studentid`),
  CONSTRAINT `fk_ipp_student` FOREIGN KEY (`studentid`) REFERENCES `student` (`studentid`),
  CONSTRAINT `fk_ipp_teacher` FOREIGN KEY (`teacherid`) REFERENCES `teacher` (`teacherid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `individual_progress_plan`
--

LOCK TABLES `individual_progress_plan` WRITE;
/*!40000 ALTER TABLE `individual_progress_plan` DISABLE KEYS */;
INSERT INTO `individual_progress_plan` VALUES (25,3,'Improve reading comprehension by 2 grade levels','Dyslexia','Text-to-speech software'),(26,5,'Enhance fine motor skills for better handwriting','Developmental Coordination Disorder','Occupational therapy tools'),(27,7,'Improve focus in classroom settings','ADHD','Noise-cancelling headphones'),(28,9,'Enhance basic math fluency','Dyscalculia','Math manipulatives'),(29,12,'Support social skill development','Autism Spectrum Disorder','Peer mentoring program'),(30,15,'Develop expressive language abilities','Speech delay','Speech therapy sessions'),(31,18,'Increase attention span during lessons','ADHD','Frequent breaks and visual timers'),(32,22,'Build reading fluency and comprehension','Learning disability','Guided reading materials');
/*!40000 ALTER TABLE `individual_progress_plan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 19:28:09
