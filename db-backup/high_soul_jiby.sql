-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 20, 2015 at 06:33 PM
-- Server version: 5.5.41-0ubuntu0.12.04.1
-- PHP Version: 5.3.10-1ubuntu3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `high_soul`
--

-- --------------------------------------------------------

--
-- Table structure for table `AdminUser`
--

CREATE TABLE IF NOT EXISTS `AdminUser` (
  `AdminId` bigint(20) NOT NULL AUTO_INCREMENT,
  `Uname` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Role` tinyint(4) DEFAULT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `AddedDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `access_tocken` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AdminId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `AdminUser`
--

INSERT INTO `AdminUser` (`AdminId`, `Uname`, `Password`, `Email`, `Role`, `FullName`, `AddedDate`, `Status`, `access_tocken`) VALUES
(1, 'admin', '123', 'john@amazecodes.com', 1, 'Jiby John', '2014-10-04 00:00:00', 1, 'd7b0f982093f7185616808c619b39803'),
(2, 'kl', 'l', 'dsada@ewqer.com', 2, '', '2014-10-06 00:00:00', 0, NULL),
(7, 'fs', 'fs', 'dsadssa@ewqer.com', 2, '', '2014-10-06 00:00:00', 1, NULL),
(8, 'da', 'a', 'aaa@ewqer.com', 2, '', '2014-10-06 00:00:00', 1, 'd1df1dac28e0e7ae8a0d7b4db7143a69'),
(9, 'aszxc', 's', 'dsassda@ewqer.com', 2, '', '2014-10-06 00:00:00', 1, NULL),
(10, 'kaka', 'k', 'kkaka@asda.com', 2, '', '2014-10-17 00:00:00', 1, NULL),
(11, 'jijod', '123', 'jijo@inna.com', 2, '', '2014-10-17 00:00:00', 1, '1662490ec9c96ac39bd0d01e8cd0a79a'),
(12, 'sophia', 'sophia', 'sophiajose@gmail.com', 2, '', '2014-12-05 00:00:00', 0, '914cb1b388003955e641d3ae3baebbb6'),
(13, 'scafe11', 'scafe1', 'scafe1@test.coms', 2, '', '2014-12-07 00:00:00', 1, 'bfd7bf077e70584e0f276703da6f3b7e'),
(14, 'sanju', '123', 'samji@gmail.com', 2, '', '2014-12-09 00:00:00', 1, '1c3527338039d81cc6d236066fd68902'),
(15, 'john', '123', 'john@amazecodes.com', 2, '', '2014-12-10 00:00:00', 1, '8b519af2dfa3c5ab05aeb26231c51402'),
(16, 'sanju', 'sanju', 'sanju@gmail.com', 2, '', '2014-12-10 00:00:00', 1, '1c3527338039d81cc6d236066fd68902'),
(17, 'sophia', 'abc', 'sop@gmail.com', 2, '', '2014-12-17 00:00:00', 1, '914cb1b388003955e641d3ae3baebbb6'),
(18, 'rishon', '1234', 'rishon@gmail.com', 2, '', '2014-12-17 00:00:00', 1, 'e7ed449f2251da0892cbfa4a0971e88e'),
(19, 'manu', '123', 'manu.parvathy@gmail.com', 2, '', '2015-01-27 00:00:00', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `AlgorithamLogic`
--

CREATE TABLE IF NOT EXISTS `AlgorithamLogic` (
  `AlgorithamId` bigint(15) NOT NULL AUTO_INCREMENT,
  `QuestionId` bigint(15) DEFAULT NULL,
  `Row` bigint(20) DEFAULT NULL,
  `Col` bigint(20) DEFAULT NULL,
  `Value` varchar(250) DEFAULT NULL,
  `Formula` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`AlgorithamId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1589 ;

--
-- Dumping data for table `AlgorithamLogic`
--

INSERT INTO `AlgorithamLogic` (`AlgorithamId`, `QuestionId`, `Row`, `Col`, `Value`, `Formula`) VALUES
(1431, 55, 1, 1, '5', NULL),
(1432, 55, 1, 2, '4', NULL),
(1433, 55, 1, 3, '3', NULL),
(1434, 55, 1, 4, '2', NULL),
(1435, 55, 1, 5, '1', NULL),
(1436, 55, 2, 1, '4', NULL),
(1437, 55, 2, 2, '4', NULL),
(1438, 55, 2, 3, '3', NULL),
(1439, 55, 2, 4, '3', NULL),
(1440, 55, 2, 5, '1', NULL),
(1441, 55, 3, 1, '3', NULL),
(1442, 55, 3, 2, '3', NULL),
(1443, 55, 3, 3, '3', NULL),
(1444, 55, 3, 4, '2', NULL),
(1445, 55, 3, 5, '1', NULL),
(1446, 55, 4, 1, '2', NULL),
(1447, 55, 4, 2, '3', NULL),
(1448, 55, 4, 3, '2', NULL),
(1449, 55, 4, 4, '2', NULL),
(1450, 55, 4, 5, '1', NULL),
(1451, 55, 5, 1, '1', NULL),
(1452, 55, 5, 2, '1', NULL),
(1453, 55, 5, 3, '1', NULL),
(1454, 55, 5, 4, '1', NULL),
(1455, 55, 5, 5, '1', NULL),
(1464, 56, 1, 1, '5', NULL),
(1465, 56, 1, 2, '3', NULL),
(1466, 56, 2, 1, '3', NULL),
(1467, 56, 2, 2, '3', NULL),
(1468, 53, 146, 146, '5', NULL),
(1469, 53, 146, 147, '0', NULL),
(1470, 53, 146, 148, '0', NULL),
(1471, 53, 146, 149, '0', NULL),
(1472, 53, 146, 150, '0', NULL),
(1473, 53, 146, 151, '0', NULL),
(1474, 53, 146, 152, '0', NULL),
(1475, 53, 146, 153, '1', NULL),
(1476, 53, 146, 154, '0', NULL),
(1477, 53, 146, 155, '0', NULL),
(1478, 53, 146, 275, '0', NULL),
(1479, 53, 147, 146, '0', NULL),
(1480, 53, 147, 147, '5', NULL),
(1481, 53, 147, 148, '0', NULL),
(1482, 53, 147, 149, '0', NULL),
(1483, 53, 147, 150, '0', NULL),
(1484, 53, 147, 151, '0', NULL),
(1485, 53, 147, 152, '0', NULL),
(1486, 53, 147, 153, '1', NULL),
(1487, 53, 147, 154, '0', NULL),
(1488, 53, 147, 155, '0', NULL),
(1489, 53, 147, 275, '0', NULL),
(1490, 53, 148, 146, '0', NULL),
(1491, 53, 148, 147, '0', NULL),
(1492, 53, 148, 148, '5', NULL),
(1493, 53, 148, 149, '0', NULL),
(1494, 53, 148, 150, '0', NULL),
(1495, 53, 148, 151, '0', NULL),
(1496, 53, 148, 152, '0', NULL),
(1497, 53, 148, 153, '1', NULL),
(1498, 53, 148, 154, '3', NULL),
(1499, 53, 148, 155, '0', NULL),
(1500, 53, 148, 275, '0', NULL),
(1501, 53, 149, 146, '0', NULL),
(1502, 53, 149, 147, '0', NULL),
(1503, 53, 149, 148, '0', NULL),
(1504, 53, 149, 149, '5', NULL),
(1505, 53, 149, 150, '0', NULL),
(1506, 53, 149, 151, '0', NULL),
(1507, 53, 149, 152, '0', NULL),
(1508, 53, 149, 153, '1', NULL),
(1509, 53, 149, 154, '0', NULL),
(1510, 53, 149, 155, '0', NULL),
(1511, 53, 149, 275, '0', NULL),
(1512, 53, 150, 146, '0', NULL),
(1513, 53, 150, 147, '0', NULL),
(1514, 53, 150, 148, '0', NULL),
(1515, 53, 150, 149, '0', NULL),
(1516, 53, 150, 150, '5', NULL),
(1517, 53, 150, 151, '0', NULL),
(1518, 53, 150, 152, '0', NULL),
(1519, 53, 150, 153, '1', NULL),
(1520, 53, 150, 154, '0', NULL),
(1521, 53, 150, 155, '0', NULL),
(1522, 53, 150, 275, '0', NULL),
(1523, 53, 151, 146, '0', NULL),
(1524, 53, 151, 147, '0', NULL),
(1525, 53, 151, 148, '0', NULL),
(1526, 53, 151, 149, '0', NULL),
(1527, 53, 151, 150, '0', NULL),
(1528, 53, 151, 151, '5', NULL),
(1529, 53, 151, 152, '0', NULL),
(1530, 53, 151, 153, '1', NULL),
(1531, 53, 151, 154, '0', NULL),
(1532, 53, 151, 155, '0', NULL),
(1533, 53, 151, 275, '0', NULL),
(1534, 53, 152, 146, '0', NULL),
(1535, 53, 152, 147, '0', NULL),
(1536, 53, 152, 148, '0', NULL),
(1537, 53, 152, 149, '0', NULL),
(1538, 53, 152, 150, '0', NULL),
(1539, 53, 152, 151, '0', NULL),
(1540, 53, 152, 152, '5', NULL),
(1541, 53, 152, 153, '1', NULL),
(1542, 53, 152, 154, '0', NULL),
(1543, 53, 152, 155, '0', NULL),
(1544, 53, 152, 275, '0', NULL),
(1545, 53, 153, 146, '1', NULL),
(1546, 53, 153, 147, '1', NULL),
(1547, 53, 153, 148, '1', NULL),
(1548, 53, 153, 149, '1', NULL),
(1549, 53, 153, 150, '1', NULL),
(1550, 53, 153, 151, '1', NULL),
(1551, 53, 153, 152, '1', NULL),
(1552, 53, 153, 153, '5', NULL),
(1553, 53, 153, 154, '1', NULL),
(1554, 53, 153, 155, '3', NULL),
(1555, 53, 153, 275, '3', NULL),
(1556, 53, 154, 146, '0', NULL),
(1557, 53, 154, 147, '0', NULL),
(1558, 53, 154, 148, '3', NULL),
(1559, 53, 154, 149, '0', NULL),
(1560, 53, 154, 150, '0', NULL),
(1561, 53, 154, 151, '0', NULL),
(1562, 53, 154, 152, '0', NULL),
(1563, 53, 154, 153, '1', NULL),
(1564, 53, 154, 154, '5', NULL),
(1565, 53, 154, 155, '0', NULL),
(1566, 53, 154, 275, '0', NULL),
(1567, 53, 155, 146, '0', NULL),
(1568, 53, 155, 147, '0', NULL),
(1569, 53, 155, 148, '0', NULL),
(1570, 53, 155, 149, '0', NULL),
(1571, 53, 155, 150, '0', NULL),
(1572, 53, 155, 151, '0', NULL),
(1573, 53, 155, 152, '0', NULL),
(1574, 53, 155, 153, '3', NULL),
(1575, 53, 155, 154, '0', NULL),
(1576, 53, 155, 155, '5', NULL),
(1577, 53, 155, 275, '3', NULL),
(1578, 53, 275, 146, '0', NULL),
(1579, 53, 275, 147, '0', NULL),
(1580, 53, 275, 148, '0', NULL),
(1581, 53, 275, 149, '0', NULL),
(1582, 53, 275, 150, '0', NULL),
(1583, 53, 275, 151, '0', NULL),
(1584, 53, 275, 152, '0', NULL),
(1585, 53, 275, 153, '3', NULL),
(1586, 53, 275, 154, '1', NULL),
(1587, 53, 275, 155, '3', NULL),
(1588, 53, 275, 275, '5', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `AlgorithamProcessed`
--

CREATE TABLE IF NOT EXISTS `AlgorithamProcessed` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `AlgorithamProcessed`
--

INSERT INTO `AlgorithamProcessed` (`Id`, `UserId`, `DateAdded`) VALUES
(1, 1, '2015-02-20 06:32:52');

-- --------------------------------------------------------

--
-- Table structure for table `AlgorithamType`
--

CREATE TABLE IF NOT EXISTS `AlgorithamType` (
  `AlgTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `AlgTypeTitle` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`AlgTypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `AlgorithamType`
--

INSERT INTO `AlgorithamType` (`AlgTypeId`, `AlgTypeTitle`) VALUES
(1, 'Single selection matrix'),
(2, 'Multi selection order matrix'),
(3, 'Difference match formula'),
(4, 'Personality match'),
(5, 'Multi selection Intensity');

-- --------------------------------------------------------

--
-- Table structure for table `AlgPersonalityMatrix`
--

CREATE TABLE IF NOT EXISTS `AlgPersonalityMatrix` (
  `PId` int(11) NOT NULL AUTO_INCREMENT,
  `Row` varchar(11) DEFAULT NULL,
  `Col` varchar(11) DEFAULT NULL,
  `Value` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`PId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3585 ;

--
-- Dumping data for table `AlgPersonalityMatrix`
--

INSERT INTO `AlgPersonalityMatrix` (`PId`, `Row`, `Col`, `Value`) VALUES
(3329, 'INFP', 'INFP', '2'),
(3330, 'INFP', 'INFJ', '2'),
(3331, 'INFP', 'INTJ', '3'),
(3332, 'INFP', 'INTP', '3'),
(3333, 'INFP', 'ENFP', '1'),
(3334, 'INFP', 'ENFJ', '1'),
(3335, 'INFP', 'ENTJ', '3'),
(3336, 'INFP', 'ENTP', '3'),
(3337, 'INFP', 'ESFP', '3'),
(3338, 'INFP', 'ESFJ', '3'),
(3339, 'INFP', 'ESTJ', '3'),
(3340, 'INFP', 'ESTP', '3'),
(3341, 'INFP', 'ISFP', '3'),
(3342, 'INFP', 'ISFJ', '3'),
(3343, 'INFP', 'ISTJ', '3'),
(3344, 'INFP', 'ISTP', '3'),
(3345, 'INFJ', 'INFP', '2'),
(3346, 'INFJ', 'INFJ', '2'),
(3347, 'INFJ', 'INTJ', '1'),
(3348, 'INFJ', 'INTP', '3'),
(3349, 'INFJ', 'ENFP', '1'),
(3350, 'INFJ', 'ENFJ', '2'),
(3351, 'INFJ', 'ENTJ', '3'),
(3352, 'INFJ', 'ENTP', '1'),
(3353, 'INFJ', 'ESFP', '3'),
(3354, 'INFJ', 'ESFJ', '1'),
(3355, 'INFJ', 'ESTJ', '3'),
(3356, 'INFJ', 'ESTP', '3'),
(3357, 'INFJ', 'ISFP', '3'),
(3358, 'INFJ', 'ISFJ', '3'),
(3359, 'INFJ', 'ISTJ', '3'),
(3360, 'INFJ', 'ISTP', '3'),
(3361, 'INTJ', 'INFP', '1'),
(3362, 'INTJ', 'INFJ', '1'),
(3363, 'INTJ', 'INTJ', '2'),
(3364, 'INTJ', 'INTP', '2'),
(3365, 'INTJ', 'ENFP', '3'),
(3366, 'INTJ', 'ENFJ', '3'),
(3367, 'INTJ', 'ENTJ', '2'),
(3368, 'INTJ', 'ENTP', '1'),
(3369, 'INTJ', 'ESFP', '3'),
(3370, 'INTJ', 'ESFJ', '3'),
(3371, 'INTJ', 'ESTJ', '3'),
(3372, 'INTJ', 'ESTP', '3'),
(3373, 'INTJ', 'ISFP', '3'),
(3374, 'INTJ', 'ISFJ', '3'),
(3375, 'INTJ', 'ISTJ', '3'),
(3376, 'INTJ', 'ISTP', '3'),
(3377, 'INTP', 'INFP', '1'),
(3378, 'INTP', 'INFJ', '2'),
(3379, 'INTP', 'INTJ', '2'),
(3380, 'INTP', 'INTP', '2'),
(3381, 'INTP', 'ENFP', '2'),
(3382, 'INTP', 'ENFJ', '1'),
(3383, 'INTP', 'ENTJ', '1'),
(3384, 'INTP', 'ENTP', '1'),
(3385, 'INTP', 'ESFP', '3'),
(3386, 'INTP', 'ESFJ', '3'),
(3387, 'INTP', 'ESTJ', '3'),
(3388, 'INTP', 'ESTP', '3'),
(3389, 'INTP', 'ISFP', '3'),
(3390, 'INTP', 'ISFJ', '3'),
(3391, 'INTP', 'ISTJ', '3'),
(3392, 'INTP', 'ISTP', '3'),
(3393, 'ENFP', 'INFP', '1'),
(3394, 'ENFP', 'INFJ', '1'),
(3395, 'ENFP', 'INTJ', '1'),
(3396, 'ENFP', 'INTP', '1'),
(3397, 'ENFP', 'ENFP', '2'),
(3398, 'ENFP', 'ENFJ', '2'),
(3399, 'ENFP', 'ENTJ', '2'),
(3400, 'ENFP', 'ENTP', '2'),
(3401, 'ENFP', 'ESFP', '3'),
(3402, 'ENFP', 'ESFJ', '3'),
(3403, 'ENFP', 'ESTJ', '3'),
(3404, 'ENFP', 'ESTP', '3'),
(3405, 'ENFP', 'ISFP', '3'),
(3406, 'ENFP', 'ISFJ', '3'),
(3407, 'ENFP', 'ISTJ', '3'),
(3408, 'ENFP', 'ISTP', '3'),
(3409, 'ENFJ', 'INFP', '1'),
(3410, 'ENFJ', 'INFJ', '1'),
(3411, 'ENFJ', 'INTJ', '1'),
(3412, 'ENFJ', 'INTP', '1'),
(3413, 'ENFJ', 'ENFP', '2'),
(3414, 'ENFJ', 'ENFJ', '2'),
(3415, 'ENFJ', 'ENTJ', '2'),
(3416, 'ENFJ', 'ENTP', '2'),
(3417, 'ENFJ', 'ESFP', '3'),
(3418, 'ENFJ', 'ESFJ', '3'),
(3419, 'ENFJ', 'ESTJ', '3'),
(3420, 'ENFJ', 'ESTP', '3'),
(3421, 'ENFJ', 'ISFP', '3'),
(3422, 'ENFJ', 'ISFJ', '3'),
(3423, 'ENFJ', 'ISTJ', '3'),
(3424, 'ENFJ', 'ISTP', '3'),
(3425, 'ENTJ', 'INFP', '1'),
(3426, 'ENTJ', 'INFJ', '1'),
(3427, 'ENTJ', 'INTJ', '1'),
(3428, 'ENTJ', 'INTP', '1'),
(3429, 'ENTJ', 'ENFP', '2'),
(3430, 'ENTJ', 'ENFJ', '2'),
(3431, 'ENTJ', 'ENTJ', '2'),
(3432, 'ENTJ', 'ENTP', '2'),
(3433, 'ENTJ', 'ESFP', '3'),
(3434, 'ENTJ', 'ESFJ', '3'),
(3435, 'ENTJ', 'ESTJ', '3'),
(3436, 'ENTJ', 'ESTP', '3'),
(3437, 'ENTJ', 'ISFP', '3'),
(3438, 'ENTJ', 'ISFJ', '3'),
(3439, 'ENTJ', 'ISTJ', '3'),
(3440, 'ENTJ', 'ISTP', '3'),
(3441, 'ENTP', 'INFP', '1'),
(3442, 'ENTP', 'INFJ', '1'),
(3443, 'ENTP', 'INTJ', '1'),
(3444, 'ENTP', 'INTP', '1'),
(3445, 'ENTP', 'ENFP', '2'),
(3446, 'ENTP', 'ENFJ', '2'),
(3447, 'ENTP', 'ENTJ', '2'),
(3448, 'ENTP', 'ENTP', '2'),
(3449, 'ENTP', 'ESFP', '3'),
(3450, 'ENTP', 'ESFJ', '3'),
(3451, 'ENTP', 'ESTJ', '3'),
(3452, 'ENTP', 'ESTP', '3'),
(3453, 'ENTP', 'ISFP', '3'),
(3454, 'ENTP', 'ISFJ', '3'),
(3455, 'ENTP', 'ISTJ', '3'),
(3456, 'ENTP', 'ISTP', '3'),
(3457, 'ESFP', 'INFP', '3'),
(3458, 'ESFP', 'INFJ', '3'),
(3459, 'ESFP', 'INTJ', '3'),
(3460, 'ESFP', 'INTP', '3'),
(3461, 'ESFP', 'ENFP', '3'),
(3462, 'ESFP', 'ENFJ', '3'),
(3463, 'ESFP', 'ENTJ', '3'),
(3464, 'ESFP', 'ENTP', '3'),
(3465, 'ESFP', 'ESFP', '2'),
(3466, 'ESFP', 'ESFJ', '2'),
(3467, 'ESFP', 'ESTJ', '2'),
(3468, 'ESFP', 'ESTP', '2'),
(3469, 'ESFP', 'ISFP', '1'),
(3470, 'ESFP', 'ISFJ', '1'),
(3471, 'ESFP', 'ISTJ', '2'),
(3472, 'ESFP', 'ISTP', '1'),
(3473, 'ESFJ', 'INFP', '3'),
(3474, 'ESFJ', 'INFJ', '3'),
(3475, 'ESFJ', 'INTJ', '3'),
(3476, 'ESFJ', 'INTP', '3'),
(3477, 'ESFJ', 'ENFP', '3'),
(3478, 'ESFJ', 'ENFJ', '3'),
(3479, 'ESFJ', 'ENTJ', '3'),
(3480, 'ESFJ', 'ENTP', '3'),
(3481, 'ESFJ', 'ESFP', '2'),
(3482, 'ESFJ', 'ESFJ', '2'),
(3483, 'ESFJ', 'ESTJ', '2'),
(3484, 'ESFJ', 'ESTP', '2'),
(3485, 'ESFJ', 'ISFP', '1'),
(3486, 'ESFJ', 'ISFJ', '1'),
(3487, 'ESFJ', 'ISTJ', '1'),
(3488, 'ESFJ', 'ISTP', '1'),
(3489, 'ESTJ', 'INFP', '3'),
(3490, 'ESTJ', 'INFJ', '3'),
(3491, 'ESTJ', 'INTJ', '3'),
(3492, 'ESTJ', 'INTP', '3'),
(3493, 'ESTJ', 'ENFP', '3'),
(3494, 'ESTJ', 'ENFJ', '3'),
(3495, 'ESTJ', 'ENTJ', '3'),
(3496, 'ESTJ', 'ENTP', '3'),
(3497, 'ESTJ', 'ESFP', '2'),
(3498, 'ESTJ', 'ESFJ', '2'),
(3499, 'ESTJ', 'ESTJ', '2'),
(3500, 'ESTJ', 'ESTP', '2'),
(3501, 'ESTJ', 'ISFP', '1'),
(3502, 'ESTJ', 'ISFJ', '1'),
(3503, 'ESTJ', 'ISTJ', '1'),
(3504, 'ESTJ', 'ISTP', '1'),
(3505, 'ESTP', 'INFP', '3'),
(3506, 'ESTP', 'INFJ', '3'),
(3507, 'ESTP', 'INTJ', '3'),
(3508, 'ESTP', 'INTP', '3'),
(3509, 'ESTP', 'ENFP', '3'),
(3510, 'ESTP', 'ENFJ', '3'),
(3511, 'ESTP', 'ENTJ', '3'),
(3512, 'ESTP', 'ENTP', '3'),
(3513, 'ESTP', 'ESFP', '2'),
(3514, 'ESTP', 'ESFJ', '2'),
(3515, 'ESTP', 'ESTJ', '2'),
(3516, 'ESTP', 'ESTP', '2'),
(3517, 'ESTP', 'ISFP', '1'),
(3518, 'ESTP', 'ISFJ', '1'),
(3519, 'ESTP', 'ISTJ', '1'),
(3520, 'ESTP', 'ISTP', '1'),
(3521, 'ISFP', 'INFP', '3'),
(3522, 'ISFP', 'INFJ', '3'),
(3523, 'ISFP', 'INTJ', '3'),
(3524, 'ISFP', 'INTP', '3'),
(3525, 'ISFP', 'ENFP', '3'),
(3526, 'ISFP', 'ENFJ', '3'),
(3527, 'ISFP', 'ENTJ', '3'),
(3528, 'ISFP', 'ENTP', '3'),
(3529, 'ISFP', 'ESFP', '1'),
(3530, 'ISFP', 'ESFJ', '1'),
(3531, 'ISFP', 'ESTJ', '1'),
(3532, 'ISFP', 'ESTP', '1'),
(3533, 'ISFP', 'ISFP', '2'),
(3534, 'ISFP', 'ISFJ', '2'),
(3535, 'ISFP', 'ISTJ', '2'),
(3536, 'ISFP', 'ISTP', '2'),
(3537, 'ISFJ', 'INFP', '3'),
(3538, 'ISFJ', 'INFJ', '3'),
(3539, 'ISFJ', 'INTJ', '3'),
(3540, 'ISFJ', 'INTP', '3'),
(3541, 'ISFJ', 'ENFP', '3'),
(3542, 'ISFJ', 'ENFJ', '3'),
(3543, 'ISFJ', 'ENTJ', '3'),
(3544, 'ISFJ', 'ENTP', '3'),
(3545, 'ISFJ', 'ESFP', '1'),
(3546, 'ISFJ', 'ESFJ', '1'),
(3547, 'ISFJ', 'ESTJ', '1'),
(3548, 'ISFJ', 'ESTP', '1'),
(3549, 'ISFJ', 'ISFP', '2'),
(3550, 'ISFJ', 'ISFJ', '2'),
(3551, 'ISFJ', 'ISTJ', '2'),
(3552, 'ISFJ', 'ISTP', '2'),
(3553, 'ISTJ', 'INFP', '3'),
(3554, 'ISTJ', 'INFJ', '3'),
(3555, 'ISTJ', 'INTJ', '3'),
(3556, 'ISTJ', 'INTP', '3'),
(3557, 'ISTJ', 'ENFP', '3'),
(3558, 'ISTJ', 'ENFJ', '3'),
(3559, 'ISTJ', 'ENTJ', '3'),
(3560, 'ISTJ', 'ENTP', '3'),
(3561, 'ISTJ', 'ESFP', '1'),
(3562, 'ISTJ', 'ESFJ', '1'),
(3563, 'ISTJ', 'ESTJ', '1'),
(3564, 'ISTJ', 'ESTP', '1'),
(3565, 'ISTJ', 'ISFP', '2'),
(3566, 'ISTJ', 'ISFJ', '2'),
(3567, 'ISTJ', 'ISTJ', '2'),
(3568, 'ISTJ', 'ISTP', '2'),
(3569, 'ISTP', 'INFP', '3'),
(3570, 'ISTP', 'INFJ', '3'),
(3571, 'ISTP', 'INTJ', '3'),
(3572, 'ISTP', 'INTP', '3'),
(3573, 'ISTP', 'ENFP', '3'),
(3574, 'ISTP', 'ENFJ', '3'),
(3575, 'ISTP', 'ENTJ', '3'),
(3576, 'ISTP', 'ENTP', '3'),
(3577, 'ISTP', 'ESFP', '1'),
(3578, 'ISTP', 'ESFJ', '1'),
(3579, 'ISTP', 'ESTJ', '1'),
(3580, 'ISTP', 'ESTP', '1'),
(3581, 'ISTP', 'ISFP', '2'),
(3582, 'ISTP', 'ISFJ', '2'),
(3583, 'ISTP', 'ISTJ', '2'),
(3584, 'ISTP', 'ISTP', '1');

-- --------------------------------------------------------

--
-- Table structure for table `AnswerType`
--

CREATE TABLE IF NOT EXISTS `AnswerType` (
  `QuestionTypeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `QuestionTypeTitle` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`QuestionTypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `AnswerType`
--

INSERT INTO `AnswerType` (`QuestionTypeId`, `QuestionTypeTitle`) VALUES
(1, 'Single Selection'),
(2, 'Multiple Selection Intensity'),
(3, 'Multiple Selection Ordering');

-- --------------------------------------------------------

--
-- Table structure for table `Buddies`
--

CREATE TABLE IF NOT EXISTS `Buddies` (
  `Id` bigint(15) NOT NULL AUTO_INCREMENT,
  `SenderId` bigint(15) DEFAULT NULL,
  `BuddyId` bigint(15) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL COMMENT '(0 - Pending, 1- Approved)',
  `AddedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ContactUs`
--

CREATE TABLE IF NOT EXISTS `ContactUs` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Number` varchar(50) DEFAULT NULL,
  `RequestType` varchar(250) DEFAULT NULL,
  `Message` text,
  `AddedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoard`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoard` (
  `DiscussionBoardId` int(11) NOT NULL AUTO_INCREMENT,
  `Topic` varchar(5000) DEFAULT NULL,
  `Description` text,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `ApprovalStatus` varchar(10) DEFAULT NULL,
  `ModeratorComments` varchar(5000) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `ModifiedBy` int(11) DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT '1' COMMENT '(0- Disabled, 1- Active)',
  `Restricted` tinyint(4) DEFAULT NULL COMMENT '(0- No restriction, 1- Restricted)',
  `RestrictedGender` varchar(10) DEFAULT NULL,
  `RestrictedAge` int(5) DEFAULT NULL,
  `RestrictedLocation` varchar(100) DEFAULT NULL,
  `Image` varchar(250) DEFAULT NULL,
  `userRequest` int(11) DEFAULT '0',
  PRIMARY KEY (`DiscussionBoardId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardAbuse`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardAbuse` (
  `CommentId` int(11) DEFAULT NULL,
  `ReportedBy` int(11) DEFAULT NULL,
  `Comments` varchar(5000) DEFAULT NULL,
  `ReportedDate` datetime DEFAULT NULL,
  `Status` int(11) NOT NULL,
  `Spam` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardComments`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardComments` (
  `CommentId` int(11) NOT NULL AUTO_INCREMENT,
  `DiscussionTopicId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `SeqNo` int(11) DEFAULT NULL,
  `Comment` varchar(5000) DEFAULT NULL,
  `CommentDateTime` datetime DEFAULT NULL,
  `IsValid` tinyint(4) DEFAULT NULL,
  `profane` tinyint(4) DEFAULT '0' COMMENT '(0-not profane, 1-profane)',
  PRIMARY KEY (`CommentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardTopic`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardTopic` (
  `DiscussionTopicId` int(11) NOT NULL AUTO_INCREMENT,
  `DiscussionBoardId` int(11) NOT NULL,
  `TopicTitle` varchar(250) DEFAULT NULL,
  `TopicDescription` text,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL COMMENT '(0 - Pending, 1-Active)',
  `rating` int(11) NOT NULL,
  `createdStatus` int(11) DEFAULT '0' COMMENT '(0-admin,1-user)',
  PRIMARY KEY (`DiscussionTopicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardUsers`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardUsers` (
  `DiscussionBoardUsersId` int(11) NOT NULL AUTO_INCREMENT,
  `DiscussionBoardId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `JoinedDate` datetime DEFAULT NULL,
  `Status` bit(4) DEFAULT NULL,
  PRIMARY KEY (`DiscussionBoardUsersId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBorardLikes`
--

CREATE TABLE IF NOT EXISTS `DiscussionBorardLikes` (
  `CommentId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `LikeDateTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ForumNotification`
--

CREATE TABLE IF NOT EXISTS `ForumNotification` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserId` bigint(20) DEFAULT NULL,
  `Message` text,
  `ViewStatus` tinyint(4) DEFAULT NULL COMMENT '(0 - New, 1 - Viewed)',
  `AddedDate` datetime DEFAULT NULL,
  `Link` varchar(250) DEFAULT NULL,
  `CommentId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE IF NOT EXISTS `Likes` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `Text` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE IF NOT EXISTS `Messages` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `SenderId` bigint(20) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `Message` text,
  `AddedDate` datetime DEFAULT NULL,
  `ViewStatus` tinyint(4) DEFAULT NULL COMMENT '(0 - New, 1 - Viewed)',
  `Link` varchar(250) DEFAULT NULL,
  `SpecialMessage` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Permissions`
--

CREATE TABLE IF NOT EXISTS `Permissions` (
  `PermissionID` bigint(15) NOT NULL AUTO_INCREMENT,
  `ModuleName` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`PermissionID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Permissions`
--

INSERT INTO `Permissions` (`PermissionID`, `ModuleName`) VALUES
(1, 'Forum');

-- --------------------------------------------------------

--
-- Table structure for table `ProfessionalDetails`
--

CREATE TABLE IF NOT EXISTS `ProfessionalDetails` (
  `UserId` int(11) DEFAULT NULL,
  `CurrentEmployment` varchar(200) DEFAULT NULL,
  `CurrentRole` varchar(500) DEFAULT NULL,
  `HighestEducation` varchar(200) DEFAULT NULL,
  `Endorsedskills` varchar(500) DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  `ProfileUrl` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Questionnaire`
--

CREATE TABLE IF NOT EXISTS `Questionnaire` (
  `Qid` bigint(15) NOT NULL AUTO_INCREMENT,
  `QuestionTitle` text,
  `Description` text,
  `AnswerSelectionType` bigint(15) DEFAULT NULL,
  `Sequence` bigint(15) DEFAULT NULL,
  `QuestionCategory` bigint(15) DEFAULT NULL,
  `AlgorithamType` int(10) DEFAULT NULL,
  `MaxOptions` int(10) DEFAULT NULL,
  `MaxScore` int(10) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL,
  PRIMARY KEY (`Qid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=72 ;

--
-- Dumping data for table `Questionnaire`
--

INSERT INTO `Questionnaire` (`Qid`, `QuestionTitle`, `Description`, `AnswerSelectionType`, `Sequence`, `QuestionCategory`, `AlgorithamType`, `MaxOptions`, `MaxScore`, `DateAdded`) VALUES
(53, 'What''s your current belief system?', NULL, 1, 2, 5, 1, 0, 5, '2014-11-18 03:30:36'),
(54, 'How important is your belief system to you?', 'How important is the criteria when it comes to deciding a long term partner', 1, 3, 5, 3, 0, 5, '2014-11-18 03:34:54'),
(55, 'Select the Top 5 Life Values that''s matters most to you in the order of its significance.', 'This is not about what others think who you are but what intrinsically matters most to you. So take the time to ponder and choose.', 3, 0, 4, 2, 5, 15, '2014-11-18 04:24:52'),
(56, 'The top 2 languages you are most comfortable with', '', 3, 1, 2, 2, 2, 8, '2014-11-18 04:45:24'),
(57, 'Tell us about your key interest that you love doing and the mark the level of interest for each.', NULL, 2, 16, 1, 5, 5, 5, '2014-11-18 04:52:06'),
(58, 'It''s Friday night and your friends just cancelled on you. You:', NULL, 1, 7, 7, 4, 0, NULL, '2014-11-18 05:10:07'),
(59, 'At a party you', NULL, 1, 8, 7, 4, 0, NULL, '2014-11-18 05:11:13'),
(60, 'You have a', NULL, 1, 9, 7, 4, 0, NULL, '2014-11-18 05:12:25'),
(61, 'In general you possess more of', NULL, 1, 10, 8, 4, 0, NULL, '2014-11-18 05:14:50'),
(62, 'At work you prefer to', NULL, 1, 11, 8, 4, 0, NULL, '2014-11-18 05:16:12'),
(63, 'You need to write a report with an outline. How do you go about it?', NULL, 1, 12, 8, 4, 0, NULL, '2014-11-18 05:21:13'),
(64, 'You are mostly considered as', NULL, 1, 13, 9, 4, 0, NULL, '2014-11-18 05:24:49'),
(65, 'You would', NULL, 1, 14, 9, 4, 0, NULL, '2014-11-18 05:27:21'),
(66, 'You would refrain from telling something from someone if you know it would hurt them', NULL, 1, 15, 9, 4, 0, NULL, '2014-11-18 05:29:06'),
(67, 'You would mostly prefer to', NULL, 1, 4, 10, 4, 0, NULL, '2014-11-18 05:33:18'),
(68, 'When I make a decision or draw a conclusion it is often tentative. I am fine changing my mind or taking a different direction.', NULL, 1, 5, 10, 4, 0, NULL, '2014-11-18 05:36:06'),
(69, 'You feel completely in control when your calendar', NULL, 1, 6, 10, 4, 0, NULL, '2014-11-18 05:38:07');

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireAnswer`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireAnswer` (
  `AnsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `QId` bigint(20) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `OptionId` bigint(20) DEFAULT NULL,
  `RankScale` int(11) DEFAULT NULL,
  PRIMARY KEY (`AnsId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `QuestionnaireAnswer`
--

INSERT INTO `QuestionnaireAnswer` (`AnsId`, `QId`, `UserId`, `OptionId`, `RankScale`) VALUES
(1, 55, 1, 161, 2),
(2, 55, 1, 162, 1),
(3, 55, 1, 163, 3),
(4, 55, 1, 164, 4),
(5, 55, 1, 166, 5),
(6, 56, 1, 171, 1),
(7, 56, 1, 176, 2),
(8, 53, 1, 147, NULL),
(9, 54, 1, 156, NULL),
(10, 67, 1, 213, NULL),
(11, 68, 1, 215, NULL),
(12, 69, 1, 216, NULL),
(13, 58, 1, 195, NULL),
(14, 59, 1, 196, NULL),
(15, 60, 1, 199, NULL),
(16, 61, 1, 200, NULL),
(17, 62, 1, 203, NULL),
(18, 63, 1, 204, NULL),
(19, 64, 1, 207, NULL),
(20, 65, 1, 208, NULL),
(21, 66, 1, 211, NULL),
(22, 57, 1, 182, 3),
(23, 57, 1, 183, 3),
(24, 57, 1, 184, 2),
(25, 57, 1, 185, 2),
(26, 57, 1, 188, 2);

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireAnswertemp`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireAnswertemp` (
  `AnsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `QId` bigint(20) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `OptionId` bigint(20) DEFAULT NULL,
  `RankScale` int(11) DEFAULT NULL,
  PRIMARY KEY (`AnsId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireCategory`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireCategory` (
  `QcId` bigint(20) NOT NULL AUTO_INCREMENT,
  `Category` varchar(250) DEFAULT NULL,
  `Weight` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`QcId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `QuestionnaireCategory`
--

INSERT INTO `QuestionnaireCategory` (`QcId`, `Category`, `Weight`) VALUES
(1, 'Interest Compatibility', '1'),
(2, 'Language Compatibility', '1'),
(4, 'Life Value compatibility', '1'),
(5, 'Belief compatibility', '1'),
(6, 'General Details', NULL),
(7, 'Personality-IE Compatibility', NULL),
(8, 'Personality-NS compatibility', NULL),
(9, 'Personality-TF compatibility', NULL),
(10, 'Personality-JP Compatibility', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireOptions`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireOptions` (
  `QoId` int(11) NOT NULL AUTO_INCREMENT,
  `QId` int(11) DEFAULT NULL,
  `Answer` varchar(250) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL,
  `PersonalityType` varchar(15) DEFAULT NULL,
  `Weight` int(11) DEFAULT NULL,
  PRIMARY KEY (`QoId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=303 ;

--
-- Dumping data for table `QuestionnaireOptions`
--

INSERT INTO `QuestionnaireOptions` (`QoId`, `QId`, `Answer`, `Order`, `PersonalityType`, `Weight`) VALUES
(146, 53, 'Hinduism', NULL, NULL, NULL),
(147, 53, 'Christianity', NULL, NULL, NULL),
(148, 53, 'Islam', NULL, NULL, NULL),
(149, 53, 'Sikhism', NULL, NULL, NULL),
(150, 53, 'Jainism', NULL, NULL, NULL),
(151, 53, 'Buddhism', NULL, NULL, NULL),
(152, 53, 'Zoroastrianism', NULL, NULL, NULL),
(153, 53, 'Humanism', NULL, NULL, NULL),
(154, 53, 'Sufism', NULL, NULL, NULL),
(155, 53, 'Atheist', NULL, NULL, NULL),
(156, 54, '1- Not Important', NULL, NULL, 1),
(157, 54, '2- Very Little Important', NULL, NULL, 2),
(158, 54, '3- Somewhat Important', NULL, NULL, 3),
(159, 54, '4- Important', NULL, NULL, 4),
(160, 54, '5 - Very Important', NULL, NULL, 5),
(161, 55, 'Integrity', NULL, NULL, NULL),
(162, 55, 'Growth/Success', NULL, NULL, NULL),
(163, 55, 'Adventure', NULL, NULL, NULL),
(164, 55, 'Creativity', NULL, NULL, NULL),
(165, 55, 'Love and Relations', NULL, NULL, NULL),
(166, 55, 'Social/Community Service', NULL, NULL, NULL),
(167, 55, 'Intellectual Growth', NULL, NULL, NULL),
(168, 55, 'Materialistic Growth', NULL, NULL, NULL),
(169, 55, 'Power & Influence', NULL, NULL, NULL),
(170, 55, 'Social Recognition', NULL, NULL, NULL),
(171, 56, 'English', NULL, NULL, NULL),
(172, 56, 'Hindi', NULL, NULL, NULL),
(173, 56, 'Marathi', NULL, NULL, NULL),
(174, 56, 'Kannada', NULL, NULL, NULL),
(175, 56, 'Punjabi', NULL, NULL, NULL),
(176, 56, 'Malayalam', NULL, NULL, NULL),
(177, 56, 'Bengali', NULL, NULL, NULL),
(178, 56, 'Telugu', NULL, NULL, NULL),
(179, 56, 'Tamil', NULL, NULL, NULL),
(180, 56, 'Odiya', NULL, NULL, NULL),
(182, 57, 'Travel', NULL, NULL, NULL),
(183, 57, 'Hiking/Trekking', NULL, NULL, NULL),
(184, 57, 'Photography', NULL, NULL, NULL),
(185, 57, 'Movies', NULL, NULL, NULL),
(186, 57, 'Music', NULL, NULL, NULL),
(187, 57, 'Reading', NULL, NULL, NULL),
(188, 57, 'Cricket', NULL, NULL, NULL),
(189, 57, 'Dance/Choreography', NULL, NULL, NULL),
(190, 57, 'Art/Paintings', NULL, NULL, NULL),
(191, 57, 'Poetry', NULL, NULL, NULL),
(192, 57, 'Theater/Drama', NULL, NULL, NULL),
(193, 57, 'Cycling', NULL, NULL, NULL),
(194, 58, 'find another group of friends to hang out', NULL, 'E', NULL),
(195, 58, 'spend some quality time on your own', NULL, 'I', NULL),
(196, 59, 'wait to be approached', NULL, 'I', NULL),
(197, 59, 'approach a group of strangers', NULL, 'E', NULL),
(198, 60, 'large network of friends and aquaintance', NULL, 'E', NULL),
(199, 60, 'fairly smaller network of close friends', NULL, 'I', NULL),
(200, 61, 'good memory and observation skills', NULL, 'S', NULL),
(201, 61, 'inspirations and ideas for future', NULL, 'N', NULL),
(202, 62, 'strategizing and designing a plan', NULL, 'N', NULL),
(203, 62, 'implementing and executing a plan', NULL, 'S', NULL),
(204, 63, 'Write the detailed report first and then come up with an outline', NULL, 'S', NULL),
(205, 63, 'Write the outline first and then the detailed report', NULL, 'N', NULL),
(206, 64, 'Pretty straightforward person', NULL, 'T', NULL),
(207, 64, 'Sensitive person', NULL, 'F', NULL),
(208, 65, 'decide to buy something because you liked it', NULL, 'F', NULL),
(209, 65, 'do an extensive research and then decide to buy one', NULL, 'T', NULL),
(210, 66, 'I would rather tell the facts', NULL, 'T', NULL),
(211, 66, 'Many times - yes', NULL, 'F', NULL),
(212, 67, 'act spontaneously', NULL, 'P', NULL),
(213, 67, 'make a list of things to do', NULL, 'J', NULL),
(214, 68, 'Mostly true', NULL, 'P', NULL),
(215, 68, 'My decisions are well thought through and I dont usually intend to change', NULL, 'J', NULL),
(216, 69, 'Is fully Scheduled.', NULL, 'J', NULL),
(217, 69, 'Quite open. fully scheduled calendars makes you worried', NULL, 'P', NULL),
(244, 57, 'Yoga/Fitness', NULL, NULL, NULL),
(245, 57, 'Running/Marathon', NULL, NULL, NULL),
(246, 57, 'Cars/Bikes', NULL, NULL, NULL),
(247, 57, 'Video Gaming', NULL, NULL, NULL),
(248, 57, 'Gadgets', NULL, NULL, NULL),
(249, 57, 'Party/Hangouts', NULL, NULL, NULL),
(250, 57, 'Adventure Sports', NULL, NULL, NULL),
(251, 57, 'Cooking', NULL, NULL, NULL),
(252, 57, 'Baking/ Grilling', NULL, NULL, NULL),
(253, 57, 'Baking', NULL, NULL, NULL),
(254, 57, 'Fashion/Shopping', NULL, NULL, NULL),
(255, 57, 'Gardening/Landscaping', NULL, NULL, NULL),
(256, 57, 'Martial Art', NULL, NULL, NULL),
(257, 57, 'Body Building/Gym', NULL, NULL, NULL),
(258, 57, 'History/Antiques', NULL, NULL, NULL),
(259, 57, 'Crafts', NULL, NULL, NULL),
(260, 57, 'Body Building/Gym', NULL, NULL, NULL),
(261, 57, 'Jewellery Making', NULL, NULL, NULL),
(262, 57, 'Creative writing', NULL, NULL, NULL),
(263, 57, 'Pets', NULL, NULL, NULL),
(274, 56, 'Gujarati', NULL, NULL, NULL),
(275, 53, 'Agnostic', NULL, NULL, NULL),
(276, 56, 'Urdu', NULL, NULL, NULL),
(277, 56, 'Kashmiri', NULL, NULL, NULL),
(278, 56, 'Assamese', NULL, NULL, NULL),
(279, 56, 'Konkani', NULL, NULL, NULL),
(280, 56, 'Manipuri', NULL, NULL, NULL),
(281, 56, 'Mizo', NULL, NULL, NULL),
(283, 55, 'Fun', NULL, NULL, NULL),
(284, 55, 'Freedom', NULL, NULL, NULL),
(285, 55, 'Authenticity', NULL, NULL, NULL),
(286, 55, 'Spiritual growth', NULL, NULL, NULL),
(287, 55, 'Health & Wellbeing', NULL, NULL, NULL),
(288, 55, 'Compassion', NULL, NULL, NULL),
(289, 55, 'Courage', NULL, NULL, NULL),
(290, 55, 'Personal development', NULL, NULL, NULL),
(291, 55, 'Honesty', NULL, NULL, NULL),
(292, 57, 'Nature', NULL, NULL, NULL),
(293, 57, 'Wine Tasting', NULL, NULL, NULL),
(294, 57, 'Politics', NULL, NULL, NULL),
(295, 57, 'Tennis', NULL, NULL, NULL),
(296, 57, 'Soccer', NULL, NULL, NULL),
(297, 57, 'Swimming', NULL, NULL, NULL),
(298, 57, 'Badminton', NULL, NULL, NULL),
(299, 57, 'Bowling', NULL, NULL, NULL),
(300, 57, 'Golf', NULL, NULL, NULL),
(301, 57, 'Horse Race', NULL, NULL, NULL),
(302, 57, '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireUserAnswer`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireUserAnswer` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserId` bigint(20) DEFAULT NULL,
  `QnId` bigint(20) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `QuestionnaireUserAnswer`
--

INSERT INTO `QuestionnaireUserAnswer` (`Id`, `UserId`, `QnId`, `DateAdded`) VALUES
(1, 1, 55, NULL),
(2, 1, 56, NULL),
(3, 1, 53, NULL),
(4, 1, 54, NULL),
(5, 1, 67, NULL),
(6, 1, 68, NULL),
(7, 1, 69, NULL),
(8, 1, 58, NULL),
(9, 1, 59, NULL),
(10, 1, 60, NULL),
(11, 1, 61, NULL),
(12, 1, 62, NULL),
(13, 1, 63, NULL),
(14, 1, 64, NULL),
(15, 1, 65, NULL),
(16, 1, 66, NULL),
(17, 1, 57, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE IF NOT EXISTS `Rating` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `DiscussionTopicId` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `RatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ReportAbuseUser`
--

CREATE TABLE IF NOT EXISTS `ReportAbuseUser` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `SenderId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `Message` varchar(250) DEFAULT NULL,
  `AddedDate` datetime DEFAULT NULL,
  `ViewStatus` int(11) DEFAULT '0',
  `Status` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Restriction`
--

CREATE TABLE IF NOT EXISTS `Restriction` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Resend` int(11) DEFAULT NULL,
  `ResendSame` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `Restriction`
--

INSERT INTO `Restriction` (`Id`, `Resend`, `ResendSame`) VALUES
(7, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `SoulMatches`
--

CREATE TABLE IF NOT EXISTS `SoulMatches` (
  `SId` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserId` bigint(20) DEFAULT NULL,
  `SoulId` bigint(20) DEFAULT NULL,
  `ScorePercentage` varchar(10) DEFAULT NULL,
  `MatchType` varchar(10) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL,
  PRIMARY KEY (`SId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `SpecialFeeling`
--

CREATE TABLE IF NOT EXISTS `SpecialFeeling` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `SenderId` int(11) DEFAULT NULL,
  `RecieverId` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT '0',
  `SendedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `SystemNotification`
--

CREATE TABLE IF NOT EXISTS `SystemNotification` (
  `Id` bigint(15) NOT NULL AUTO_INCREMENT,
  `userId` bigint(15) DEFAULT NULL,
  `Message` text,
  `ViewStatus` tinyint(4) DEFAULT NULL COMMENT '(0 - New, 1 - Viewed)',
  `AddedDate` date DEFAULT NULL,
  `Link` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `UserPermissions`
--

CREATE TABLE IF NOT EXISTS `UserPermissions` (
  `userId` bigint(15) NOT NULL,
  `PermissionId` bigint(15) DEFAULT NULL,
  `ItemId` bigint(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UserPermissions`
--

INSERT INTO `UserPermissions` (`userId`, `PermissionId`, `ItemId`) VALUES
(0, 1, 23),
(0, 1, 43),
(0, 1, 49),
(6, 1, 23),
(6, 1, 43),
(6, 1, 49),
(7, 1, 42),
(7, 1, 23),
(7, 1, 43),
(8, 1, 23),
(8, 1, 43),
(9, 1, 49),
(10, 1, 23),
(10, 1, 42),
(10, 1, 43),
(11, 1, 23),
(11, 1, 42),
(12, 1, 57),
(12, 1, 56),
(12, 1, 54),
(13, 1, 61),
(14, 1, 57),
(14, 1, 56),
(14, 1, 63),
(14, 1, 65),
(15, 1, 56),
(16, 1, 57),
(16, 1, 64),
(16, 1, 70),
(16, 1, 63),
(16, 1, 56),
(16, 1, 53),
(16, 1, 65),
(19, 1, 59),
(19, 1, 68),
(19, 1, 71),
(19, 1, 74),
(19, 1, 66),
(19, 1, 69),
(19, 1, 72),
(19, 1, 73),
(19, 1, 70),
(19, 1, 67);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `fb_id` varchar(55) DEFAULT NULL,
  `first_name` varchar(55) DEFAULT NULL,
  `password` varchar(55) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `hometown` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `relationship_status` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) NOT NULL,
  `act_code` varchar(5) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '(0- Pending, 1-Active)',
  `linked_update` tinyint(4) NOT NULL DEFAULT '0' COMMENT '(0-Penddateding,1-Up)',
  `access_tocken` varchar(32) DEFAULT NULL,
  `user_role` tinyint(4) DEFAULT NULL COMMENT '(1- Admin, 2 -User)',
  `Picture` varchar(2500) NOT NULL,
  `Moto` varchar(250) DEFAULT NULL,
  `OwnWords` text,
  `AboutMe` text,
  `Height` varchar(10) DEFAULT NULL,
  `FoodHabits` text,
  `Drinking` text,
  `Smoking` text,
  `UpdatedPicture` varchar(500) DEFAULT NULL,
  `LoginCount` int(11) DEFAULT '0',
  `DateJoined` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fb_id`, `first_name`, `password`, `last_name`, `email`, `gender`, `birthdate`, `hometown`, `location`, `relationship_status`, `mobile`, `act_code`, `status`, `linked_update`, `access_tocken`, `user_role`, `Picture`, `Moto`, `OwnWords`, `AboutMe`, `Height`, `FoodHabits`, `Drinking`, `Smoking`, `UpdatedPicture`, `LoginCount`, `DateJoined`) VALUES
(1, '800856129935365', 'Jiby', NULL, 'John', 'jibyjohn19@yahoo.co.in', 'male', '1987-06-07', 'Thodupuzha, India', 'Bengaluru/Bangalore', 'I''m Single', '9538614734', '92557', 1, 0, '0319dae68d67e30bcb04ec81bb542432', 2, 'photo2141577651.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2015-02-20 06:26:39');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
