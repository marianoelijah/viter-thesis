-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2025 at 06:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `worldpeas_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `worldpeas_category`
--

CREATE TABLE `worldpeas_category` (
  `category_aid` int(11) NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_image` varchar(20) NOT NULL,
  `category_title` varchar(30) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `worldpeas_product`
--

CREATE TABLE `worldpeas_product` (
  `products_aid` int(11) NOT NULL,
  `products_is_active` tinyint(1) NOT NULL,
  `products_image` varchar(20) NOT NULL,
  `products_title` varchar(30) NOT NULL,
  `products_price` int(20) NOT NULL,
  `products_category_id` int(11) NOT NULL,
  `products_datetime` varchar(30) NOT NULL,
  `products_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `worldpeas_settings_role`
--

CREATE TABLE `worldpeas_settings_role` (
  `role_aid` int(11) NOT NULL,
  `role_is_active` tinyint(1) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` text NOT NULL,
  `role_created` datetime NOT NULL,
  `role_datetime` datetime NOT NULL,
  `role_is_developer` tinyint(1) NOT NULL,
  `role_is_sample` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `worldpeas_settings_user_developer`
--

CREATE TABLE `worldpeas_settings_user_developer` (
  `user_developer_aid` int(11) NOT NULL,
  `user_developer_is_active` tinyint(1) NOT NULL,
  `user_developer_first_name` varchar(128) NOT NULL,
  `user_developer_last_name` varchar(128) NOT NULL,
  `user_developer_email` varchar(128) NOT NULL,
  `user_developer_new_email` varchar(128) NOT NULL,
  `user_developer_role_id` int(11) NOT NULL,
  `user_developer_key` varchar(255) NOT NULL,
  `user_developer_password` varchar(255) NOT NULL,
  `user_developer_created` datetime NOT NULL,
  `user_developer_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `worldpeas_category`
--
ALTER TABLE `worldpeas_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `worldpeas_product`
--
ALTER TABLE `worldpeas_product`
  ADD PRIMARY KEY (`products_aid`);

--
-- Indexes for table `worldpeas_settings_role`
--
ALTER TABLE `worldpeas_settings_role`
  ADD PRIMARY KEY (`role_aid`);

--
-- Indexes for table `worldpeas_settings_user_developer`
--
ALTER TABLE `worldpeas_settings_user_developer`
  ADD PRIMARY KEY (`user_developer_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `worldpeas_category`
--
ALTER TABLE `worldpeas_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `worldpeas_product`
--
ALTER TABLE `worldpeas_product`
  MODIFY `products_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `worldpeas_settings_role`
--
ALTER TABLE `worldpeas_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `worldpeas_settings_user_developer`
--
ALTER TABLE `worldpeas_settings_user_developer`
  MODIFY `user_developer_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
