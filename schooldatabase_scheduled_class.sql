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
-- Table structure for table `scheduled_class`
--

DROP TABLE IF EXISTS `scheduled_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scheduled_class` (
  `schedule_id` int NOT NULL,
  `class_number` int NOT NULL,
  `section` int NOT NULL,
  PRIMARY KEY (`schedule_id`,`class_number`,`section`),
  KEY `fk_class_idx` (`class_number`,`section`),
  CONSTRAINT `fk_class_section` FOREIGN KEY (`class_number`, `section`) REFERENCES `class` (`class_number`, `section`),
  CONSTRAINT `fk_scheduleid` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduled_class`
--

LOCK TABLES `scheduled_class` WRITE;
/*!40000 ALTER TABLE `scheduled_class` DISABLE KEYS */;
INSERT INTO `scheduled_class` VALUES (1,1,1),(2,1,2),(1,2,1),(2,2,2),(1,3,1),(2,3,2),(1,4,1),(2,4,2),(1,5,1),(2,5,2),(1,6,1),(2,6,2),(1,7,1),(2,7,2),(3,8,1),(4,8,2),(3,9,1),(4,9,2),(3,10,1),(4,10,2),(3,11,1),(4,11,2),(3,12,1),(4,12,2),(3,13,1),(4,13,2),(3,14,1),(4,14,2),(5,15,1),(6,15,2),(5,16,1),(6,16,2),(5,17,1),(6,17,2),(5,18,1),(6,18,2),(5,19,1),(6,19,2),(5,20,1),(6,20,2),(5,21,1),(6,21,2),(7,22,1),(8,22,2),(9,23,1),(10,23,2),(11,24,1),(12,24,2),(7,25,1),(8,25,2),(9,26,1),(10,26,2),(11,27,1),(12,27,2),(7,28,1),(8,28,2),(9,29,1),(10,29,2),(11,30,1),(12,30,2),(11,31,1),(12,31,2),(11,32,1),(12,32,2),(11,33,1),(12,33,2),(11,34,1),(12,34,2),(7,35,1),(8,35,2),(7,36,1),(8,36,2),(7,37,1),(8,37,2),(7,38,1),(8,38,2),(9,39,1),(10,39,2),(9,40,1),(10,40,2),(9,41,1),(10,41,2),(9,42,1),(10,42,2);
/*!40000 ALTER TABLE `scheduled_class` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-20 21:15:32
