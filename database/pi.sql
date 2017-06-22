-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2017 at 02:58 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pi`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_list`
--

CREATE TABLE `item_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(128) DEFAULT NULL,
  `quantity` int(10) UNSIGNED DEFAULT NULL,
  `image_url` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_list`
--

INSERT INTO `item_list` (`id`, `item_name`, `quantity`, `image_url`) VALUES
(25, 'HC06', 7, NULL),
(23, 'Arduino Books', 4, NULL),
(24, 'RaspBerryPI', 7, NULL),
(26, 'Wifi Module', 8, NULL),
(27, 'Arduino Uno', 11, NULL),
(28, 'LCD Module', 12, NULL),
(29, 'Glue Gun', 3, NULL),
(30, 'Driller', 7, NULL),
(31, 'Hammer', 4, NULL),
(32, 'Pliers', 7, NULL),
(33, 'Power Pack', 5, NULL),
(34, 'Vernier Callipers', 3, NULL),
(35, 'Micrometer Screw Gauze', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_list`
--

CREATE TABLE `student_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_name` varchar(100) DEFAULT NULL,
  `item_taken` varchar(128) DEFAULT NULL,
  `quantity_taken` int(10) UNSIGNED DEFAULT NULL,
  `date_taken` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_list`
--

INSERT INTO `student_list` (`id`, `student_name`, `item_taken`, `quantity_taken`, `date_taken`) VALUES
(18, '7142 Ankit', 'HC06', 5, 'Tue Jun 20 2017'),
(19, '7147 Suman', 'Arduino Books', 5, 'Tue Jun 20 2017'),
(20, '7071 Digdarshan', 'Wifi Module', 6, 'Tue Jun 20 2017'),
(21, '7142 Ankit', 'RaspBerryPI', 4, 'Tue Jun 20 2017'),
(22, 'Science Dept', 'Hammer', 4, 'Wednesday, 21 June , 2017');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_list`
--
ALTER TABLE `item_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_list`
--
ALTER TABLE `student_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_list`
--
ALTER TABLE `item_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `student_list`
--
ALTER TABLE `student_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
