-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 25, 2014 at 06:08 PM
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
-- Table structure for table `AppUsers`
--

CREATE TABLE IF NOT EXISTS `AppUsers` (
  `UserId` int(11) NOT NULL,
  `LoginName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `MiddleName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `BirthDate` datetime DEFAULT NULL,
  `HomeTown` varchar(100) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `EmailID` varchar(200) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `RelationShipStatus` varchar(20) DEFAULT NULL,
  `ProfilePhoto` varchar(500) DEFAULT NULL,
  `Password` varchar(1000) DEFAULT NULL,
  `ValidFrom` datetime DEFAULT NULL,
  `ValidTo` datetime DEFAULT NULL,
  `Role` varchar(20) DEFAULT NULL,
  `Status` bit(4) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `currentPosition`
--

CREATE TABLE IF NOT EXISTS `currentPosition` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `company` varchar(50) DEFAULT NULL,
  `startDate` varchar(50) DEFAULT NULL,
  `title` text,
  `user_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoard`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoard` (
  `DiscussionBoardId` int(11) NOT NULL,
  `Topic` varchar(5000) DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `ApprovalStatus` varchar(10) DEFAULT NULL,
  `ModeratorComments` varchar(5000) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `ModifiedBy` int(11) DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL,
  `Status` bit(4) DEFAULT NULL,
  PRIMARY KEY (`DiscussionBoardId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardAbuse`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardAbuse` (
  `DiscussionBoardId` int(11) NOT NULL,
  `CommentId` int(11) DEFAULT NULL,
  `ReportedBy` int(11) DEFAULT NULL,
  `Comments` varchar(5000) DEFAULT NULL,
  `ReportedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`DiscussionBoardId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardComments`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardComments` (
  `CommentId` int(11) NOT NULL,
  `DiscussionBoardId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `SeqNo` int(11) DEFAULT NULL,
  `Comment` varchar(5000) DEFAULT NULL,
  `CommentDateTime` date DEFAULT NULL,
  `IsValid` bit(4) DEFAULT NULL,
  PRIMARY KEY (`CommentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoardDocuments`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoardDocuments` (
  `DiscussionBoardId` int(11) NOT NULL,
  `SeqNo` int(11) DEFAULT NULL,
  `Title` varchar(200) DEFAULT NULL,
  `FileName` varchar(200) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`DiscussionBoardId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBoard_UserGroups`
--

CREATE TABLE IF NOT EXISTS `DiscussionBoard_UserGroups` (
  `DiscussionBoardId` int(11) NOT NULL,
  `UserGroupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`DiscussionBoardId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DiscussionBorardLikes`
--

CREATE TABLE IF NOT EXISTS `DiscussionBorardLikes` (
  `DiscussionBoardId` int(11) NOT NULL,
  `CommentId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `LikeDateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`DiscussionBoardId`)
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
  `user_id` int(20) DEFAULT NULL,
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
  `user_id` int(20) DEFAULT NULL,
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
  `user_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table ` ProfessionalDetails`
--

CREATE TABLE IF NOT EXISTS ` ProfessionalDetails` (
  `UserId` int(11) DEFAULT NULL,
  `CurrentEmployment` varchar(20) DEFAULT NULL,
  `HighestEducation` varchar(20) DEFAULT NULL,
  `Endorsedskills` varchar(500) DEFAULT NULL,
  `ModifiedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `UserGroups`
--

CREATE TABLE IF NOT EXISTS `UserGroups` (
  `GroupId` int(11) NOT NULL,
  `GroupName` int(11) DEFAULT NULL,
  `CreatedDate` varchar(200) DEFAULT NULL,
  `ModifiedDate` varchar(200) DEFAULT NULL,
  `Status` bit(4) DEFAULT NULL,
  PRIMARY KEY (`GroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `UserRegistrationLog`
--

CREATE TABLE IF NOT EXISTS `UserRegistrationLog` (
  `UserId` int(11) DEFAULT NULL,
  `Registration date` varchar(20) DEFAULT NULL,
  `RegistrationStatus` varchar(20) DEFAULT NULL,
  `FailureReason` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
