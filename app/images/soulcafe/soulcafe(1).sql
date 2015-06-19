-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 01, 2014 at 02:43 PM
-- Server version: 5.5.37-0ubuntu0.12.04.1
-- PHP Version: 5.3.10-1ubuntu3.11

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
-- Table structure for table `currentPosition`
--

CREATE TABLE IF NOT EXISTS `currentPosition` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `company` varchar(50) DEFAULT NULL,
  `startDate` varchar(50) DEFAULT NULL,
  `title` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`DiscussionBoardId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=40 ;

--
-- Dumping data for table `DiscussionBoard`
--

INSERT INTO `DiscussionBoard` (`DiscussionBoardId`, `Topic`, `Description`, `StartDate`, `EndDate`, `ApprovalStatus`, `ModeratorComments`, `CreatedBy`, `CreatedDate`, `ModifiedBy`, `ModifiedDate`, `Status`, `Restricted`, `RestrictedGender`, `RestrictedAge`, `RestrictedLocation`) VALUES
(23, '8', 'kkfgs', '2014-08-27 05:08:52', NULL, NULL, NULL, 83, '2014-08-27 05:08:52', NULL, NULL, 1, 0, NULL, NULL, NULL),
(24, '7', 'kkfgs', '2014-08-27 05:09:16', NULL, NULL, NULL, 83, '2014-08-27 05:09:16', NULL, NULL, 0, 1, '1', NULL, NULL),
(25, '6', 'kkfgs', '2014-08-27 05:09:38', NULL, NULL, NULL, 83, '2014-08-27 05:09:38', NULL, NULL, 1, 1, '2', NULL, NULL),
(26, '5', 'sfdfsd', '2014-08-27 05:10:23', NULL, NULL, NULL, 83, '2014-08-27 05:10:23', NULL, NULL, 1, 1, 'male', NULL, NULL),
(27, '4', 'sfdfsd', '2014-08-27 05:10:35', NULL, NULL, NULL, 83, '2014-08-27 05:10:35', NULL, NULL, 1, 1, 'male', 23, 'Wardha'),
(28, '3', 'sdfsdf', '2014-08-27 05:23:54', NULL, NULL, NULL, 83, '2014-08-27 05:23:54', NULL, NULL, 0, 1, NULL, 1, NULL),
(29, '2', 'sdfsdf', '2014-08-27 05:24:25', NULL, NULL, NULL, 83, '2014-08-27 05:24:25', NULL, NULL, 0, 1, NULL, 1, NULL),
(31, '1', 'sdfs kmdas dasdna dslkNASDLASDASNDIAJD alsndijaSIBGADB KJABDA ajsfndandal', '2014-08-27 05:27:38', NULL, NULL, NULL, 83, '2014-08-27 05:27:38', NULL, NULL, 1, 1, 'male', NULL, NULL),
(37, 'kj', 'jjjj', '2014-08-28 05:14:24', NULL, NULL, NULL, 84, '2014-08-28 05:14:24', NULL, NULL, 1, 0, NULL, NULL, NULL),
(38, 'Abhik', 'ojvfdfvldnfnsa', '2014-09-01 09:32:59', NULL, NULL, NULL, 84, '2014-09-01 09:32:59', NULL, NULL, 1, 1, 'male', NULL, NULL),
(39, 'e', 'e', '2014-09-01 02:40:33', NULL, NULL, NULL, 87, '2014-09-01 02:40:33', NULL, NULL, 1, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardAbuse`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardAbuse` (
  `CommentId` int(11) DEFAULT NULL,
  `ReportedBy` int(11) DEFAULT NULL,
  `Comments` varchar(5000) DEFAULT NULL,
  `ReportedDate` datetime DEFAULT NULL
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
  `CommentDateTime` date DEFAULT NULL,
  `IsValid` bit(4) DEFAULT NULL,
  PRIMARY KEY (`CommentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `DiscussionBoardComments`
--

INSERT INTO `DiscussionBoardComments` (`CommentId`, `DiscussionTopicId`, `UserId`, `SeqNo`, `Comment`, `CommentDateTime`, `IsValid`) VALUES
(0, 6, 87, 1, 'sdf', '2014-09-01', b'1111');

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
  PRIMARY KEY (`DiscussionTopicId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `DiscussionBoardTopic`
--

INSERT INTO `DiscussionBoardTopic` (`DiscussionTopicId`, `DiscussionBoardId`, `TopicTitle`, `TopicDescription`, `CreatedBy`, `CreatedDate`, `Status`) VALUES
(1, 31, 'werw', 'werwer', 83, '2014-08-28 03:51:06', 15),
(2, 31, 'werwsd', 'werwersdfs', 83, '2014-08-28 03:51:50', 1),
(3, 31, 'werwsdasd', 'werwersdfsa', 83, '2014-08-28 03:52:58', 1),
(4, 31, 'sdsdfdfgdfgdf', 'sdfsdf', 83, '2014-08-28 03:53:10', 1),
(5, 29, 'sdfs', 'sdfsdf', 83, '2014-08-28 04:05:25', 1),
(6, 38, 'serfws', 'sdfsdf', 87, '2014-09-01 02:41:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardUsers`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardUsers` (
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
-- Table structure for table `education`
--

CREATE TABLE IF NOT EXISTS `education` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(50) DEFAULT NULL,
  `fieldOfStudy` varchar(50) DEFAULT NULL,
  `endDate` varchar(5) DEFAULT NULL,
  `startDate` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pastPosition`
--

CREATE TABLE IF NOT EXISTS `pastPosition` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `company` varchar(50) DEFAULT NULL,
  `startDate` varchar(50) DEFAULT NULL,
  `endDate` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `phone`
--

CREATE TABLE IF NOT EXISTS `phone` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `phoneType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ProfessionalDetails`
--

CREATE TABLE IF NOT EXISTS `ProfessionalDetails` (
  `UserId` int(11) DEFAULT NULL,
  `CurrentEmployment` varchar(200) DEFAULT NULL,
  `HighestEducation` varchar(200) DEFAULT NULL,
  `Endorsedskills` varchar(500) DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ProfessionalDetails`
--

INSERT INTO `ProfessionalDetails` (`UserId`, `CurrentEmployment`, `HighestEducation`, `Endorsedskills`, `ModifiedDate`) VALUES
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(86, 'AmazeCodes Solution ', 'Bachelor''s degree - ', 'C,C++,HTML 5,CSS3,AngularJs', NULL),
(87, 'AmazeCodes Solution Pvt Lim.', 'Bachelor''s degree - Computer Engineering', 'C,C++,HTML 5,CSS3,AngularJs', NULL);

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
  `birthdate` varchar(15) DEFAULT NULL,
  `hometown` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `relationship_status` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) NOT NULL,
  `act_code` varchar(5) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '(0- Pending, 1-Active)',
  `linked_update` tinyint(4) NOT NULL DEFAULT '0' COMMENT '(0-Penddateding,1-Up)',
  `access_tocken` varchar(32) DEFAULT NULL,
  `user_role` tinyint(4) DEFAULT NULL COMMENT '(1- Admin, 2 -User)',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=88 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fb_id`, `first_name`, `password`, `last_name`, `email`, `gender`, `birthdate`, `hometown`, `location`, `relationship_status`, `mobile`, `act_code`, `status`, `linked_update`, `access_tocken`, `user_role`) VALUES
(83, '800856129935365', 'Jiby', NULL, 'John', 'jibyjohn19@yahoo.co.in', 'male', '06/07/1987', 'Thodupuzha, India', 'Kochi, India', 'Single', '9538614734', '23982', 0, 0, 'c17045f17b622eee7b0bc369e1408890', 1),
(87, '723249554407343', 'Abhik', NULL, 'Jawandhiya', 'abhik.jawandhiya@gmail.com', 'male', '02/23/1991', 'Wardha', 'Wardha', 'Single', '9860507446', '13013', 0, 1, 'bb8a79a0844cf239274165e6aa0fbf19', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
