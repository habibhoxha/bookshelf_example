-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 05, 2014 at 12:05 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `node_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `body` text,
  `author` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `body`, `author`) VALUES
(1, 'Test Title', 'Test Body. Test Body. Test Body. Test Body. Test Body. Test Body. Test Body. ', 'Test Author'),
(2, 'Test Title 2', 'Test Body 2. Test Body 2. Test Body 2. Test Body 2. Test Body 2. Test Body 2. Test Body 2. Test Body 2. Test Body 2. Test Body 2. ', 'Test Author 2'),
(3, 'Test Title 3', 'Test Body 3. Test Body 3. Test Body 3. Test Body 3. Test Body 3. Test Body 3. Test Body 3. Test Body 3. Test Body 3. Test Body 3. ', 'Test Author 3'),
(5, 'TestArt', 'sdsadasd', 'sdasdas'),
(15, 'asdasd', 'sadsad', 'sadasdsad'),
(23, 'test', 'test', 'test'),
(27, 'asddasdsad', 'sadsadasd', 'asdasdasd'),
(28, 'Test Title 21', 'sfsdfdsf', 'dsfdfsdfsdf'),
(30, 'Test Title 4', 'sfsdfdsfasdasdasd', 'dsfdfsdfsdfasdasd'),
(31, 'Test Title 2', 'sfsdfdsfasdasdasd', 'dsfdfsdfsdfasdasd'),
(32, 'Test Title 3', 'sfsdfdsfasdasdasd', 'dsfdfsdfsdfasdasd'),
(35, 'Test Title 7', 'sfsdfdsfasdasdasd', 'dsfdfsdfsdfasdasd'),
(36, 'Test Title 6', 'sfsdfdsfasdasdasd', 'dsfdfsdfsdfasdasd'),
(38, 'Test Title updated 8', 'sfsdfdsfa', 'sdfdsfds');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
