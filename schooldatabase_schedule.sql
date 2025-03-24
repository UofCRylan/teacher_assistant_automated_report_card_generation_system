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
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `class_number` int NOT NULL,
  `section` int NOT NULL,
  `Homeroom` int DEFAULT NULL,
  `Math` int DEFAULT NULL,
  `Science` int DEFAULT NULL,
  `English` int DEFAULT NULL,
  `Social_Studies` int DEFAULT NULL,
  `Gym` int DEFAULT NULL,
  `Music` int DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `class_number` (`class_number`,`section`),
  KEY `Homeroom` (`Homeroom`,`section`),
  KEY `Math` (`Math`,`section`),
  KEY `Science` (`Science`,`section`),
  KEY `English` (`English`,`section`),
  KEY `Social_Studies` (`Social_Studies`,`section`),
  KEY `Gym` (`Gym`,`section`),
  KEY `Music` (`Music`,`section`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`class_number`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`Homeroom`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`Math`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_4` FOREIGN KEY (`Science`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_5` FOREIGN KEY (`English`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_6` FOREIGN KEY (`Social_Studies`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_7` FOREIGN KEY (`Gym`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `schedule_ibfk_8` FOREIGN KEY (`Music`, `section`) REFERENCES `class` (`class_number`, `section`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,1,1,2,3,5,4,6,7),(2,1,2,1,2,3,5,4,6,7),(3,2,1,8,9,10,12,11,14,13),(4,2,2,8,9,10,12,11,14,13),(5,3,1,15,16,17,21,20,19,18),(6,3,2,15,16,17,21,20,19,18),(7,4,1,22,37,38,35,36,25,28),(8,4,2,22,37,38,35,36,25,28),(9,5,1,23,41,42,39,40,26,29),(10,5,2,23,41,42,39,40,26,29),(11,6,1,24,31,32,33,34,27,30),(12,6,2,24,31,32,33,34,27,30);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
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
