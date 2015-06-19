-- phpMyAdmin SQL Dump
-- version 4.3.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 25, 2015 at 09:42 AM
-- Server version: 5.5.40-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `soulcafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `AdminUser`
--

CREATE TABLE IF NOT EXISTS `AdminUser` (
  `AdminId` bigint(20) NOT NULL,
  `Uname` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Role` tinyint(4) DEFAULT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `AddedDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `access_tocken` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AdminUser`
--

INSERT INTO `AdminUser` (`AdminId`, `Uname`, `Password`, `Email`, `Role`, `FullName`, `AddedDate`, `Status`, `access_tocken`) VALUES
(1, 'admin', '123', 'john@amazecodes.com', 1, 'Jiby John', '2014-10-04 00:00:00', 1, '135c13f393e9c7a80ed63b6df59b44a0');

-- --------------------------------------------------------

--
-- Table structure for table `AlgorithamLogic`
--

CREATE TABLE IF NOT EXISTS `AlgorithamLogic` (
  `AlgorithamId` bigint(15) NOT NULL,
  `QuestionId` bigint(15) DEFAULT NULL,
  `Row` bigint(20) DEFAULT NULL,
  `Col` bigint(20) DEFAULT NULL,
  `Value` varchar(250) DEFAULT NULL,
  `Formula` varchar(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1918 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AlgorithamLogic`
--

INSERT INTO `AlgorithamLogic` (`AlgorithamId`, `QuestionId`, `Row`, `Col`, `Value`, `Formula`) VALUES
(1768, 53, 146, 146, '5', NULL),
(1769, 53, 146, 147, '0', NULL),
(1770, 53, 146, 148, '0', NULL),
(1771, 53, 146, 149, '0', NULL),
(1772, 53, 146, 150, '0', NULL),
(1773, 53, 146, 151, '0', NULL),
(1774, 53, 146, 152, '0', NULL),
(1775, 53, 146, 153, '1', NULL),
(1776, 53, 146, 154, '0', NULL),
(1777, 53, 146, 155, '0', NULL),
(1778, 53, 146, 275, '0', NULL),
(1779, 53, 147, 146, '0', NULL),
(1780, 53, 147, 147, '5', NULL),
(1781, 53, 147, 148, '0', NULL),
(1782, 53, 147, 149, '0', NULL),
(1783, 53, 147, 150, '0', NULL),
(1784, 53, 147, 151, '0', NULL),
(1785, 53, 147, 152, '0', NULL),
(1786, 53, 147, 153, '1', NULL),
(1787, 53, 147, 154, '0', NULL),
(1788, 53, 147, 155, '0', NULL),
(1789, 53, 147, 275, '0', NULL),
(1790, 53, 148, 146, '0', NULL),
(1791, 53, 148, 147, '0', NULL),
(1792, 53, 148, 148, '5', NULL),
(1793, 53, 148, 149, '0', NULL),
(1794, 53, 148, 150, '0', NULL),
(1795, 53, 148, 151, '0', NULL),
(1796, 53, 148, 152, '0', NULL),
(1797, 53, 148, 153, '1', NULL),
(1798, 53, 148, 154, '3', NULL),
(1799, 53, 148, 155, '0', NULL),
(1800, 53, 148, 275, '0', NULL),
(1801, 53, 149, 146, '0', NULL),
(1802, 53, 149, 147, '0', NULL),
(1803, 53, 149, 148, '0', NULL),
(1804, 53, 149, 149, '5', NULL),
(1805, 53, 149, 150, '0', NULL),
(1806, 53, 149, 151, '0', NULL),
(1807, 53, 149, 152, '0', NULL),
(1808, 53, 149, 153, '1', NULL),
(1809, 53, 149, 154, '0', NULL),
(1810, 53, 149, 155, '0', NULL),
(1811, 53, 149, 275, '0', NULL),
(1812, 53, 150, 146, '0', NULL),
(1813, 53, 150, 147, '0', NULL),
(1814, 53, 150, 148, '0', NULL),
(1815, 53, 150, 149, '0', NULL),
(1816, 53, 150, 150, '5', NULL),
(1817, 53, 150, 151, '0', NULL),
(1818, 53, 150, 152, '0', NULL),
(1819, 53, 150, 153, '1', NULL),
(1820, 53, 150, 154, '0', NULL),
(1821, 53, 150, 155, '0', NULL),
(1822, 53, 150, 275, '0', NULL),
(1823, 53, 151, 146, '0', NULL),
(1824, 53, 151, 147, '0', NULL),
(1825, 53, 151, 148, '0', NULL),
(1826, 53, 151, 149, '0', NULL),
(1827, 53, 151, 150, '0', NULL),
(1828, 53, 151, 151, '5', NULL),
(1829, 53, 151, 152, '0', NULL),
(1830, 53, 151, 153, '1', NULL),
(1831, 53, 151, 154, '0', NULL),
(1832, 53, 151, 155, '0', NULL),
(1833, 53, 151, 275, '0', NULL),
(1834, 53, 152, 146, '0', NULL),
(1835, 53, 152, 147, '0', NULL),
(1836, 53, 152, 148, '0', NULL),
(1837, 53, 152, 149, '0', NULL),
(1838, 53, 152, 150, '0', NULL),
(1839, 53, 152, 151, '0', NULL),
(1840, 53, 152, 152, '5', NULL),
(1841, 53, 152, 153, '1', NULL),
(1842, 53, 152, 154, '0', NULL),
(1843, 53, 152, 155, '0', NULL),
(1844, 53, 152, 275, '0', NULL),
(1845, 53, 153, 146, '1', NULL),
(1846, 53, 153, 147, '1', NULL),
(1847, 53, 153, 148, '1', NULL),
(1848, 53, 153, 149, '1', NULL),
(1849, 53, 153, 150, '1', NULL),
(1850, 53, 153, 151, '1', NULL),
(1851, 53, 153, 152, '1', NULL),
(1852, 53, 153, 153, '5', NULL),
(1853, 53, 153, 154, '2', NULL),
(1854, 53, 153, 155, '3', NULL),
(1855, 53, 153, 275, '3', NULL),
(1856, 53, 154, 146, '0', NULL),
(1857, 53, 154, 147, '0', NULL),
(1858, 53, 154, 148, '3', NULL),
(1859, 53, 154, 149, '0', NULL),
(1860, 53, 154, 150, '0', NULL),
(1861, 53, 154, 151, '0', NULL),
(1862, 53, 154, 152, '0', NULL),
(1863, 53, 154, 153, '2', NULL),
(1864, 53, 154, 154, '5', NULL),
(1865, 53, 154, 155, '0', NULL),
(1866, 53, 154, 275, '0', NULL),
(1867, 53, 155, 146, '0', NULL),
(1868, 53, 155, 147, '0', NULL),
(1869, 53, 155, 148, '0', NULL),
(1870, 53, 155, 149, '0', NULL),
(1871, 53, 155, 150, '0', NULL),
(1872, 53, 155, 151, '0', NULL),
(1873, 53, 155, 152, '0', NULL),
(1874, 53, 155, 153, '3', NULL),
(1875, 53, 155, 154, '0', NULL),
(1876, 53, 155, 155, '5', NULL),
(1877, 53, 155, 275, '3', NULL),
(1878, 53, 275, 146, '0', NULL),
(1879, 53, 275, 147, '0', NULL),
(1880, 53, 275, 148, '0', NULL),
(1881, 53, 275, 149, '0', NULL),
(1882, 53, 275, 150, '0', NULL),
(1883, 53, 275, 151, '0', NULL),
(1884, 53, 275, 152, '0', NULL),
(1885, 53, 275, 153, '3', NULL),
(1886, 53, 275, 154, '1', NULL),
(1887, 53, 275, 155, '3', NULL),
(1888, 53, 275, 275, '5', NULL),
(1889, 56, 1, 1, '5', NULL),
(1890, 56, 1, 2, '3', NULL),
(1891, 56, 2, 1, '3', NULL),
(1892, 56, 2, 2, '3', NULL),
(1893, 55, 1, 1, '5', NULL),
(1894, 55, 1, 2, '4', NULL),
(1895, 55, 1, 3, '3', NULL),
(1896, 55, 1, 4, '2', NULL),
(1897, 55, 1, 5, '1', NULL),
(1898, 55, 2, 1, '4', NULL),
(1899, 55, 2, 2, '4', NULL),
(1900, 55, 2, 3, '3', NULL),
(1901, 55, 2, 4, '2', NULL),
(1902, 55, 2, 5, '1', NULL),
(1903, 55, 3, 1, '3', NULL),
(1904, 55, 3, 2, '3', NULL),
(1905, 55, 3, 3, '3', NULL),
(1906, 55, 3, 4, '2', NULL),
(1907, 55, 3, 5, '1', NULL),
(1908, 55, 4, 1, '2', NULL),
(1909, 55, 4, 2, '2', NULL),
(1910, 55, 4, 3, '2', NULL),
(1911, 55, 4, 4, '2', NULL),
(1912, 55, 4, 5, '1', NULL),
(1913, 55, 5, 1, '1', NULL),
(1914, 55, 5, 2, '1', NULL),
(1915, 55, 5, 3, '1', NULL),
(1916, 55, 5, 4, '1', NULL),
(1917, 55, 5, 5, '1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `AlgorithamProcessed`
--

CREATE TABLE IF NOT EXISTS `AlgorithamProcessed` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `AlgorithamType`
--

CREATE TABLE IF NOT EXISTS `AlgorithamType` (
  `AlgTypeId` int(11) NOT NULL,
  `AlgTypeTitle` varchar(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

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
  `PId` int(11) NOT NULL,
  `Row` varchar(11) DEFAULT NULL,
  `Col` varchar(11) DEFAULT NULL,
  `Value` varchar(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3841 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AlgPersonalityMatrix`
--

INSERT INTO `AlgPersonalityMatrix` (`PId`, `Row`, `Col`, `Value`) VALUES
(3585, 'INFP', 'INFP', '2'),
(3586, 'INFP', 'INFJ', '2'),
(3587, 'INFP', 'INTJ', '1'),
(3588, 'INFP', 'INTP', '1'),
(3589, 'INFP', 'ENFP', '2'),
(3590, 'INFP', 'ENFJ', '2'),
(3591, 'INFP', 'ENTJ', '1'),
(3592, 'INFP', 'ENTP', '1'),
(3593, 'INFP', 'ESFP', '3'),
(3594, 'INFP', 'ESFJ', '3'),
(3595, 'INFP', 'ESTJ', '3'),
(3596, 'INFP', 'ESTP', '3'),
(3597, 'INFP', 'ISFP', '3'),
(3598, 'INFP', 'ISFJ', '3'),
(3599, 'INFP', 'ISTJ', '3'),
(3600, 'INFP', 'ISTP', '3'),
(3601, 'INFJ', 'INFP', '2'),
(3602, 'INFJ', 'INFJ', '2'),
(3603, 'INFJ', 'INTJ', '1'),
(3604, 'INFJ', 'INTP', '1'),
(3605, 'INFJ', 'ENFP', '2'),
(3606, 'INFJ', 'ENFJ', '2'),
(3607, 'INFJ', 'ENTJ', '1'),
(3608, 'INFJ', 'ENTP', '1'),
(3609, 'INFJ', 'ESFP', '3'),
(3610, 'INFJ', 'ESFJ', '3'),
(3611, 'INFJ', 'ESTJ', '3'),
(3612, 'INFJ', 'ESTP', '3'),
(3613, 'INFJ', 'ISFP', '3'),
(3614, 'INFJ', 'ISFJ', '3'),
(3615, 'INFJ', 'ISTJ', '3'),
(3616, 'INFJ', 'ISTP', '3'),
(3617, 'INTJ', 'INFP', '1'),
(3618, 'INTJ', 'INFJ', '1'),
(3619, 'INTJ', 'INTJ', '2'),
(3620, 'INTJ', 'INTP', '2'),
(3621, 'INTJ', 'ENFP', '1'),
(3622, 'INTJ', 'ENFJ', '1'),
(3623, 'INTJ', 'ENTJ', '2'),
(3624, 'INTJ', 'ENTP', '2'),
(3625, 'INTJ', 'ESFP', '3'),
(3626, 'INTJ', 'ESFJ', '3'),
(3627, 'INTJ', 'ESTJ', '3'),
(3628, 'INTJ', 'ESTP', '3'),
(3629, 'INTJ', 'ISFP', '3'),
(3630, 'INTJ', 'ISFJ', '3'),
(3631, 'INTJ', 'ISTJ', '3'),
(3632, 'INTJ', 'ISTP', '3'),
(3633, 'INTP', 'INFP', '1'),
(3634, 'INTP', 'INFJ', '1'),
(3635, 'INTP', 'INTJ', '2'),
(3636, 'INTP', 'INTP', '2'),
(3637, 'INTP', 'ENFP', '1'),
(3638, 'INTP', 'ENFJ', '1'),
(3639, 'INTP', 'ENTJ', '2'),
(3640, 'INTP', 'ENTP', '2'),
(3641, 'INTP', 'ESFP', '3'),
(3642, 'INTP', 'ESFJ', '3'),
(3643, 'INTP', 'ESTJ', '3'),
(3644, 'INTP', 'ESTP', '3'),
(3645, 'INTP', 'ISFP', '3'),
(3646, 'INTP', 'ISFJ', '3'),
(3647, 'INTP', 'ISTJ', '3'),
(3648, 'INTP', 'ISTP', '3'),
(3649, 'ENFP', 'INFP', '2'),
(3650, 'ENFP', 'INFJ', '2'),
(3651, 'ENFP', 'INTJ', '1'),
(3652, 'ENFP', 'INTP', '1'),
(3653, 'ENFP', 'ENFP', '2'),
(3654, 'ENFP', 'ENFJ', '2'),
(3655, 'ENFP', 'ENTJ', '1'),
(3656, 'ENFP', 'ENTP', '1'),
(3657, 'ENFP', 'ESFP', '3'),
(3658, 'ENFP', 'ESFJ', '3'),
(3659, 'ENFP', 'ESTJ', '3'),
(3660, 'ENFP', 'ESTP', '3'),
(3661, 'ENFP', 'ISFP', '3'),
(3662, 'ENFP', 'ISFJ', '3'),
(3663, 'ENFP', 'ISTJ', '3'),
(3664, 'ENFP', 'ISTP', '3'),
(3665, 'ENFJ', 'INFP', '2'),
(3666, 'ENFJ', 'INFJ', '2'),
(3667, 'ENFJ', 'INTJ', '1'),
(3668, 'ENFJ', 'INTP', '1'),
(3669, 'ENFJ', 'ENFP', '2'),
(3670, 'ENFJ', 'ENFJ', '2'),
(3671, 'ENFJ', 'ENTJ', '1'),
(3672, 'ENFJ', 'ENTP', '1'),
(3673, 'ENFJ', 'ESFP', '3'),
(3674, 'ENFJ', 'ESFJ', '3'),
(3675, 'ENFJ', 'ESTJ', '3'),
(3676, 'ENFJ', 'ESTP', '3'),
(3677, 'ENFJ', 'ISFP', '3'),
(3678, 'ENFJ', 'ISFJ', '3'),
(3679, 'ENFJ', 'ISTJ', '3'),
(3680, 'ENFJ', 'ISTP', '3'),
(3681, 'ENTJ', 'INFP', '1'),
(3682, 'ENTJ', 'INFJ', '1'),
(3683, 'ENTJ', 'INTJ', '2'),
(3684, 'ENTJ', 'INTP', '2'),
(3685, 'ENTJ', 'ENFP', '1'),
(3686, 'ENTJ', 'ENFJ', '1'),
(3687, 'ENTJ', 'ENTJ', '2'),
(3688, 'ENTJ', 'ENTP', '2'),
(3689, 'ENTJ', 'ESFP', '3'),
(3690, 'ENTJ', 'ESFJ', '3'),
(3691, 'ENTJ', 'ESTJ', '3'),
(3692, 'ENTJ', 'ESTP', '3'),
(3693, 'ENTJ', 'ISFP', '3'),
(3694, 'ENTJ', 'ISFJ', '3'),
(3695, 'ENTJ', 'ISTJ', '3'),
(3696, 'ENTJ', 'ISTP', '3'),
(3697, 'ENTP', 'INFP', '1'),
(3698, 'ENTP', 'INFJ', '1'),
(3699, 'ENTP', 'INTJ', '2'),
(3700, 'ENTP', 'INTP', '2'),
(3701, 'ENTP', 'ENFP', '1'),
(3702, 'ENTP', 'ENFJ', '1'),
(3703, 'ENTP', 'ENTJ', '2'),
(3704, 'ENTP', 'ENTP', '2'),
(3705, 'ENTP', 'ESFP', '3'),
(3706, 'ENTP', 'ESFJ', '3'),
(3707, 'ENTP', 'ESTJ', '3'),
(3708, 'ENTP', 'ESTP', '3'),
(3709, 'ENTP', 'ISFP', '3'),
(3710, 'ENTP', 'ISFJ', '3'),
(3711, 'ENTP', 'ISTJ', '3'),
(3712, 'ENTP', 'ISTP', '3'),
(3713, 'ESFP', 'INFP', '3'),
(3714, 'ESFP', 'INFJ', '3'),
(3715, 'ESFP', 'INTJ', '3'),
(3716, 'ESFP', 'INTP', '3'),
(3717, 'ESFP', 'ENFP', '3'),
(3718, 'ESFP', 'ENFJ', '3'),
(3719, 'ESFP', 'ENTJ', '3'),
(3720, 'ESFP', 'ENTP', '3'),
(3721, 'ESFP', 'ESFP', '2'),
(3722, 'ESFP', 'ESFJ', '1'),
(3723, 'ESFP', 'ESTJ', '1'),
(3724, 'ESFP', 'ESTP', '2'),
(3725, 'ESFP', 'ISFP', '1'),
(3726, 'ESFP', 'ISFJ', '1'),
(3727, 'ESFP', 'ISTJ', '1'),
(3728, 'ESFP', 'ISTP', '2'),
(3729, 'ESFJ', 'INFP', '3'),
(3730, 'ESFJ', 'INFJ', '3'),
(3731, 'ESFJ', 'INTJ', '3'),
(3732, 'ESFJ', 'INTP', '3'),
(3733, 'ESFJ', 'ENFP', '3'),
(3734, 'ESFJ', 'ENFJ', '3'),
(3735, 'ESFJ', 'ENTJ', '3'),
(3736, 'ESFJ', 'ENTP', '3'),
(3737, 'ESFJ', 'ESFP', '1'),
(3738, 'ESFJ', 'ESFJ', '2'),
(3739, 'ESFJ', 'ESTJ', '2'),
(3740, 'ESFJ', 'ESTP', '1'),
(3741, 'ESFJ', 'ISFP', '1'),
(3742, 'ESFJ', 'ISFJ', '2'),
(3743, 'ESFJ', 'ISTJ', '2'),
(3744, 'ESFJ', 'ISTP', '1'),
(3745, 'ESTJ', 'INFP', '3'),
(3746, 'ESTJ', 'INFJ', '3'),
(3747, 'ESTJ', 'INTJ', '3'),
(3748, 'ESTJ', 'INTP', '3'),
(3749, 'ESTJ', 'ENFP', '3'),
(3750, 'ESTJ', 'ENFJ', '3'),
(3751, 'ESTJ', 'ENTJ', '3'),
(3752, 'ESTJ', 'ENTP', '3'),
(3753, 'ESTJ', 'ESFP', '1'),
(3754, 'ESTJ', 'ESFJ', '2'),
(3755, 'ESTJ', 'ESTJ', '2'),
(3756, 'ESTJ', 'ESTP', '1'),
(3757, 'ESTJ', 'ISFP', '1'),
(3758, 'ESTJ', 'ISFJ', '2'),
(3759, 'ESTJ', 'ISTJ', '2'),
(3760, 'ESTJ', 'ISTP', '1'),
(3761, 'ESTP', 'INFP', '3'),
(3762, 'ESTP', 'INFJ', '3'),
(3763, 'ESTP', 'INTJ', '3'),
(3764, 'ESTP', 'INTP', '3'),
(3765, 'ESTP', 'ENFP', '3'),
(3766, 'ESTP', 'ENFJ', '3'),
(3767, 'ESTP', 'ENTJ', '3'),
(3768, 'ESTP', 'ENTP', '3'),
(3769, 'ESTP', 'ESFP', '2'),
(3770, 'ESTP', 'ESFJ', '1'),
(3771, 'ESTP', 'ESTJ', '1'),
(3772, 'ESTP', 'ESTP', '2'),
(3773, 'ESTP', 'ISFP', '2'),
(3774, 'ESTP', 'ISFJ', '1'),
(3775, 'ESTP', 'ISTJ', '1'),
(3776, 'ESTP', 'ISTP', '2'),
(3777, 'ISFP', 'INFP', '3'),
(3778, 'ISFP', 'INFJ', '3'),
(3779, 'ISFP', 'INTJ', '3'),
(3780, 'ISFP', 'INTP', '3'),
(3781, 'ISFP', 'ENFP', '3'),
(3782, 'ISFP', 'ENFJ', '3'),
(3783, 'ISFP', 'ENTJ', '3'),
(3784, 'ISFP', 'ENTP', '3'),
(3785, 'ISFP', 'ESFP', '2'),
(3786, 'ISFP', 'ESFJ', '1'),
(3787, 'ISFP', 'ESTJ', '1'),
(3788, 'ISFP', 'ESTP', '2'),
(3789, 'ISFP', 'ISFP', '2'),
(3790, 'ISFP', 'ISFJ', '1'),
(3791, 'ISFP', 'ISTJ', '1'),
(3792, 'ISFP', 'ISTP', '2'),
(3793, 'ISFJ', 'INFP', '3'),
(3794, 'ISFJ', 'INFJ', '3'),
(3795, 'ISFJ', 'INTJ', '3'),
(3796, 'ISFJ', 'INTP', '3'),
(3797, 'ISFJ', 'ENFP', '3'),
(3798, 'ISFJ', 'ENFJ', '3'),
(3799, 'ISFJ', 'ENTJ', '3'),
(3800, 'ISFJ', 'ENTP', '3'),
(3801, 'ISFJ', 'ESFP', '1'),
(3802, 'ISFJ', 'ESFJ', '2'),
(3803, 'ISFJ', 'ESTJ', '2'),
(3804, 'ISFJ', 'ESTP', '1'),
(3805, 'ISFJ', 'ISFP', '1'),
(3806, 'ISFJ', 'ISFJ', '2'),
(3807, 'ISFJ', 'ISTJ', '2'),
(3808, 'ISFJ', 'ISTP', '1'),
(3809, 'ISTJ', 'INFP', '3'),
(3810, 'ISTJ', 'INFJ', '3'),
(3811, 'ISTJ', 'INTJ', '3'),
(3812, 'ISTJ', 'INTP', '3'),
(3813, 'ISTJ', 'ENFP', '3'),
(3814, 'ISTJ', 'ENFJ', '3'),
(3815, 'ISTJ', 'ENTJ', '3'),
(3816, 'ISTJ', 'ENTP', '3'),
(3817, 'ISTJ', 'ESFP', '1'),
(3818, 'ISTJ', 'ESFJ', '2'),
(3819, 'ISTJ', 'ESTJ', '2'),
(3820, 'ISTJ', 'ESTP', '1'),
(3821, 'ISTJ', 'ISFP', '1'),
(3822, 'ISTJ', 'ISFJ', '2'),
(3823, 'ISTJ', 'ISTJ', '2'),
(3824, 'ISTJ', 'ISTP', '1'),
(3825, 'ISTP', 'INFP', '3'),
(3826, 'ISTP', 'INFJ', '3'),
(3827, 'ISTP', 'INTJ', '3'),
(3828, 'ISTP', 'INTP', '3'),
(3829, 'ISTP', 'ENFP', '3'),
(3830, 'ISTP', 'ENFJ', '3'),
(3831, 'ISTP', 'ENTJ', '3'),
(3832, 'ISTP', 'ENTP', '3'),
(3833, 'ISTP', 'ESFP', '2'),
(3834, 'ISTP', 'ESFJ', '1'),
(3835, 'ISTP', 'ESTJ', '1'),
(3836, 'ISTP', 'ESTP', '2'),
(3837, 'ISTP', 'ISFP', '2'),
(3838, 'ISTP', 'ISFJ', '1'),
(3839, 'ISTP', 'ISTJ', '1'),
(3840, 'ISTP', 'ISTP', '2');

-- --------------------------------------------------------

--
-- Table structure for table `AnswerType`
--

CREATE TABLE IF NOT EXISTS `AnswerType` (
  `QuestionTypeId` bigint(20) NOT NULL,
  `QuestionTypeTitle` varchar(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
  `Id` bigint(15) NOT NULL,
  `SenderId` bigint(15) DEFAULT NULL,
  `BuddyId` bigint(15) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL COMMENT '(0 - Pending, 1- Approved)',
  `AddedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `DiscussionBoardId` int(11) NOT NULL,
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
  `userRequest` int(11) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DiscussionBoard`
--

INSERT INTO `DiscussionBoard` (`DiscussionBoardId`, `Topic`, `Description`, `StartDate`, `EndDate`, `ApprovalStatus`, `ModeratorComments`, `CreatedBy`, `CreatedDate`, `ModifiedBy`, `ModifiedDate`, `Status`, `Restricted`, `RestrictedGender`, `RestrictedAge`, `RestrictedLocation`, `Image`, `userRequest`) VALUES
(66, 'Sweet & Short - Point put Across', 'To put across a thought, idea, feelings, story in exactly 4 lines (140 words)..short & crisp..to the point is an art..', '2014-12-08 05:54:21', NULL, NULL, NULL, 1, '2014-12-08 05:54:21', NULL, NULL, 1, 0, NULL, NULL, 's:22:"s:14:"s:7:"s:0:"";";";";', 'photo1728718552.jpg', 0),
(67, 'There is Music in my Heart', 'The corner to share our love for music..the music that keeps our soul alive..soothes our heart..sometimes pumps it up..', '2014-12-08 06:08:36', NULL, NULL, NULL, 1, '2014-12-08 06:08:36', NULL, NULL, 1, 0, NULL, NULL, 's:14:"s:7:"s:0:"";";";', 'photo1285228742.jpg', 0),
(68, 'To Travel is the only Destination', 'For all those who are bitten by the travel bug - a corner to share their experience', '2014-12-10 04:45:57', NULL, NULL, NULL, 1, '2014-12-10 04:45:57', NULL, NULL, 1, 0, NULL, NULL, 's:22:"s:14:"s:7:"s:0:"";";";";', 'photo1211107903.jpg', 0),
(69, 'Style Street @ SoulCafe', 'Style is a way to say who you are without saying a word. Here is the cafe corner where you meet to discuss on fashion/style and share quick tips!', '2014-12-10 04:50:51', NULL, NULL, NULL, 1, '2014-12-10 04:50:51', NULL, NULL, 1, 0, NULL, NULL, 's:30:"s:22:"s:14:"s:7:"s:0:"";";";";";', 'photo1099569576.jpg', 0),
(70, 'The Love for Letters - Poetry/Books', 'A corner just for all those in love with letters who love living b/w reality and imagination. The poetic verses, the fictional characters, a hot cup of coffee..that''s Life!', '2014-12-10 10:36:06', NULL, NULL, NULL, 1, '2014-12-10 10:36:06', NULL, NULL, 1, 0, NULL, NULL, 's:22:"s:14:"s:7:"s:0:"";";";";', 'photo210513836.jpg', 0),
(72, 'Daily Inspirations', 'Here is a place to share Inspiring thoughts/ Quotes. The best way to be Inspired is by Inspiring everyone around..', '2014-12-15 10:30:25', NULL, NULL, NULL, 1, '2014-12-15 10:30:25', NULL, NULL, 1, 0, 'male', 24, 's:54:"s:46:"s:38:"a:1:{i:0;s:20:"Bengaluru/Bangalore ";}";";";', 'photo1553082639.jpg', 0),
(75, 'Cricket Crazy Corner', 'Because we eat, breathe, sleep, dream Cricket!', '2014-12-21 07:28:29', NULL, NULL, NULL, 1, '2014-12-21 07:28:29', NULL, NULL, 1, 0, NULL, NULL, 's:38:"s:30:"s:22:"s:14:"s:7:"s:0:"";";";";";";', 'photo3937135.jpg', 0),
(93, 'Movie Buffs Corner', 'Love movies - here is the place for exchanging thoughts, views on any thing related to movies', '2015-02-22 05:59:43', NULL, NULL, NULL, 1, '2015-02-22 05:59:43', NULL, NULL, 1, 0, NULL, NULL, 's:14:"s:7:"s:0:"";";";', 'photo299651166.jpg', 0),
(94, 'Earth Citizens', 'Where we consider ourselves as Earth Citizens and think beyond boundaries of nation, religion and small communities and spark those conversations that matters most', '2015-02-22 06:27:28', NULL, NULL, NULL, 1, '2015-02-22 06:27:28', NULL, NULL, 1, 0, NULL, NULL, 's:7:"s:0:"";";', 'photo1602796667.jpg', 0),
(95, 'Deeper Quest: Love, Philosophy and Beyond', 'In case you prefer high caffeine conversations..here is the corner for you.', '2015-02-22 06:49:35', NULL, NULL, NULL, 1, '2015-02-22 06:49:35', NULL, NULL, 1, 0, NULL, NULL, 's:14:"s:7:"s:0:"";";";', 'photo1366623619.jpg', 0),
(96, 'SoulCafe Community', 'Let''s build it Together', '2015-02-22 10:03:03', NULL, NULL, NULL, 1, '2015-02-22 10:03:03', NULL, NULL, 1, 0, NULL, NULL, 's:7:"s:0:"";";', 'photo436553901.jpg', 0);

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
  `CommentId` int(11) NOT NULL,
  `DiscussionTopicId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `SeqNo` int(11) DEFAULT NULL,
  `Comment` varchar(5000) DEFAULT NULL,
  `CommentDateTime` datetime DEFAULT NULL,
  `IsValid` tinyint(4) DEFAULT NULL,
  `profane` tinyint(4) DEFAULT '0' COMMENT '(0-not profane, 1-profane)'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardTopic`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardTopic` (
  `DiscussionTopicId` int(11) NOT NULL,
  `DiscussionBoardId` int(11) NOT NULL,
  `TopicTitle` varchar(250) DEFAULT NULL,
  `TopicDescription` text,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL COMMENT '(0 - Pending, 1-Active)',
  `rating` int(11) NOT NULL,
  `createdStatus` int(11) DEFAULT '0' COMMENT '(0-admin,1-user)'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DiscussionBoardTopic`
--

INSERT INTO `DiscussionBoardTopic` (`DiscussionTopicId`, `DiscussionBoardId`, `TopicTitle`, `TopicDescription`, `CreatedBy`, `CreatedDate`, `Status`, `rating`, `createdStatus`) VALUES
(2, 96, 'SoulCafe.Singles - Thoughts on First Glimpse', 'This is just the beginning and here we bring to you our beta feature set. We have so much in plan for this platform. We want you to know that we aim to stay true to our Core Belief on creating a platform that helps build Soul Relationships. Let us know if this this Platform resonates with you? You could also use the Feedback Page to send us detailed feedback as well. We look forward to hearing from you!!', 1, '2015-02-23 10:44:27', 1, 0, 0),
(3, 75, 'Again 200 in ODI.', 'Thank you god for saving Rohit Sharma...', 3, '2015-02-24 07:14:04', 0, 0, 1),
(4, 93, 'Tell us one movie that you think is a piece of art beyond competition', '"Ego loves competition because for someone to win, someone has to lose, but the paradox is that true art, and true individual expression as all the work of these incredible fellow film makers is, canâ€™t be compared or labelled or defeated because they exist, and our work will only be judged by time." -  Alejandro GonzÃ¡lez  iÃ±Ã¡rritu @Oscar 2015', 1, '2015-02-24 12:59:09', 1, 0, 0),
(6, 69, 'Style Vs Fashion', 'What''s the difference? What''s your preference?', 1, '2015-02-24 13:09:46', 1, 0, 0),
(7, 68, 'Traveler or a Tourist?', 'What''s the difference? Are you a traveler or a tourist?', 1, '2015-02-24 14:23:36', 1, 0, 0),
(8, 72, 'â€œYou never know how strong you are, until being strong is your only choice.â€   â€• Bob Marley', 'Share one instance in your life when you realized your true strength.', 1, '2015-02-24 14:25:05', 1, 0, 0),
(9, 95, 'Irony of our Times. What do you think?', 'Having perfected our disguise, we spend our lives searching for someone who isnâ€™t fooled. â€” Robert Brault', 1, '2015-02-24 14:26:04', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardUsers`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardUsers` (
  `DiscussionBoardUsersId` int(11) NOT NULL,
  `DiscussionBoardId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `JoinedDate` datetime DEFAULT NULL,
  `Status` bit(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `Message` text,
  `ViewStatus` tinyint(4) DEFAULT NULL COMMENT '(0 - New, 1 - Viewed)',
  `AddedDate` datetime DEFAULT NULL,
  `Link` varchar(250) DEFAULT NULL,
  `CommentId` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `Id` bigint(20) NOT NULL,
  `SenderId` bigint(20) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `Message` text,
  `AddedDate` datetime DEFAULT NULL,
  `ViewStatus` tinyint(4) DEFAULT NULL COMMENT '(0 - New, 1 - Viewed)',
  `Link` varchar(250) DEFAULT NULL,
  `SpecialMessage` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Permissions`
--

CREATE TABLE IF NOT EXISTS `Permissions` (
  `PermissionID` bigint(15) NOT NULL,
  `ModuleName` varchar(150) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

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
  `Qid` bigint(15) NOT NULL,
  `QuestionTitle` text,
  `Description` text,
  `AnswerSelectionType` bigint(15) DEFAULT NULL,
  `Sequence` bigint(15) DEFAULT NULL,
  `QuestionCategory` bigint(15) DEFAULT NULL,
  `AlgorithamType` int(10) DEFAULT NULL,
  `MaxOptions` int(10) DEFAULT NULL,
  `MaxScore` int(10) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Questionnaire`
--

INSERT INTO `Questionnaire` (`Qid`, `QuestionTitle`, `Description`, `AnswerSelectionType`, `Sequence`, `QuestionCategory`, `AlgorithamType`, `MaxOptions`, `MaxScore`, `DateAdded`) VALUES
(53, 'What''s your current belief system?', NULL, 1, 2, 5, 1, 0, 5, '2014-11-18 03:30:36'),
(54, 'How important is your belief system to you?', 'Note: How important is the criteria when it comes to deciding on a long term relationship', 1, 3, 5, 3, 0, 5, '2014-11-18 03:34:54'),
(55, 'Select the Top 5 Life Values that''s matters most to you in the order of its significance.', '', 3, 1, 4, 2, 5, 15, '2014-11-18 04:24:52'),
(56, 'The top 2 languages you are most comfortable with', '', 3, 0, 2, 2, 2, 8, '2014-11-18 04:45:24'),
(57, 'Tell us about your key interests and the mark the level of intensity for each on a scale of 0 to 5.', 'Note: An intensity of 5 would mean you spend significant amount of time & energy on pursuing the interest. An intensity of 0 means you like it but hardly spend any time pursuing it.', 2, 4, 1, 5, 5, 5, '2014-11-18 04:52:06'),
(58, 'It''s Friday night and your friends just cancelled on you. You:', NULL, 1, 8, 7, 4, 0, NULL, '2014-11-18 05:10:07'),
(59, 'At a party you usually :', NULL, 1, 9, 7, 4, 0, NULL, '2014-11-18 05:11:13'),
(60, 'Friend Circle : You have a', NULL, 1, 10, 7, 4, 0, NULL, '2014-11-18 05:12:25'),
(61, 'In general you possess more of', NULL, 1, 11, 8, 4, 0, NULL, '2014-11-18 05:14:50'),
(62, 'At work you prefer to', NULL, 1, 12, 8, 4, 0, NULL, '2014-11-18 05:16:12'),
(63, 'You need to write a report with an outline. How do you go about it?', NULL, 1, 13, 8, 4, 0, NULL, '2014-11-18 05:21:13'),
(64, 'You are mostly considered as', NULL, 1, 14, 9, 4, 0, NULL, '2014-11-18 05:24:49'),
(65, 'Buying Decision: You would', NULL, 1, 15, 9, 4, 0, NULL, '2014-11-18 05:27:21'),
(66, 'You would refrain from telling something from someone if you know it would hurt them', NULL, 1, 16, 9, 4, 0, NULL, '2014-11-18 05:29:06'),
(67, 'You would mostly prefer to', NULL, 1, 5, 10, 4, 0, NULL, '2014-11-18 05:33:18'),
(68, 'When I make a decision or draw a conclusion it is often tentative. I am fine changing my mind or taking a different direction.', NULL, 1, 6, 10, 4, 0, NULL, '2014-11-18 05:36:06'),
(69, 'You feel completely in control when your calendar', NULL, 1, 7, 10, 4, 0, NULL, '2014-11-18 05:38:07');

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireAnswer`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireAnswer` (
  `AnsId` bigint(20) NOT NULL,
  `QId` bigint(20) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `OptionId` bigint(20) DEFAULT NULL,
  `RankScale` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireAnswertemp`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireAnswertemp` (
  `AnsId` bigint(20) NOT NULL,
  `QId` bigint(20) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `OptionId` bigint(20) DEFAULT NULL,
  `RankScale` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireCategory`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireCategory` (
  `QcId` bigint(20) NOT NULL,
  `Category` varchar(250) DEFAULT NULL,
  `Weight` varchar(5) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `QuestionnaireCategory`
--

INSERT INTO `QuestionnaireCategory` (`QcId`, `Category`, `Weight`) VALUES
(1, 'Interest Compatibility', '0.9'),
(2, 'Language Compatibility', '0.8'),
(4, 'Life Value compatibility', '1'),
(5, 'Belief compatibility', '0.9'),
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
  `QoId` int(11) NOT NULL,
  `QId` int(11) DEFAULT NULL,
  `Answer` varchar(250) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL,
  `PersonalityType` varchar(15) DEFAULT NULL,
  `Weight` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=latin1;

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
(156, 54, '1- Least Important', NULL, NULL, 1),
(157, 54, '2- Less Important', NULL, NULL, 2),
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
(251, 57, 'Cooking / Food', NULL, NULL, NULL),
(252, 57, 'Baking / Grilling', NULL, NULL, NULL),
(254, 57, 'Fashion/Shopping', NULL, NULL, NULL),
(255, 57, 'Gardening/Landscaping', NULL, NULL, NULL),
(256, 57, 'Martial Art', NULL, NULL, NULL),
(257, 57, 'Body Building/Gym', NULL, NULL, NULL),
(258, 57, 'History/Antiques', NULL, NULL, NULL),
(259, 57, 'Crafts', NULL, NULL, NULL),
(260, 57, 'Sculpting', NULL, NULL, NULL),
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
(301, 57, 'Horse Race', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `QuestionnaireUserAnswer`
--

CREATE TABLE IF NOT EXISTS `QuestionnaireUserAnswer` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `QnId` bigint(20) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE IF NOT EXISTS `Rating` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `DiscussionTopicId` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `RatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ReportAbuseUser`
--

CREATE TABLE IF NOT EXISTS `ReportAbuseUser` (
  `Id` int(11) NOT NULL,
  `SenderId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `Message` varchar(250) DEFAULT NULL,
  `AddedDate` datetime DEFAULT NULL,
  `ViewStatus` int(11) DEFAULT '0',
  `Status` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Restriction`
--

CREATE TABLE IF NOT EXISTS `Restriction` (
  `Id` int(11) NOT NULL,
  `Resend` int(11) DEFAULT NULL,
  `ResendSame` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

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
  `SId` bigint(20) NOT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `SoulId` bigint(20) DEFAULT NULL,
  `ScorePercentage` varchar(10) DEFAULT NULL,
  `MatchType` varchar(10) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `SpecialFeeling`
--

CREATE TABLE IF NOT EXISTS `SpecialFeeling` (
  `Id` int(11) NOT NULL,
  `SenderId` int(11) DEFAULT NULL,
  `RecieverId` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT '0',
  `SendedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `SystemNotification`
--

CREATE TABLE IF NOT EXISTS `SystemNotification` (
  `Id` bigint(15) NOT NULL,
  `userId` bigint(15) DEFAULT NULL,
  `Message` text,
  `ViewStatus` tinyint(4) DEFAULT NULL COMMENT '(0 - New, 1 - Viewed)',
  `AddedDate` date DEFAULT NULL,
  `Link` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `user_id` int(11) NOT NULL,
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
  `DateJoined` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminUser`
--
ALTER TABLE `AdminUser`
  ADD PRIMARY KEY (`AdminId`);

--
-- Indexes for table `AlgorithamLogic`
--
ALTER TABLE `AlgorithamLogic`
  ADD PRIMARY KEY (`AlgorithamId`);

--
-- Indexes for table `AlgorithamProcessed`
--
ALTER TABLE `AlgorithamProcessed`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `AlgorithamType`
--
ALTER TABLE `AlgorithamType`
  ADD PRIMARY KEY (`AlgTypeId`);

--
-- Indexes for table `AlgPersonalityMatrix`
--
ALTER TABLE `AlgPersonalityMatrix`
  ADD PRIMARY KEY (`PId`);

--
-- Indexes for table `AnswerType`
--
ALTER TABLE `AnswerType`
  ADD PRIMARY KEY (`QuestionTypeId`);

--
-- Indexes for table `Buddies`
--
ALTER TABLE `Buddies`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `DiscussionBoard`
--
ALTER TABLE `DiscussionBoard`
  ADD PRIMARY KEY (`DiscussionBoardId`);

--
-- Indexes for table `DiscussionBoardComments`
--
ALTER TABLE `DiscussionBoardComments`
  ADD PRIMARY KEY (`CommentId`);

--
-- Indexes for table `DiscussionBoardTopic`
--
ALTER TABLE `DiscussionBoardTopic`
  ADD PRIMARY KEY (`DiscussionTopicId`);

--
-- Indexes for table `DiscussionBoardUsers`
--
ALTER TABLE `DiscussionBoardUsers`
  ADD PRIMARY KEY (`DiscussionBoardUsersId`);

--
-- Indexes for table `ForumNotification`
--
ALTER TABLE `ForumNotification`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`PermissionID`);

--
-- Indexes for table `Questionnaire`
--
ALTER TABLE `Questionnaire`
  ADD PRIMARY KEY (`Qid`);

--
-- Indexes for table `QuestionnaireAnswer`
--
ALTER TABLE `QuestionnaireAnswer`
  ADD PRIMARY KEY (`AnsId`);

--
-- Indexes for table `QuestionnaireAnswertemp`
--
ALTER TABLE `QuestionnaireAnswertemp`
  ADD PRIMARY KEY (`AnsId`);

--
-- Indexes for table `QuestionnaireCategory`
--
ALTER TABLE `QuestionnaireCategory`
  ADD PRIMARY KEY (`QcId`);

--
-- Indexes for table `QuestionnaireOptions`
--
ALTER TABLE `QuestionnaireOptions`
  ADD PRIMARY KEY (`QoId`);

--
-- Indexes for table `QuestionnaireUserAnswer`
--
ALTER TABLE `QuestionnaireUserAnswer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `ReportAbuseUser`
--
ALTER TABLE `ReportAbuseUser`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Restriction`
--
ALTER TABLE `Restriction`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `SoulMatches`
--
ALTER TABLE `SoulMatches`
  ADD PRIMARY KEY (`SId`);

--
-- Indexes for table `SpecialFeeling`
--
ALTER TABLE `SpecialFeeling`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `SystemNotification`
--
ALTER TABLE `SystemNotification`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AdminUser`
--
ALTER TABLE `AdminUser`
  MODIFY `AdminId` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `AlgorithamLogic`
--
ALTER TABLE `AlgorithamLogic`
  MODIFY `AlgorithamId` bigint(15) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1918;
--
-- AUTO_INCREMENT for table `AlgorithamProcessed`
--
ALTER TABLE `AlgorithamProcessed`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `AlgorithamType`
--
ALTER TABLE `AlgorithamType`
  MODIFY `AlgTypeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `AlgPersonalityMatrix`
--
ALTER TABLE `AlgPersonalityMatrix`
  MODIFY `PId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3841;
--
-- AUTO_INCREMENT for table `AnswerType`
--
ALTER TABLE `AnswerType`
  MODIFY `QuestionTypeId` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Buddies`
--
ALTER TABLE `Buddies`
  MODIFY `Id` bigint(15) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `DiscussionBoard`
--
ALTER TABLE `DiscussionBoard`
  MODIFY `DiscussionBoardId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT for table `DiscussionBoardComments`
--
ALTER TABLE `DiscussionBoardComments`
  MODIFY `CommentId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `DiscussionBoardTopic`
--
ALTER TABLE `DiscussionBoardTopic`
  MODIFY `DiscussionTopicId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `DiscussionBoardUsers`
--
ALTER TABLE `DiscussionBoardUsers`
  MODIFY `DiscussionBoardUsersId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ForumNotification`
--
ALTER TABLE `ForumNotification`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `PermissionID` bigint(15) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Questionnaire`
--
ALTER TABLE `Questionnaire`
  MODIFY `Qid` bigint(15) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT for table `QuestionnaireAnswer`
--
ALTER TABLE `QuestionnaireAnswer`
  MODIFY `AnsId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `QuestionnaireAnswertemp`
--
ALTER TABLE `QuestionnaireAnswertemp`
  MODIFY `AnsId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `QuestionnaireCategory`
--
ALTER TABLE `QuestionnaireCategory`
  MODIFY `QcId` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `QuestionnaireOptions`
--
ALTER TABLE `QuestionnaireOptions`
  MODIFY `QoId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=303;
--
-- AUTO_INCREMENT for table `QuestionnaireUserAnswer`
--
ALTER TABLE `QuestionnaireUserAnswer`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Rating`
--
ALTER TABLE `Rating`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ReportAbuseUser`
--
ALTER TABLE `ReportAbuseUser`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Restriction`
--
ALTER TABLE `Restriction`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `SoulMatches`
--
ALTER TABLE `SoulMatches`
  MODIFY `SId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `SpecialFeeling`
--
ALTER TABLE `SpecialFeeling`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `SystemNotification`
--
ALTER TABLE `SystemNotification`
  MODIFY `Id` bigint(15) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
