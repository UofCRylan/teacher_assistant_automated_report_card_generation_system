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
-- Table structure for table `recieves_feedback`
--

DROP TABLE IF EXISTS `recieves_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recieves_feedback` (
  `teacherid` int NOT NULL,
  `studentid` int NOT NULL,
  `classnumber` int NOT NULL,
  `section` int NOT NULL,
  `letter` varchar(45) NOT NULL,
  PRIMARY KEY (`teacherid`,`studentid`,`classnumber`,`section`,`letter`),
  KEY `fk_recieves_feedback_studentid_idx` (`studentid`),
  KEY `fk_recieves_feedback_classnumber_idx` (`classnumber`,`section`),
  KEY `fk_recieves_feedback_letter_idx` (`letter`),
  CONSTRAINT `fk_recieves_feedback_classnumbersection` FOREIGN KEY (`classnumber`, `section`) REFERENCES `feedback` (`classnumber`, `section`),
  CONSTRAINT `fk_recieves_feedback_letter` FOREIGN KEY (`letter`) REFERENCES `feedback` (`letter`),
  CONSTRAINT `fk_recieves_feedback_studentid` FOREIGN KEY (`studentid`) REFERENCES `feedback` (`studentid`),
  CONSTRAINT `fk_recieves_feedback_teacherid` FOREIGN KEY (`teacherid`) REFERENCES `feedback` (`teacherid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recieves_feedback`
--

LOCK TABLES `recieves_feedback` WRITE;
/*!40000 ALTER TABLE `recieves_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `recieves_feedback` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-15  1:47:07
