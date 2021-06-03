-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 03, 2021 at 05:53 PM
-- Server version: 8.0.19
-- PHP Version: 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SportsHub`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`id`, `email`, `password`, `role`) VALUES
(1, 'arkaraj@test.com', 'test1234', 2),
(2, 'saumit@p.com', 'test1234', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `Bid` int NOT NULL,
  `userId` int NOT NULL,
  `groundId` int NOT NULL,
  `Date` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `stadium` varchar(255) NOT NULL,
  `Timing` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Booking`
--

INSERT INTO `Booking` (`Bid`, `userId`, `groundId`, `Date`, `city`, `stadium`, `Timing`) VALUES
(1, 1, 1, '2021-04-30', 'Delhi', 'Rani Jhansi Stadium', 1),
(3, 1, 1, '2021-06-18', 'Vellore', 'Oval Ground CMC', 1),
(5, 2, 1, '2021-06-25', 'Chennai', 'Najafgarh Stadium', 2),
(6, 1, 1, '2021-07-02', 'Chennai', 'Shuttle Sporting Indoor Stadium', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Ground`
--

CREATE TABLE `Ground` (
  `Gid` int NOT NULL,
  `StaffId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `available` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Ground`
--

INSERT INTO `Ground` (`Gid`, `StaffId`, `name`, `location`, `available`) VALUES
(1, 1, 'Rani Jhansi Stadium', 'Delhi', 1),
(2, 1, 'Najafgarh Stadium', 'Delhi', 1),
(3, 1, 'Yamuna Sports Complex', 'Delhi', 1),
(4, 2, 'Shuttle Sporting Indoor Stadium', 'Chennai', 0),
(5, 2, 'Jayalalitha Indoor Basketball Stadium', 'Chennai', 1),
(6, 2, 'Mayor Radhakrishnan Hockey Stadium', 'Chennai', 1),
(7, 3, 'Netaji Stadium', 'Vellore', 1),
(8, 3, 'Oval Ground CMC', 'Vellore', 1),
(9, 3, 'The Turf Nation', 'Vellore', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Staff`
--

CREATE TABLE `Staff` (
  `Sid` int NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `role` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Staff`
--

INSERT INTO `Staff` (`Sid`, `firstName`, `lastName`, `email`, `password`, `phone`, `role`) VALUES
(1, 'Arkaraj', 'Ghosh', 'arkaraj2017@gmail.com', 'test1234', '1235567899', 1),
(2, 'Arkaraj Ghosh', 'xyzjflksjd', 'ark@xyz.com', 'test1234', '1235567899', 1),
(3, 'karajar', 'sdfsdf', 'ark@sdf.com', 'test1234', '1235567894', 1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` char(10) NOT NULL,
  `role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `firstName`, `lastName`, `email`, `password`, `phone`, `role`) VALUES
(1, 'Arkaraj', 'Ghosh', 'arkaraj@test.com', '$2b$10$5a7UaxAJv4BiBTEa7D2ol.BGXen8M44nemInyABeKiWEC68QHiTs.', '7395847373', 0),
(2, 'Arkaraj', 'Ghosh', 'arkaraj2017@gmail.com', '$2b$10$qqjNsqFM6eJW3d.s0SXKqORSdQbkm1SKIb.qKhyQnDqS7UEOlWY.G', '7395847373', 0),
(4, 'Arkaraj', 'Ghosh', 'arkaraj2019@gmail.com', '$2b$10$lHmE0cl4I0uOZfnsjYSXTOB5pKM2z.wB/xgu9TBAN9C.2fhp.Y1Sq', '7395847373', 0),
(8, 'piyush', 'fsdf', 'bot@test.com', '$2b$10$fCzjPliPfF716uQZ6CZ4/uNplltPxPsVV4vf2Wqdj3ifsVDLDq532', '7395847373', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`Bid`);

--
-- Indexes for table `Ground`
--
ALTER TABLE `Ground`
  ADD PRIMARY KEY (`Gid`);

--
-- Indexes for table `Staff`
--
ALTER TABLE `Staff`
  ADD PRIMARY KEY (`Sid`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Booking`
--
ALTER TABLE `Booking`
  MODIFY `Bid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Ground`
--
ALTER TABLE `Ground`
  MODIFY `Gid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Staff`
--
ALTER TABLE `Staff`
  MODIFY `Sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
