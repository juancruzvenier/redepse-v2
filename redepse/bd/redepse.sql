CREATE DATABASE  IF NOT EXISTS `redepse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `redepse`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: redepse
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `alu_disc_esc_per`
--

DROP TABLE IF EXISTS `alu_disc_esc_per`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alu_disc_esc_per` (
  `dni_alumno` int DEFAULT NULL,
  `id_disciplina` int DEFAULT NULL,
  `id_esc` int DEFAULT NULL,
  `id_periodo` int DEFAULT NULL,
  KEY `dni_alumno` (`dni_alumno`),
  KEY `id_disciplina` (`id_disciplina`),
  KEY `id_esc` (`id_esc`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `alu_disc_esc_per_ibfk_1` FOREIGN KEY (`dni_alumno`) REFERENCES `alumno` (`dni_alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `alu_disc_esc_per_ibfk_2` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `alu_disc_esc_per_ibfk_3` FOREIGN KEY (`id_esc`) REFERENCES `escuela` (`id_esc`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `alu_disc_esc_per_ibfk_4` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alu_disc_esc_per`
--

LOCK TABLES `alu_disc_esc_per` WRITE;
/*!40000 ALTER TABLE `alu_disc_esc_per` DISABLE KEYS */;
INSERT INTO `alu_disc_esc_per` VALUES (45955049,1,2,2025),(46491016,1,2,2025);
/*!40000 ALTER TABLE `alu_disc_esc_per` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `dni_alumno` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fecha_nac` date NOT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `estado` varchar(20) NOT NULL,
  `dni_tutor` int DEFAULT NULL,
  `id_periodo` int DEFAULT NULL,
  PRIMARY KEY (`dni_alumno`),
  KEY `dni_tutor` (`dni_tutor`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `alumno_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (40100200,'Lautaro','Martínez','2000-12-01',NULL,'Activo',NULL,NULL),(40123456,'Lamine','Yamal','2007-07-13','Barcelona','Activo',20123456,2025),(42216020,'Juan Cruz','Venier','1999-10-16','Achaval 300','Activo',17885474,NULL),(45955049,'Maximo','Schuldt','2005-02-17','Orestes 23','Inactivo',32852014,NULL),(45958733,'Juan','Ibañez','2005-05-08','Belgrano 123','Activo',36221454,NULL),(46488889,'Mariano','Perez','2006-04-24','Vilcapugio 93','Activo',40147852,NULL),(46491016,'Julián','Banegas','2006-04-24','Calle 6','Activo',32000141,2025);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capacitacion`
--

DROP TABLE IF EXISTS `capacitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capacitacion` (
  `id_capacitacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `fecha` date DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_capacitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capacitacion`
--

LOCK TABLES `capacitacion` WRITE;
/*!40000 ALTER TABLE `capacitacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `capacitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplina`
--

DROP TABLE IF EXISTS `disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disciplina` (
  `id_disciplina` int NOT NULL AUTO_INCREMENT,
  `disciplina` varchar(50) NOT NULL,
  PRIMARY KEY (`id_disciplina`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplina`
--

LOCK TABLES `disciplina` WRITE;
/*!40000 ALTER TABLE `disciplina` DISABLE KEYS */;
INSERT INTO `disciplina` VALUES (1,'Fútbol'),(2,'Basquet'),(3,'Natación');
/*!40000 ALTER TABLE `disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `dni_emp` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`dni_emp`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ent_disc_esc_per`
--

DROP TABLE IF EXISTS `ent_disc_esc_per`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ent_disc_esc_per` (
  `dni_ent` int DEFAULT NULL,
  `id_disciplina` int DEFAULT NULL,
  `id_esc` int DEFAULT NULL,
  `id_periodo` int DEFAULT NULL,
  KEY `dni_ent` (`dni_ent`),
  KEY `id_disciplina` (`id_disciplina`),
  KEY `id_esc` (`id_esc`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `ent_disc_esc_per_ibfk_1` FOREIGN KEY (`dni_ent`) REFERENCES `entrenador` (`dni_ent`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ent_disc_esc_per_ibfk_2` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ent_disc_esc_per_ibfk_3` FOREIGN KEY (`id_esc`) REFERENCES `escuela` (`id_esc`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ent_disc_esc_per_ibfk_4` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ent_disc_esc_per`
--

LOCK TABLES `ent_disc_esc_per` WRITE;
/*!40000 ALTER TABLE `ent_disc_esc_per` DISABLE KEYS */;
/*!40000 ALTER TABLE `ent_disc_esc_per` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrenador`
--

DROP TABLE IF EXISTS `entrenador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrenador` (
  `dni_ent` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`dni_ent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrenador`
--

LOCK TABLES `entrenador` WRITE;
/*!40000 ALTER TABLE `entrenador` DISABLE KEYS */;
INSERT INTO `entrenador` VALUES (32401210,'Carlos','López','Av. Central 45','carlos.lopez@hotmail.com','3855102214',NULL);
/*!40000 ALTER TABLE `entrenador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escuela`
--

DROP TABLE IF EXISTS `escuela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escuela` (
  `id_esc` int NOT NULL AUTO_INCREMENT,
  `nombre_esc` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  `localidad` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_esc`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escuela`
--

LOCK TABLES `escuela` WRITE;
/*!40000 ALTER TABLE `escuela` DISABLE KEYS */;
INSERT INTO `escuela` VALUES (1,'Escuela Deportiva Central','deportiva_central@gmail.com','3854778854',NULL,'Santiago del Estero','Ruta 9 km 1200','Activa',2),(2,'Escuela Amigos Quimilí','amigosquimili@gmail.com','3854598352',NULL,'Quimilí','Las Heras 1287','Activa',3);
/*!40000 ALTER TABLE `escuela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripcion`
--

DROP TABLE IF EXISTS `inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripcion` (
  `dni_alumno` int NOT NULL,
  `id_esc` int NOT NULL,
  PRIMARY KEY (`dni_alumno`,`id_esc`),
  KEY `id_esc` (`id_esc`),
  CONSTRAINT `inscripcion_ibfk_1` FOREIGN KEY (`dni_alumno`) REFERENCES `alumno` (`dni_alumno`) ON DELETE CASCADE,
  CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`id_esc`) REFERENCES `escuela` (`id_esc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripcion`
--

LOCK TABLES `inscripcion` WRITE;
/*!40000 ALTER TABLE `inscripcion` DISABLE KEYS */;
INSERT INTO `inscripcion` VALUES (42216020,1),(45958733,1),(46488889,1);
/*!40000 ALTER TABLE `inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participacion`
--

DROP TABLE IF EXISTS `participacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participacion` (
  `dni_ent` int NOT NULL,
  `id_capacitacion` int NOT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `fecha_participacion` date DEFAULT NULL,
  PRIMARY KEY (`dni_ent`,`id_capacitacion`),
  KEY `id_capacitacion` (`id_capacitacion`),
  CONSTRAINT `participacion_ibfk_1` FOREIGN KEY (`dni_ent`) REFERENCES `entrenador` (`dni_ent`) ON DELETE CASCADE,
  CONSTRAINT `participacion_ibfk_2` FOREIGN KEY (`id_capacitacion`) REFERENCES `capacitacion` (`id_capacitacion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participacion`
--

LOCK TABLES `participacion` WRITE;
/*!40000 ALTER TABLE `participacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `participacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo`
--

DROP TABLE IF EXISTS `periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo` (
  `id_periodo` int NOT NULL,
  PRIMARY KEY (`id_periodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (2024),(2025);
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsable` (
  `dni_resp` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`dni_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
/*!40000 ALTER TABLE `responsable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudes` (
  `id_solicitud` int NOT NULL AUTO_INCREMENT,
  `id_esc` int NOT NULL,
  `estado` enum('Pendiente','Aprobada') DEFAULT 'Pendiente',
  PRIMARY KEY (`id_solicitud`),
  KEY `id_esc` (`id_esc`),
  CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_esc`) REFERENCES `escuela` (`id_esc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
INSERT INTO `solicitudes` VALUES (2,2,'Pendiente'),(3,1,'Aprobada');
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `dni_tutor` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`dni_tutor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (17885474,'Alejandro','Venier','Achaval 300','alejandro@gmail.com','3855124578',NULL),(32000141,'Lorena','Paez','Calle 6','lorenapaez@gmail.com','3855632544',NULL),(32852014,'Gustavo','Schuldt','Oreste 23','gustavito@gmail.com','3856968574',NULL),(36221454,'Mauricio','Ibañez','Belgrano 123','mauripiola@gmail.com','3854201025',NULL),(40147852,'Iris','Ledesma','Vilcapugio','irisita@gmail.com','3854214574',NULL);
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `rol` enum('admin','escuela') DEFAULT 'escuela',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `contraseña` (`contraseña`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'secretariadeportes','redepse@gmail.com','admin123','admin'),(2,'deportivacentral','deportiva_central@gmail.com','depc123','escuela'),(3,'amigosquimili','amigosquimili@gmail.com','amquim2025','escuela');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-27  6:28:17
