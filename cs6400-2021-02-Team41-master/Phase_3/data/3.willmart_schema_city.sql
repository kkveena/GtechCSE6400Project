CREATE DATABASE  IF NOT EXISTS `willmart_schema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `willmart_schema`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: willmart_schema
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_name` varchar(250) NOT NULL,
  `state_name` varchar(250) NOT NULL,
  `population` int DEFAULT NULL,
  PRIMARY KEY (`city_name`,`state_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES ('Akron','MO',7684915),('Akron','OH',5947796),('Akron','RI',3878285),('Albuquerque','NV',3608365),('Albuquerque','OR',6610173),('Albuquerque','WV',4126810),('Anaheim','CA',6607294),('Anaheim','HI',2075107),('Anaheim','KS',5697569),('Anchorage','FL',6784867),('Anchorage','MO',5670054),('Anchorage','MT',1817211),('Arlington','CA',186497),('Arlington','KS',8824634),('Arlington','WA',4590795),('Atlanta','AR',362177),('Atlanta','MN',9791703),('Atlanta','TX',5727249),('Aurora','NY',6387356),('Aurora','WA',6606856),('Austin','AR',11892016),('Austin','TX',2853640),('Austin','VT',8950617),('Bakersfield','CA',2040079),('Bakersfield','KS',7086815),('Baltimore','NC',3909086),('Baltimore','VT',4944371),('Baltimore','WY',3411447),('Baton Rouge','AZ',8041780),('Baton Rouge','DE',982389),('Baton Rouge','GA',1189996),('Birmingham','TX',6323271),('Birmingham','VT',7239195),('Birmingham','WY',6407747),('Boston','CO',11235916),('Boston','NV',9761036),('Boston','WV',2211765),('Buffalo','AL',6568145),('Buffalo','IA',9513968),('Charlotte','CA',1055095),('Charlotte','NY',7082890),('Charlotte','WA',11640843),('Chicago','MI',2519487),('Chicago','NH',7223750),('Chula Vista','CA',274492),('Cincinnati','CO',5894247),('Cincinnati','MA',474864),('Cincinnati','WV',5880905),('Cleveland','CT',5507665),('Cleveland','IL',9953124),('Cleveland','OK',10747084),('Colorado','AZ',2409313),('Colorado','DE',4478196),('Colorado','MD',8013845),('Columbus','ID',2217539),('Columbus','IL',970026),('Corpus Christi','IN',7798000),('Corpus Christi','LA',11913487),('Corpus Christi','NE',7966699),('Dallas','CT',8905844),('Dallas','OK',8015731),('Dallas','WI',1267701),('Dayton','IL',5242806),('Dayton','OK',7083222),('Denver','NV',8746205),('Denver','WV',11761169),('Des Moines','NC',11838579),('Des Moines','OH',221583),('Des Moines','RI',1615094),('Detroit','KY',6452123),('Detroit','MN',9377710),('Detroit','VA',5859113),('El Paso','FL',9857482),('El Paso','MO',8384616),('El Paso','OH',1609323),('Fort Wayne','AZ',6711652),('Fort Wayne','DE',5063405),('Fort Worth','CO',8277959),('Fort Worth','MA',2926957),('Fort Worth','UT',1067737),('Fremont','ID',4567408),('Fremont','PA',10148986),('Fresno','MA',8117),('Fresno','UT',10820299),('Garland','IA',526447),('Garland','SD',3528912),('Glendale','CT',6682429),('Glendale','WI',6186100),('Grand Rapids','FL',1293704),('Grand Rapids','MO',8303138),('Grand Rapids','OH',5388088),('Greensboro','MO',7616852),('Greensboro','OH',106999),('Greensboro','RI',8379650),('Harrisville','NY',604),('Hialeah','HI',6777174),('Hialeah','KS',9384901),('Hialeah','NM',6903443),('Honolulu','GA',11804872),('Honolulu','WI',3451405),('Houston','NJ',1247696),('Houston','OR',1117744),('Indianapolis','IN',5746277),('Indianapolis','MS',3631974),('Indianapolis','NE',11698053),('Jackson','AZ',11301894),('Jackson','MD',9028542),('Jacksonville','MI',10133769),('Jacksonville','NH',11372286),('Jacksonville','TN',6911804),('Jersey','NC',2058323),('Jersey','VT',3635902),('Jersey','WY',8629505),('Kansas','ME',10349326),('Kansas','MI',9927560),('Kansas','NH',11239032),('Las Vegas','AL',10190906),('Las Vegas','ME',4037431),('Las Vegas','NH',4891719),('Lincoln','AR',5878938),('Lincoln','MN',10497740),('Lincoln','TX',9334504),('Little Rock','AR',11344715),('Little Rock','MN',2785238),('Little Rock','VA',9000407),('Long Beach','MI',8263969),('Long Beach','TN',7359630),('Los Angeles','HI',9458934),('Los Angeles','KS',1020310),('Louisville','AK',9425982),('Louisville','ID',683604),('Louisville','PA',6144849),('Lubbock','ID',9938640),('Lubbock','IL',7457644),('Lubbock','PA',10361209),('Madison','IA',3809269),('Madison','SC',7693110),('Madison','SD',122326),('Memphis','FL',10955694),('Memphis','MT',6614192),('Mesa','AK',9259541),('Mesa','ND',3525057),('Miami','MT',2867463),('Miami','NY',893856),('Miami','WA',10058645),('Milwaukee','MT',8177407),('Milwaukee','NY',2446782),('Minneapolis','NJ',6588284),('Minneapolis','NV',1285783),('Minneapolis','OR',1559327),('Mobile','NC',655603),('Mobile','OH',9790261),('Mobile','RI',4854095),('Montgomery','KY',7420175),('Montgomery','SC',6239429),('Montgomery','VA',11172589),('Nashville','IN',6084440),('Nashville','LA',3985400),('Nashville','UT',9753958),('New Orleans','IN',10238768),('New Orleans','LA',6989138),('New York','AR',6259301),('New York','TX',2901954),('New York','VT',9681671),('Newark','DE',11606155),('Newark','GA',6254424),('Norfolk','FL',8985009),('Norfolk','MT',5256933),('Norfolk','NY',10795717),('Oakland','ME',7169735),('Oakland','NH',9444807),('Oklahoma','AK',9889246),('Oklahoma','ND',8640549),('Oklahoma','NM',6526590),('Omaha','AZ',1994293),('Omaha','MD',5500143),('Omaha','MS',7524170),('Philadelphia','FL',6389592),('Philadelphia','MO',3840977),('Phoenix','DE',164250),('Phoenix','GA',9021855),('Phoenix','WI',1105394),('Pittsburgh','CO',1709398),('Pittsburgh','WV',4898046),('Portland','IN',5932588),('Portland','NE',4812844),('Raleigh','NJ',1703543),('Raleigh','OR',339737),('Raleigh','TN',8307760),('Richmond','AK',6544852),('Richmond','ND',5705182),('Richmond','PA',9488065),('Riverside','NC',1681261),('Riverside','RI',8563087),('Riverside','WY',11949994),('Rochester','NV',7234299),('Rochester','OR',3486778),('Sacramento','CA',5513783),('Sacramento','WA',9567383),('San Antonio','MD',4968774),('San Antonio','MS',10495370),('San Diego','AL',194470),('San Diego','IA',817541),('San Diego','SD',6839401),('San Francisco','MD',7820706),('San Francisco','MS',2791355),('San Francisco','NE',8303440),('San Jose','AL',11877303),('San Jose','IA',7025397),('San Jose','ME',8713838),('Santa Ana','LA',7542170),('Santa Ana','UT',11641031),('Seattle','HI',6342350),('Seattle','ND',8919255),('Seattle','NM',4576392),('Shreveport','TX',6768568),('Shreveport','VT',7695528),('Shreveport','WY',2420369),('Spokane','NJ',636286),('Spokane','TN',4281152),('St. Louis','NC',7594582),('St. Louis','RI',595768),('St. Louis','WY',145689),('St. Paul','CT',5161245),('St. Paul','GA',4562887),('St. Paul','WI',11310912),('St. Petersburg','CT',4843309),('St. Petersburg','OK',5367444),('Stockton','ND',11526559),('Stockton','NM',8214688),('Tacoma','ID',4181984),('Tacoma','IL',10845187),('Tacoma','OK',6965826),('Tampa','MS',9296125),('Tampa','NE',8901528),('Toledo','KY',6662145),('Toledo','SC',7049801),('Toledo','SD',8377152),('Tucson','MI',8142328),('Tucson','NJ',2745552),('Tucson','TN',11958750),('Tulsa','HI',8783024),('Tulsa','NM',8908456),('Virginia Beach','CO',5821114),('Virginia Beach','MA',5134235),('Washington','AL',7089351),('Washington','ME',1384044),('Wichita','AK',6134430),('Wichita','PA',11803323),('Yonkers','LA',10868202),('Yonkers','MA',8672133),('Yonkers','UT',116283);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-18 22:20:52
