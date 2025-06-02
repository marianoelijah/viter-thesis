-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 10:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seedling_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `donated_products`
--

CREATE TABLE `donated_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `donorName` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donated_products`
--

INSERT INTO `donated_products` (`id`, `name`, `category`, `quantity`, `image`, `date`, `donorName`, `notes`) VALUES
(1, 'Cabbage', 'Leafy', 10, 'cabbage.jpg', '2025-05-01', 'Farmer Juan', 'Freshly harvested'),
(2, 'Sweet Potato', 'Root Crops', 15, 'sweet_potato.jpg', '2025-05-02', 'Coop Farm', 'Organic'),
(3, 'Banana', 'Fruits', 20, 'banana.jpg', '2025-05-01', 'Farmer Ana', 'Ripe and ready');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `availableStock` int(11) DEFAULT 0,
  `category` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `productName`, `description`, `quantity`, `availableStock`, `category`, `image`, `type`, `created_at`, `updated_at`, `userId`) VALUES
(1, 'Grapes', 'test', 2, 10, 'Fruit', '1748882428395-grapes.jpg', 'donation', '2025-06-02 16:40:28', '2025-06-02 16:40:28', 0),
(2, 'Papaya', 'test', 2, 10, 'Fruit', '1748883448731-papaya.jpg', 'donation', '2025-06-02 16:57:28', '2025-06-02 16:57:28', 0),
(3, 'Sitaw', 'test', 5, 15, 'Vegetable', '1748883484764-sitaw.jpg', 'donation', '2025-06-02 16:58:04', '2025-06-02 16:58:04', 0),
(4, 'Star Apple', 'test', 4, 10, 'Fruit', '1748883520481-starapple.jpg', 'donation', '2025-06-02 16:58:40', '2025-06-02 16:58:40', 0),
(5, 'Strawberry', 'test', 5, 20, 'Fruit', '1748883548363-strawberry.jpg', 'donation', '2025-06-02 16:59:08', '2025-06-02 16:59:08', 0),
(6, 'Suha', 'test', 2, 10, 'Fruit', '1748883566132-suha.jpg', 'donation', '2025-06-02 16:59:26', '2025-06-02 16:59:26', 0),
(7, 'Tomato', 'test', 20, 25, 'Spice', '1748883610386-tomato.jpg', 'donation', '2025-06-02 17:00:10', '2025-06-02 17:00:10', 0),
(8, 'Rambutan', 'test', 2, 10, 'Fruit', '1748883633384-rambutan.jpg', 'donation', '2025-06-02 17:00:33', '2025-06-02 17:00:33', 0),
(9, 'Saging', 'daks', 5, 10, 'Fruit', '1748883660469-saging.jpg', 'donation', '2025-06-02 17:01:00', '2025-06-02 17:01:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `donation_requests`
--

CREATE TABLE `donation_requests` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `requester_name` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `request_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation_requests`
--

INSERT INTO `donation_requests` (`id`, `donation_id`, `requester_name`, `status`, `request_date`, `email`, `message`) VALUES
(1, 2, 'rovic', 'Pending', '2025-06-02 18:30:23', 'rovicloterte@gmail.com', 'ede');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders2`
--

CREATE TABLE `orders2` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `notes` text DEFAULT NULL,
  `payment_method` varchar(100) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders2`
--

INSERT INTO `orders2` (`id`, `full_name`, `email`, `phone`, `address`, `city`, `postal_code`, `notes`, `payment_method`, `subtotal`, `tax`, `total`, `created_at`, `user_id`) VALUES
(1, 'Don Umali', 'umalidon@gmail.com', '09051927620', 'Manila, Philippines', 'Makati City', '4325', 'jnbjnjknjknjnjknjkn', 'Cash on Delivery', 45.00, 0.00, 45.00, '2025-05-05 18:56:44', 0),
(2, 'Don Umali', 'umalidon@gmail.com', '09051927620', 'Manila, Philippines', 'Makati City', '4325', 'jnbjnjknjknjnjknjkn', 'Cash on Delivery', 45.00, 0.00, 45.00, '2025-05-05 18:56:50', 0),
(3, 'Don Umali', 'umalidon@gmail.com', '09051927620', 'Manila, Philippines', 'Makati City', '4325', 'jnbjnjknjknjnjknjkn', 'Cash on Delivery', 45.00, 0.00, 45.00, '2025-05-05 19:03:47', 0),
(4, 'Don Umali', 'umalidon@gmail.com', '09051927620', 'Manila, Philippines', 'Makati City', '4325', 'jnbjnjknjknjnjknjkn', 'Cash on Delivery', 45.00, 0.00, 45.00, '2025-05-05 19:11:42', 0),
(5, 'Don Umali', 'umalidon@gmail.com', '09051927620', 'Manila, Philippines', 'Makati City', '4325', 'nhdsjknskjnkjsankjln', 'Cash on Delivery', 90.00, 0.00, 90.00, '2025-05-05 19:13:12', 0),
(6, 'Elias Mariano', 'marianoelias811@gmail.com', '09089045902', '60 Sitio Bungad Brgy. Tagbakin Tiaong, Quezon', 'Tiaong, Quezon Province', '4325', 'test', 'cash', 100.00, 12.00, 112.00, '2025-06-01 16:48:19', 0),
(7, 'Elias Mariano', 'marianoelias811@gmail.com', '09089045902', '60 Sitio Bungad Brgy. Tagbakin Tiaong, Quezon', 'Tiaong, Quezon Province', '4325', 'test', 'cash', 1000.00, 120.00, 1120.00, '2025-06-01 22:13:15', 0),
(8, 'River Joseph', 'riverjoseph@gmail.com', '09051927620', '60 Sitio Bungad Brgy. Tagbakin Tiaong, Quezon', 'Tiaong, Quezon Province', '4325', 'test', 'cash', 500.00, 60.00, 560.00, '2025-06-01 23:36:06', 0),
(9, 'Nicki Minaj', 'minajnicki@gmail.com', '09215831475', '5269 Van Burren St. Makati City', 'Makati City', '1234', 'test', 'cash', 500.00, 60.00, 560.00, '2025-06-02 01:47:04', 0),
(10, 'Zhanne Elijah Bermudez Mariano', 'marianoelijah811@gmail.com', '09051927620', '60 Sitio Bungad Brgy. Tagbakin Tiaong, Quezon', 'Tiaong, Quezon Province', '4325', 'test', 'gcash', 225.00, 27.00, 252.00, '2025-06-02 18:47:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`) VALUES
(1, 6, 31, 'Unnamed', 1, 100.00),
(2, 7, 31, 'Unnamed', 10, 100.00),
(3, 8, 31, 'Atis', 5, 100.00),
(4, 9, 31, 'Unnamed', 5, 100.00),
(5, 10, 22, 'Unnamed', 3, 75.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `availableStock` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `quantity`, `availableStock`, `category`, `image`, `created_at`) VALUES
(19, 'Celery', 'Long green beans, crisp and packed with fiber and nutrients.', 25.00, 5, 5, 'Vegetable', '1746249302270-image.jpg', '2025-05-03 05:15:02'),
(20, 'Mais', 'Sweet and golden corn, perfect for roasting or boiling.', 35.00, 5, 8, 'Grain', '1746250414499-image.jpg', '2025-05-03 05:33:34'),
(22, 'Luya', 'Aromatic ginger, ideal for cooking and herbal tea.', 75.00, 3, 10, 'Spice', '1746251083095-image.jpg', '2025-05-03 05:44:43'),
(23, 'Calabasa', 'Nutritious squash, great for soups and stews.', 55.00, 3, 15, 'Vegetable', '1746251130658-image.jpg', '2025-05-03 05:45:30'),
(24, 'Pechay', 'Fresh and leafy pechay, a staple in many Filipino dishes.', 45.00, 5, 12, 'Vegetable', '1746251207889-image.jpg', '2025-05-03 05:46:47'),
(25, 'Patatas', 'Firm and versatile potatoes, perfect for any dish.', 35.00, 4, 10, 'Root Crop', '1746251263600-image.jpg', '2025-05-03 05:47:43'),
(26, 'Sibuyas', 'Freshly harvested onions, essential for adding flavor to meals.', 80.00, 4, 10, 'Spice', '1746251372061-image.jpg', '2025-05-03 05:49:32'),
(27, 'Bawang', 'Pungent and flavorful garlic, perfect for seasoning.', 65.00, 2, 5, 'Spice', '1746251446562-image.jpg', '2025-05-03 05:50:46'),
(31, 'Atis', 'Creamy and sweet custard apples, loaded with vitamin C.', 100.00, 25, 50, 'Fruit', '1746252195399-image.jpg', '2025-05-03 06:03:15'),
(33, 'Mango', 'Sweet and succulent mangoes, perfect for desserts and snacks', 95.00, 4, 10, 'Fruit', '1746252288733-image.jpg', '2025-05-03 06:04:48'),
(35, 'Orange', 'Juicy and zesty oranges, packed with vitamin C.', 150.00, 6, 10, 'Fruit', '1746252651297-image.jpg', '2025-05-03 06:10:51'),
(37, 'Carrots', 'Crunchy carrots, excellent for eyesight and immune support', 90.00, 5, 12, 'Vegetable', '1746252812310-image.jpg', '2025-05-03 06:13:32'),
(38, 'Saging', 'Protein that gives energy to our body.', 65.00, 5, 10, 'Fruit', '1746252876954-image.jpg', '2025-05-03 06:14:36'),
(40, 'Bell Pepper', 'Crisp and crunchy radish, perfect for salads and pickling.', 100.00, 2, 5, 'Spice', '1746253446602-image.jpg', '2025-05-03 06:24:06'),
(43, 'Talong', 'yummy talong, excellent for eyesight and immune support.', 130.00, 2, 5, 'Vegetable', '1746253528135-image.jpg', '2025-05-03 06:25:28'),
(44, 'Sili', 'Spicy chili peppers to add heat to your favorite dishes.', 90.00, 5, 10, 'Spice', '1746253958766-image.jpg', '2025-05-03 06:32:38'),
(45, 'Okra', 'Tender okra pods, great for soups and stir-fries.', 55.00, 5, 12, 'Vegetable', '1746254089601-image.jpg', '2025-05-03 06:34:49'),
(46, 'Star Apple', 'Juicy and milky star apples, a tropical favorite rich in fiber.', 60.00, 5, 20, 'Fruit', '1746352047424-image.jpg', '2025-05-04 09:47:32'),
(47, 'Dalandan', 'Tangy and refreshing dalandan, great for juice or snacking.', 55.00, 5, 20, 'Fruit', '1746352194987-image.jpg', '2025-05-04 09:49:55'),
(48, 'Kamatis', 'Freshly harvested tomato, essential for adding flavor to meals.', 50.00, 5, 15, 'Spice', '1746352289889-image.jpg', '2025-05-04 09:51:29'),
(49, 'Onion White', 'Freshly harvested onions, essential for adding flavor to meals.', 35.00, 5, 0, 'Spice', '1746352472258-image.jpg', '2025-05-04 09:54:32'),
(50, 'Onion Bridge', 'Freshly harvested onions, essential for adding flavor to meals.', 33.00, 4, 0, 'Spice', '1746352537317-image.jpg', '2025-05-04 09:55:38'),
(51, 'Onion Bundle', 'Freshly harvested onions, essential for adding flavor to meals.', 50.00, 5, 0, 'Spice', '1746352621037-image.jpg', '2025-05-04 09:57:01'),
(52, 'KangKong', 'goods', 30.00, 5, 0, 'Vegetable', '1746396430983-image.jpg', '2025-05-04 22:07:11'),
(53, 'Celery', 'keneme', 25.00, 2, 0, 'Spice', '1746418009201-image.jpg', '2025-05-05 04:06:49'),
(54, 'Labanos', 'BBC', 45.00, 5, 0, 'Vegetable', '1746420249922-image.jpg', '2025-05-05 04:44:10'),
(55, 'Chico', 'Golden Brown', 40.00, 3, 0, 'Fruit', '1746421274135-image.png', '2025-05-05 05:01:14'),
(56, 'Luya', 'all godss', 40.00, 2, 0, 'Spice', '1746421825053-image.jpg', '2025-05-05 05:10:25'),
(58, 'Green Peas', 'sigilarias', 25.00, 5, 18, 'Vegetable', '1746508278995-image.png', '2025-05-06 05:11:19'),
(59, 'Luya', 'Goods', 25.00, 3, 20, 'Spice', '1746551675548-image.jpg', '2025-05-06 17:14:38'),
(60, 'Talong', 'mahaba', 35.00, 4, 14, 'Vegetable', '1746553849020-image.jpg', '2025-05-06 17:50:49'),
(62, 'Luya', 'jjbgh', 30.00, 5, 20, 'Spice', '1746573143089-image.jpg', '2025-05-06 23:12:23'),
(63, 'Papaya', 'reach in vitamins and nourish skin complexity', 45.00, 5, 20, 'Fruit', '1746699193668-image.jpg', '2025-05-08 10:13:15'),
(64, 'Suha', 'long', 55.00, 5, 10, 'Fruit', '1748838438154-image.jpg', '2025-06-02 04:27:18');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `purchase_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `buyer_id`, `product_id`, `quantity`, `total_price`, `purchase_date`) VALUES
(2, NULL, 19, 2, 75.00, '2025-06-01 18:29:18');

-- --------------------------------------------------------

--
-- Table structure for table `trades`
--

CREATE TABLE `trades` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trades2`
--

CREATE TABLE `trades2` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trades2`
--

INSERT INTO `trades2` (`id`, `name`, `category`, `price`, `quantity`, `unit`, `description`, `location`, `images`, `user_id`, `created_at`) VALUES
(1, 'Luya', 'Root Crops', 25.00, 5, '20', 'sdfsa', 'San Pablo', '/uploads/1748842677324-543965132-luya.jpg', 0, NULL),
(2, 'Mais', 'Grains', 25.00, 5, '20', 'sweets', 'San Pablo', '/uploads/1748842778358-760176883-mais.jpg', 0, NULL),
(3, 'Onion', 'Spices', 30.00, 5, '20', 'test', 'San Pablo', '/uploads/1748842822681-562033626-onion5.jpg', 0, NULL),
(4, 'Onion Bundle', 'Spices', 50.00, 5, '20', 'test', 'San Pablo', '/uploads/1748842857145-96356074-onion4.jpg', 0, NULL),
(5, 'Ampalaya', 'Vegetables', 35.00, 2, '10', 'test', 'Quezon ', '/uploads/1748842911237-795540972-ampalaya.jpg', 0, NULL),
(6, 'Carrots', 'Vegetables', 35.00, 2, '10', 'test', 'Quezon ', '/uploads/1748842937467-224140634-carrots.jpg', 0, NULL),
(7, 'Calabasa', 'Vegetables', 35.00, 2, '10', 'test', 'Quezon ', '/uploads/1748842967935-350647887-calabasa.jpg', 0, NULL),
(8, 'Mango', 'Fruits', 30.00, 2, '20', 'test', 'Laguna', '/uploads/1748843010029-651235434-mango.jpg', 0, NULL),
(9, 'Papaya', 'Fruits', 30.00, 2, '20', 'test', 'Laguna', '/uploads/1748843032027-812199734-papaya.jpg', 0, NULL),
(10, 'Saging', 'Fruits', 30.00, 2, '20', 'test', 'Laguna', '/uploads/1748843055752-663863629-saging.jpg', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trade_cart`
--

CREATE TABLE `trade_cart` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trade_orders`
--

CREATE TABLE `trade_orders` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `trade_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trade_orders`
--

INSERT INTO `trade_orders` (`id`, `buyer_id`, `product_id`, `quantity`, `status`, `trade_date`) VALUES
(1, 1, 40, 3, 'pending', '2025-05-04 01:47:09'),
(3, 1, 35, 4, 'cancelled', '2025-05-04 01:51:57');

-- --------------------------------------------------------

--
-- Table structure for table `updated_dataset_with_fixed_product_encoded`
--

CREATE TABLE `updated_dataset_with_fixed_product_encoded` (
  `COL 1` varchar(9) DEFAULT NULL,
  `COL 2` varchar(17) DEFAULT NULL,
  `COL 3` varchar(12) DEFAULT NULL,
  `COL 4` varchar(15) DEFAULT NULL,
  `COL 5` varchar(7) DEFAULT NULL,
  `COL 6` varchar(32) DEFAULT NULL,
  `COL 7` varchar(12) DEFAULT NULL,
  `COL 8` varchar(11) DEFAULT NULL,
  `COL 9` varchar(17) DEFAULT NULL,
  `COL 10` varchar(21) DEFAULT NULL,
  `COL 11` varchar(23) DEFAULT NULL,
  `COL 12` varchar(11) DEFAULT NULL,
  `COL 13` varchar(13) DEFAULT NULL,
  `COL 14` varchar(17) DEFAULT NULL,
  `COL 15` varchar(22) DEFAULT NULL,
  `COL 16` varchar(23) DEFAULT NULL,
  `COL 17` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `updated_dataset_with_fixed_product_encoded`
--

INSERT INTO `updated_dataset_with_fixed_product_encoded` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`) VALUES
('User ID', 'Product Purchased', 'Times Bought', 'Would Buy Again', 'Ratings', 'Comments', 'Search Count', 'Click Count', 'Add-to-Cart Count', 'Actual Purchase Count', 'Session Duration (mins)', 'Device Type', 'User Location', 'Average Spend (₱)', 'Last Purchased Product', 'Platform Feedback Score', 'product_encoded'),
('User_001', 'Sitaw', 'More than 5', 'No', '2', 'Satisfied overall.', '19', '24', '9', '10', '12.77', 'Mobile', 'San Pablo', '165.82', 'Carrot', '5', '2.0'),
('User_002', 'Sitaw', '1', 'Yes', '2', 'The UI is intuitive.', '14', '16', '4', '12', '3.49', 'Desktop', 'Calamba', '445.35', 'Pechay', '5', '2.0'),
('User_003', 'Eggplant', '1', 'Yes', '3', 'Helpful for small farmers.', '12', '10', '9', '7', '8.79', 'Tablet', 'Lucena', '363.92', 'Pechay', '4', '8.0'),
('User_004', 'Corn', '3-Feb', 'No', '4', 'Very easy to use platform.', '13', '19', '0', '15', '6.73', 'Mobile', 'Lipa', '108.76', 'Sitaw', '5', '6.0'),
('User_005', 'Mango', '3-Feb', 'Yes', '5', 'Could use better product search.', '5', '11', '6', '12', '14.7', 'Tablet', 'San Pablo', '494.63', 'Carrot', '3', '12.0'),
('User_006', 'Luya', 'More than 5', 'No', '4', 'Could use better product search.', '2', '21', '9', '7', '2.01', 'Tablet', 'San Pablo', '449.35', 'Okra', '5', '4.0'),
('User_007', 'Okra', '1', 'Yes', '5', 'Great initiative!', '3', '5', '7', '4', '5.67', 'Desktop', 'Calamba', '209.87', 'Luya', '4', '10.0'),
('User_008', 'Cabbage', 'More than 5', 'Yes', '5', 'Great initiative!', '12', '6', '10', '5', '6.44', 'Mobile', 'Calamba', '255.17', 'Eggplant', '3', '20.0'),
('User_009', 'Eggplant', '5-Apr', 'Yes', '2', 'Very easy to use platform.', '17', '17', '9', '12', '3.45', 'Desktop', 'Batangas', '382.2', 'Eggplant', '5', '8.0'),
('User_010', 'Luya', '1', 'Yes', '3', 'I love the recommendations!', '4', '14', '3', '7', '7.48', 'Desktop', 'Lipa', '273.57', 'Sibuyas', '5', '4.0'),
('User_011', 'Luya', '3-Feb', 'No', '1', 'Will use again.', '17', '7', '1', '9', '13.48', 'Desktop', 'Batangas', '303.56', 'Sitaw', '5', '4.0'),
('User_012', 'Cabbage', 'More than 5', 'Yes', '4', 'Fast delivery and great quality!', '20', '18', '3', '10', '3.81', 'Desktop', 'Lucena', '462.26', 'Luya', '4', '20.0'),
('User_013', 'Sitaw', '1', 'Yes', '5', 'I love the recommendations!', '16', '30', '6', '7', '9.93', 'Desktop', 'Lipa', '394.84', 'Mango', '3', '2.0'),
('User_014', 'Corn', '3-Feb', 'Yes', '1', 'Needs improvements.', '15', '20', '7', '2', '14.7', 'Desktop', 'San Pablo', '373.14', 'Eggplant', '3', '6.0'),
('User_015', 'Okra', '3-Feb', 'Yes', '1', 'Satisfied overall.', '18', '29', '1', '4', '2.07', 'Mobile', 'Calamba', '391.33', 'Tomato', '4', '10.0'),
('User_016', 'Patatas', '3-Feb', 'No', '1', 'The UI is intuitive.', '15', '4', '6', '3', '13.87', 'Desktop', 'San Pablo', '344.41', 'Bawang', '3', '7.0'),
('User_017', 'Papaya', 'More than 5', 'Yes', '5', 'Helpful for small farmers.', '10', '30', '3', '10', '4.45', 'Desktop', 'Lucena', '417.96', 'Calabasa', '3', '0.0'),
('User_018', 'Calabasa', '3-Feb', 'Yes', '2', 'Will use again.', '16', '5', '6', '1', '12.91', 'Mobile', 'Batangas', '133.03', 'Pechay', '4', '5.0'),
('User_019', 'Sibuyas', '1', 'Yes', '4', 'Will use again.', '12', '23', '4', '5', '10.53', 'Mobile', 'San Pablo', '64.28', 'Mango', '5', '8.0'),
('User_020', 'Sibuyas', '5-Apr', 'Yes', '2', 'I love the recommendations!', '1', '23', '9', '11', '10.29', 'Tablet', 'Batangas', '402.06', 'Calabasa', '3', '8.0'),
('User_021', 'Cabbage', '1', 'No', '2', 'The UI is intuitive.', '6', '6', '9', '5', '8.55', 'Desktop', 'Lipa', '401.49', 'Papaya', '3', '20.0'),
('User_022', 'Tomato', 'More than 5', 'No', '2', 'Needs improvements.', '5', '25', '7', '14', '11.55', 'Desktop', 'Lucena', '192.7', 'Patatas', '4', '21.0'),
('User_023', 'Mango', 'More than 5', 'Yes', '2', 'Helpful for small farmers.', '12', '26', '7', '9', '13.57', 'Mobile', 'Calamba', '331.16', 'Cabbage', '4', '12.0'),
('User_024', 'Corn', 'More than 5', 'No', '4', 'Will use again.', '5', '11', '2', '13', '13.55', 'Desktop', 'Calamba', '156.24', 'Sibuyas', '3', '6.0'),
('User_025', 'Pechay', 'More than 5', 'Yes', '1', 'I love the recommendations!', '9', '28', '0', '15', '6.64', 'Desktop', 'Calamba', '204.46', 'Carrot', '5', '6.0'),
('User_026', 'Tomato', 'More than 5', 'No', '1', 'Very easy to use platform.', '6', '21', '5', '6', '3.62', 'Tablet', 'Calamba', '330.09', 'Mango', '4', '21.0'),
('User_027', 'Corn', '3-Feb', 'No', '4', 'Great initiative!', '1', '11', '6', '5', '14.63', 'Tablet', 'Lucena', '322.71', 'Calabasa', '5', '6.0'),
('User_028', 'Bell Pepper', 'More than 5', 'No', '5', 'Great initiative!', '1', '22', '10', '3', '1.5', 'Desktop', 'Lucena', '339.55', 'Papaya', '3', '2.0'),
('User_029', 'Patatas', 'More than 5', 'Yes', '1', 'Satisfied overall.', '5', '18', '0', '12', '6.42', 'Tablet', 'Batangas', '119.48', 'Luya', '4', '7.0'),
('User_030', 'Bell Pepper', '3-Feb', 'Yes', '4', 'Great initiative!', '15', '20', '6', '9', '7.46', 'Desktop', 'Batangas', '54.41', 'Sitaw', '5', '2.0'),
('User_031', 'Tomato', '3-Feb', 'No', '2', 'Great initiative!', '2', '17', '7', '12', '4.37', 'Desktop', 'Lipa', '189.63', 'Bawang', '5', '21.0'),
('User_032', 'Bell Pepper', '3-Feb', 'Yes', '2', 'Satisfied overall.', '9', '10', '3', '12', '6.96', 'Tablet', 'Batangas', '439.44', 'Sitaw', '3', '2.0'),
('User_033', 'Patatas', '1', 'No', '1', 'I love the recommendations!', '18', '26', '6', '1', '14.0', 'Mobile', 'Lipa', '397.82', 'Sibuyas', '3', '7.0'),
('User_034', 'Eggplant', 'More than 5', 'Yes', '5', 'Helpful for small farmers.', '8', '22', '5', '6', '10.2', 'Desktop', 'Batangas', '144.82', 'Bawang', '4', '8.0'),
('User_035', 'Sibuyas', '1', 'Yes', '5', 'The UI is intuitive.', '7', '7', '10', '8', '7.63', 'Desktop', 'San Pablo', '165.79', 'Calabasa', '3', '8.0'),
('User_036', 'Eggplant', '3-Feb', 'No', '3', 'Very easy to use platform.', '13', '2', '10', '8', '5.01', 'Desktop', 'Calamba', '424.96', 'Eggplant', '3', '8.0'),
('User_037', 'Carrot', '1', 'Yes', '2', 'Will use again.', '8', '11', '5', '12', '13.26', 'Tablet', 'Lipa', '209.53', 'Okra', '4', '5.0'),
('User_038', 'Pechay', '3-Feb', 'No', '1', 'Needs improvements.', '19', '19', '8', '3', '4.74', 'Desktop', 'Lucena', '383.47', 'Papaya', '3', '6.0'),
('User_039', 'Sitaw', '5-Apr', 'Yes', '1', 'Satisfied overall.', '18', '19', '7', '3', '11.11', 'Tablet', 'Calamba', '483.92', 'Patatas', '4', '2.0'),
('User_040', 'Carrot', 'More than 5', 'No', '1', 'Satisfied overall.', '8', '18', '0', '4', '10.76', 'Mobile', 'Lipa', '108.27', 'Bell Pepper', '5', '5.0'),
('User_041', 'Pechay', 'More than 5', 'No', '1', 'I love the recommendations!', '6', '26', '8', '1', '9.39', 'Tablet', 'Lucena', '286.03', 'Carrot', '4', '6.0'),
('User_042', 'Corn', '1', 'Yes', '5', 'Helpful for small farmers.', '14', '5', '9', '12', '10.66', 'Tablet', 'Lipa', '249.66', 'Bawang', '5', '6.0'),
('User_043', 'Calabasa', '5-Apr', 'No', '2', 'I love the recommendations!', '2', '18', '4', '15', '5.71', 'Desktop', 'San Pablo', '278.15', 'Eggplant', '3', '5.0'),
('User_044', 'Corn', '1', 'No', '4', 'The UI is intuitive.', '9', '9', '10', '4', '6.43', 'Mobile', 'Batangas', '436.02', 'Eggplant', '3', '6.0'),
('User_045', 'Sitaw', 'More than 5', 'Yes', '4', 'Very easy to use platform.', '18', '25', '5', '4', '8.01', 'Mobile', 'San Pablo', '486.36', 'Pechay', '4', '2.0'),
('User_046', 'Bell Pepper', '1', 'Yes', '4', 'I love the recommendations!', '12', '15', '8', '2', '13.4', 'Mobile', 'San Pablo', '255.45', 'Tomato', '4', '2.0'),
('User_047', 'Calabasa', '5-Apr', 'Yes', '4', 'Very easy to use platform.', '15', '1', '10', '10', '4.9', 'Mobile', 'Calamba', '185.84', 'Calabasa', '4', '5.0'),
('User_048', 'Luya', '3-Feb', 'Yes', '3', 'Great initiative!', '12', '25', '8', '13', '7.82', 'Mobile', 'Lipa', '390.41', 'Patatas', '4', '4.0'),
('User_049', 'Bawang', '5-Apr', 'Yes', '1', 'Will use again.', '3', '13', '9', '14', '9.13', 'Mobile', 'San Pablo', '265.89', 'Corn', '4', '9.0'),
('User_050', 'Luya', '3-Feb', 'No', '2', 'Satisfied overall.', '11', '1', '9', '9', '6.85', 'Desktop', 'San Pablo', '232.17', 'Carrot', '4', '4.0'),
('User_051', 'Sitaw', 'More than 5', 'Yes', '1', 'Will use again.', '11', '9', '9', '12', '11.85', 'Mobile', 'Batangas', '85.99', 'Calabasa', '3', '2.0'),
('User_052', 'Sitaw', 'More than 5', 'Yes', '1', 'Fast delivery and great quality!', '20', '6', '4', '15', '10.9', 'Desktop', 'Batangas', '250.23', 'Papaya', '3', '2.0'),
('User_053', 'Bell Pepper', '5-Apr', 'Yes', '5', 'I love the recommendations!', '4', '30', '7', '2', '10.59', 'Desktop', 'Batangas', '446.36', 'Patatas', '4', '2.0'),
('User_054', 'Calabasa', '3-Feb', 'Yes', '3', 'The UI is intuitive.', '20', '6', '0', '11', '5.28', 'Mobile', 'Batangas', '376.29', 'Corn', '4', '5.0'),
('User_055', 'Sitaw', 'More than 5', 'Yes', '1', 'Will use again.', '16', '9', '1', '15', '8.99', 'Desktop', 'Lipa', '211.71', 'Cabbage', '3', '2.0'),
('User_056', 'Mango', '5-Apr', 'Yes', '4', 'Helpful for small farmers.', '17', '28', '6', '9', '10.58', 'Tablet', 'Batangas', '403.32', 'Luya', '5', '12.0'),
('User_057', 'Papaya', '1', 'No', '5', 'Helpful for small farmers.', '19', '19', '4', '15', '7.47', 'Desktop', 'Calamba', '481.65', 'Cabbage', '4', '0.0'),
('User_058', 'Eggplant', '5-Apr', 'No', '1', 'I love the recommendations!', '1', '10', '5', '1', '10.46', 'Tablet', 'Lucena', '69.91', 'Calabasa', '3', '8.0'),
('User_059', 'Sibuyas', 'More than 5', 'No', '3', 'I love the recommendations!', '8', '25', '3', '15', '7.55', 'Mobile', 'Batangas', '81.17', 'Mango', '4', '8.0'),
('User_060', 'Luya', '3-Feb', 'Yes', '2', 'Satisfied overall.', '8', '26', '10', '10', '10.21', 'Tablet', 'Calamba', '454.07', 'Tomato', '3', '4.0'),
('User_061', 'Calabasa', '1', 'Yes', '5', 'Very easy to use platform.', '20', '11', '1', '1', '6.59', 'Tablet', 'Lucena', '355.36', 'Okra', '4', '5.0'),
('User_062', 'Mango', '1', 'Yes', '5', 'Will use again.', '1', '30', '7', '6', '10.69', 'Tablet', 'Calamba', '271.32', 'Patatas', '5', '12.0'),
('User_063', 'Patatas', 'More than 5', 'No', '2', 'Fast delivery and great quality!', '4', '2', '1', '13', '14.58', 'Mobile', 'Batangas', '454.57', 'Sitaw', '3', '7.0'),
('User_064', 'Papaya', '1', 'Yes', '1', 'Satisfied overall.', '6', '15', '5', '10', '5.08', 'Desktop', 'Batangas', '58.35', 'Okra', '4', '0.0'),
('User_065', 'Mango', '5-Apr', 'Yes', '2', 'Satisfied overall.', '8', '10', '9', '8', '6.73', 'Mobile', 'San Pablo', '498.11', 'Luya', '3', '12.0'),
('User_066', 'Bawang', 'More than 5', 'Yes', '5', 'Needs improvements.', '3', '25', '5', '2', '5.82', 'Mobile', 'Calamba', '321.23', 'Eggplant', '5', '9.0'),
('User_067', 'Corn', '5-Apr', 'Yes', '2', 'Needs improvements.', '15', '11', '5', '3', '10.93', 'Tablet', 'Calamba', '127.91', 'Mango', '4', '6.0'),
('User_068', 'Bell Pepper', '1', 'Yes', '5', 'Needs improvements.', '7', '25', '0', '1', '12.35', 'Desktop', 'Lipa', '478.57', 'Bell Pepper', '5', '2.0'),
('User_069', 'Mango', '1', 'No', '4', 'I love the recommendations!', '10', '29', '7', '8', '5.5', 'Tablet', 'Calamba', '121.83', 'Tomato', '3', '12.0'),
('User_070', 'Bell Pepper', '5-Apr', 'Yes', '5', 'Satisfied overall.', '19', '8', '3', '9', '6.53', 'Mobile', 'Calamba', '97.63', 'Mango', '4', '2.0'),
('User_071', 'Sibuyas', '5-Apr', 'Yes', '3', 'Satisfied overall.', '3', '23', '9', '2', '3.17', 'Desktop', 'Calamba', '438.5', 'Patatas', '5', '8.0'),
('User_072', 'Sibuyas', 'More than 5', 'No', '4', 'Fast delivery and great quality!', '16', '5', '6', '5', '6.58', 'Desktop', 'Lipa', '391.57', 'Carrot', '5', '8.0'),
('User_073', 'Patatas', '3-Feb', 'Yes', '5', 'Needs improvements.', '20', '21', '5', '10', '7.44', 'Desktop', 'Batangas', '193.03', 'Carrot', '4', '7.0'),
('User_074', 'Sibuyas', '1', 'Yes', '2', 'Helpful for small farmers.', '19', '19', '1', '1', '13.25', 'Tablet', 'Lipa', '200.53', 'Carrot', '5', '8.0'),
('User_075', 'Sitaw', '3-Feb', 'No', '3', 'Very easy to use platform.', '2', '6', '1', '12', '14.07', 'Mobile', 'Lucena', '319.15', 'Papaya', '5', '2.0'),
('User_076', 'Mango', 'More than 5', 'Yes', '4', 'The UI is intuitive.', '7', '1', '0', '14', '10.43', 'Desktop', 'Lucena', '155.82', 'Bawang', '4', '12.0'),
('User_077', 'Bell Pepper', 'More than 5', 'No', '2', 'The UI is intuitive.', '5', '2', '10', '9', '6.8', 'Tablet', 'Lipa', '403.35', 'Papaya', '5', '2.0'),
('User_078', 'Patatas', '5-Apr', 'Yes', '5', 'I love the recommendations!', '14', '29', '8', '11', '12.77', 'Tablet', 'Batangas', '406.32', 'Bell Pepper', '4', '7.0'),
('User_079', 'Cabbage', '5-Apr', 'Yes', '4', 'Very easy to use platform.', '6', '26', '1', '2', '10.9', 'Mobile', 'Batangas', '107.22', 'Luya', '5', '20.0'),
('User_080', 'Sibuyas', '3-Feb', 'No', '4', 'Will use again.', '10', '15', '0', '13', '5.67', 'Desktop', 'Lucena', '176.3', 'Tomato', '4', '8.0'),
('User_081', 'Patatas', 'More than 5', 'Yes', '5', 'Could use better product search.', '2', '3', '4', '6', '2.63', 'Mobile', 'San Pablo', '350.51', 'Patatas', '3', '7.0'),
('User_082', 'Luya', '3-Feb', 'Yes', '1', 'Very easy to use platform.', '19', '6', '5', '12', '3.56', 'Tablet', 'Lucena', '123.91', 'Sibuyas', '3', '4.0'),
('User_083', 'Mango', 'More than 5', 'Yes', '1', 'Could use better product search.', '5', '25', '2', '7', '5.57', 'Desktop', 'Calamba', '350.64', 'Cabbage', '5', '12.0'),
('User_084', 'Bell Pepper', 'More than 5', 'Yes', '2', 'Very easy to use platform.', '15', '1', '10', '11', '10.49', 'Desktop', 'Lucena', '366.51', 'Bawang', '3', '2.0'),
('User_085', 'Eggplant', '3-Feb', 'No', '2', 'Great initiative!', '12', '14', '1', '9', '12.28', 'Tablet', 'San Pablo', '137.16', 'Corn', '4', '8.0'),
('User_086', 'Papaya', 'More than 5', 'No', '4', 'Great initiative!', '9', '18', '8', '5', '3.37', 'Desktop', 'Lucena', '160.28', 'Corn', '3', '0.0'),
('User_087', 'Mango', '1', 'Yes', '2', 'Great initiative!', '9', '17', '7', '8', '6.64', 'Mobile', 'Calamba', '270.46', 'Luya', '5', '12.0'),
('User_088', 'Bawang', '1', 'No', '4', 'Could use better product search.', '7', '14', '10', '2', '9.77', 'Tablet', 'Calamba', '109.22', 'Cabbage', '3', '9.0'),
('User_089', 'Papaya', 'More than 5', 'Yes', '5', 'Fast delivery and great quality!', '15', '18', '10', '14', '7.32', 'Tablet', 'San Pablo', '314.51', 'Okra', '3', '0.0'),
('User_090', 'Papaya', '1', 'No', '3', 'Great initiative!', '19', '26', '3', '13', '14.21', 'Desktop', 'San Pablo', '467.62', 'Eggplant', '4', '0.0'),
('User_091', 'Mango', 'More than 5', 'Yes', '1', 'Very easy to use platform.', '7', '30', '2', '2', '1.59', 'Mobile', 'Lipa', '296.97', 'Calabasa', '5', '12.0'),
('User_092', 'Okra', '5-Apr', 'No', '3', 'Needs improvements.', '19', '6', '9', '8', '9.27', 'Mobile', 'Batangas', '430.19', 'Eggplant', '4', '10.0'),
('User_093', 'Carrot', '3-Feb', 'Yes', '5', 'Great initiative!', '4', '5', '1', '12', '6.06', 'Mobile', 'Calamba', '221.62', 'Bell Pepper', '4', '5.0'),
('User_094', 'Eggplant', '5-Apr', 'Yes', '3', 'Very easy to use platform.', '7', '12', '7', '10', '14.39', 'Tablet', 'Calamba', '312.71', 'Calabasa', '4', '8.0'),
('User_095', 'Bell Pepper', '3-Feb', 'No', '3', 'I love the recommendations!', '18', '12', '9', '5', '9.36', 'Mobile', 'Calamba', '332.04', 'Bell Pepper', '4', '2.0'),
('User_096', 'Bawang', 'More than 5', 'No', '4', 'Great initiative!', '16', '6', '8', '5', '7.84', 'Desktop', 'Calamba', '80.83', 'Corn', '4', '9.0'),
('User_097', 'Corn', '1', 'Yes', '4', 'Could use better product search.', '8', '1', '0', '7', '4.13', 'Desktop', 'Batangas', '178.86', 'Papaya', '3', '6.0'),
('User_098', 'Eggplant', '1', 'Yes', '3', 'Could use better product search.', '11', '29', '9', '3', '10.12', 'Desktop', 'Calamba', '70.76', 'Cabbage', '4', '8.0'),
('User_099', 'Luya', 'More than 5', 'Yes', '1', 'Satisfied overall.', '9', '28', '5', '5', '11.33', 'Tablet', 'Lucena', '215.44', 'Luya', '4', '4.0'),
('User_100', 'Tomato', 'More than 5', 'No', '3', 'I love the recommendations!', '4', '23', '10', '12', '11.82', 'Tablet', 'Lucena', '361.25', 'Eggplant', '4', '21.0'),
('User_101', 'Bell Pepper', '1', 'Yes', '1', 'I love the recommendations!', '3', '27', '2', '4', '9.45', 'Desktop', 'Lucena', '190.51', 'Patatas', '5', '2.0'),
('User_102', 'Luya', 'More than 5', 'Yes', '5', 'Needs improvements.', '1', '19', '9', '8', '12.32', 'Desktop', 'Calamba', '275.45', 'Bawang', '5', '4.0'),
('User_103', 'Cabbage', 'More than 5', 'Yes', '2', 'Helpful for small farmers.', '3', '16', '7', '15', '10.29', 'Desktop', 'Lucena', '71.65', 'Mango', '3', '20.0'),
('User_104', 'Corn', 'More than 5', 'No', '3', 'Great initiative!', '11', '14', '9', '1', '5.12', 'Desktop', 'Lipa', '370.27', 'Carrot', '5', '6.0'),
('User_105', 'Corn', '3-Feb', 'No', '4', 'Great initiative!', '12', '5', '7', '8', '10.92', 'Desktop', 'Calamba', '321.05', 'Calabasa', '5', '6.0'),
('User_106', 'Luya', 'More than 5', 'No', '2', 'Great initiative!', '7', '13', '2', '13', '4.77', 'Tablet', 'Lipa', '179.04', 'Patatas', '3', '4.0'),
('User_107', 'Tomato', '1', 'No', '5', 'Great initiative!', '7', '28', '7', '1', '10.54', 'Mobile', 'San Pablo', '150.82', 'Bell Pepper', '3', '21.0'),
('User_108', 'Mango', 'More than 5', 'No', '2', 'Could use better product search.', '15', '18', '10', '9', '7.66', 'Tablet', 'Batangas', '321.7', 'Bawang', '4', '12.0'),
('User_109', 'Eggplant', 'More than 5', 'No', '1', 'Will use again.', '12', '3', '8', '5', '13.96', 'Desktop', 'Batangas', '163.42', 'Patatas', '5', '8.0'),
('User_110', 'Pechay', '3-Feb', 'No', '3', 'Needs improvements.', '15', '27', '8', '14', '10.55', 'Mobile', 'Lucena', '311.22', 'Eggplant', '5', '6.0'),
('User_111', 'Carrot', '3-Feb', 'Yes', '4', 'Very easy to use platform.', '19', '23', '9', '4', '11.45', 'Mobile', 'Batangas', '155.27', 'Mango', '5', '5.0'),
('User_112', 'Sitaw', '3-Feb', 'Yes', '2', 'Will use again.', '13', '19', '5', '4', '1.81', 'Mobile', 'Calamba', '74.05', 'Carrot', '3', '2.0'),
('User_113', 'Mango', 'More than 5', 'No', '2', 'Will use again.', '13', '21', '5', '1', '7.69', 'Desktop', 'Batangas', '176.56', 'Bell Pepper', '5', '12.0'),
('User_114', 'Calabasa', '5-Apr', 'No', '1', 'Could use better product search.', '7', '27', '9', '10', '4.2', 'Desktop', 'Lipa', '180.96', 'Patatas', '5', '5.0'),
('User_115', 'Okra', '1', 'Yes', '3', 'Great initiative!', '3', '21', '0', '15', '9.1', 'Tablet', 'Calamba', '320.78', 'Bawang', '4', '10.0'),
('User_116', 'Tomato', '5-Apr', 'No', '5', 'Very easy to use platform.', '7', '15', '6', '6', '2.85', 'Desktop', 'Calamba', '303.72', 'Cabbage', '4', '21.0'),
('User_117', 'Okra', '3-Feb', 'Yes', '4', 'Could use better product search.', '19', '5', '4', '10', '5.26', 'Mobile', 'Lipa', '238.29', 'Okra', '4', '10.0'),
('User_118', 'Pechay', '3-Feb', 'No', '3', 'The UI is intuitive.', '8', '22', '3', '3', '9.44', 'Desktop', 'Calamba', '312.95', 'Cabbage', '5', '6.0'),
('User_119', 'Bell Pepper', 'More than 5', 'Yes', '3', 'Needs improvements.', '4', '26', '3', '9', '13.12', 'Tablet', 'Calamba', '182.03', 'Bawang', '5', '2.0'),
('User_120', 'Eggplant', '5-Apr', 'No', '2', 'Very easy to use platform.', '11', '2', '0', '1', '3.29', 'Tablet', 'Batangas', '54.29', 'Sibuyas', '4', '8.0'),
('User_121', 'Mango', '5-Apr', 'No', '2', 'Satisfied overall.', '17', '21', '9', '9', '4.8', 'Mobile', 'Lucena', '95.79', 'Cabbage', '5', '12.0'),
('User_122', 'Carrot', '5-Apr', 'No', '3', 'Very easy to use platform.', '20', '3', '6', '11', '6.52', 'Mobile', 'Lipa', '401.11', 'Luya', '5', '5.0'),
('User_123', 'Okra', '1', 'No', '2', 'Very easy to use platform.', '6', '20', '0', '8', '7.61', 'Desktop', 'San Pablo', '117.05', 'Cabbage', '3', '10.0'),
('User_124', 'Cabbage', '3-Feb', 'No', '2', 'Very easy to use platform.', '20', '13', '9', '11', '3.87', 'Tablet', 'Lucena', '130.52', 'Carrot', '5', '20.0'),
('User_125', 'Sibuyas', '3-Feb', 'Yes', '5', 'Very easy to use platform.', '7', '4', '1', '10', '13.85', 'Tablet', 'San Pablo', '199.28', 'Okra', '4', '8.0'),
('User_126', 'Cabbage', '1', 'Yes', '3', 'Helpful for small farmers.', '7', '16', '7', '7', '13.52', 'Desktop', 'Lipa', '114.52', 'Bell Pepper', '4', '20.0'),
('User_127', 'Cabbage', 'More than 5', 'No', '1', 'The UI is intuitive.', '11', '30', '7', '15', '9.14', 'Tablet', 'San Pablo', '145.28', 'Calabasa', '4', '20.0'),
('User_128', 'Patatas', '1', 'No', '4', 'Fast delivery and great quality!', '19', '14', '7', '7', '4.72', 'Tablet', 'Lipa', '224.06', 'Sibuyas', '3', '7.0'),
('User_129', 'Corn', '1', 'Yes', '4', 'Needs improvements.', '19', '21', '5', '13', '2.52', 'Mobile', 'Batangas', '356.32', 'Tomato', '4', '6.0'),
('User_130', 'Carrot', '3-Feb', 'No', '1', 'I love the recommendations!', '15', '29', '9', '15', '5.49', 'Desktop', 'Calamba', '99.65', 'Luya', '4', '5.0'),
('User_131', 'Okra', '5-Apr', 'Yes', '4', 'I love the recommendations!', '8', '19', '1', '9', '9.44', 'Mobile', 'San Pablo', '232.23', 'Mango', '4', '10.0'),
('User_132', 'Tomato', 'More than 5', 'Yes', '3', 'The UI is intuitive.', '5', '11', '2', '12', '13.94', 'Desktop', 'Calamba', '163.02', 'Patatas', '3', '21.0'),
('User_133', 'Cabbage', 'More than 5', 'No', '4', 'Needs improvements.', '12', '3', '4', '3', '4.56', 'Tablet', 'Lucena', '66.47', 'Bell Pepper', '4', '20.0'),
('User_134', 'Tomato', '3-Feb', 'Yes', '3', 'I love the recommendations!', '15', '12', '7', '1', '4.4', 'Tablet', 'Calamba', '413.93', 'Okra', '3', '21.0'),
('User_135', 'Sitaw', '1', 'Yes', '5', 'Fast delivery and great quality!', '10', '26', '7', '13', '7.06', 'Tablet', 'Lucena', '51.07', 'Pechay', '3', '2.0'),
('User_136', 'Mango', '5-Apr', 'No', '3', 'Fast delivery and great quality!', '11', '4', '3', '3', '10.99', 'Tablet', 'Lucena', '316.01', 'Papaya', '5', '12.0'),
('User_137', 'Pechay', '5-Apr', 'No', '1', 'Helpful for small farmers.', '12', '5', '3', '8', '6.48', 'Mobile', 'Batangas', '83.75', 'Calabasa', '5', '6.0'),
('User_138', 'Papaya', '3-Feb', 'No', '5', 'Fast delivery and great quality!', '13', '1', '3', '2', '14.49', 'Mobile', 'San Pablo', '152.62', 'Carrot', '5', '0.0'),
('User_139', 'Luya', '5-Apr', 'No', '5', 'Very easy to use platform.', '3', '10', '5', '12', '4.31', 'Mobile', 'Calamba', '240.46', 'Papaya', '5', '4.0'),
('User_140', 'Luya', 'More than 5', 'No', '2', 'Satisfied overall.', '4', '23', '8', '5', '1.34', 'Tablet', 'Calamba', '261.67', 'Tomato', '4', '4.0'),
('User_141', 'Okra', '3-Feb', 'No', '5', 'Satisfied overall.', '17', '14', '0', '10', '1.95', 'Tablet', 'Batangas', '101.07', 'Carrot', '5', '10.0'),
('User_142', 'Okra', '1', 'Yes', '3', 'I love the recommendations!', '11', '27', '3', '15', '1.91', 'Mobile', 'Lucena', '408.3', 'Papaya', '4', '10.0'),
('User_143', 'Bawang', '3-Feb', 'No', '1', 'Fast delivery and great quality!', '18', '23', '3', '11', '2.91', 'Tablet', 'Lucena', '314.01', 'Calabasa', '4', '9.0'),
('User_144', 'Luya', '1', 'No', '4', 'Will use again.', '10', '25', '9', '10', '1.52', 'Desktop', 'Lipa', '161.81', 'Corn', '4', '4.0'),
('User_145', 'Bell Pepper', 'More than 5', 'Yes', '5', 'Satisfied overall.', '4', '19', '0', '1', '5.72', 'Desktop', 'Batangas', '68.85', 'Okra', '3', '2.0'),
('User_146', 'Bell Pepper', '5-Apr', 'No', '3', 'Will use again.', '9', '23', '1', '15', '14.19', 'Tablet', 'Lucena', '404.48', 'Tomato', '3', '2.0'),
('User_147', 'Bawang', '3-Feb', 'No', '2', 'I love the recommendations!', '10', '15', '3', '3', '9.4', 'Desktop', 'Calamba', '330.43', 'Pechay', '4', '9.0'),
('User_148', 'Bawang', '3-Feb', 'Yes', '5', 'I love the recommendations!', '9', '28', '5', '4', '6.56', 'Tablet', 'Lucena', '435.59', 'Calabasa', '5', '9.0'),
('User_149', 'Okra', 'More than 5', 'Yes', '4', 'Helpful for small farmers.', '15', '29', '6', '7', '5.41', 'Tablet', 'Lucena', '455.24', 'Eggplant', '3', '10.0'),
('User_150', 'Eggplant', '1', 'No', '4', 'Great initiative!', '2', '24', '6', '13', '9.76', 'Mobile', 'Calamba', '169.83', 'Sibuyas', '4', '8.0'),
('User_151', 'Carrot', '3-Feb', 'No', '5', 'Will use again.', '1', '14', '5', '12', '3.49', 'Mobile', 'Lucena', '452.55', 'Eggplant', '5', '5.0'),
('User_152', 'Eggplant', '1', 'No', '4', 'I love the recommendations!', '8', '9', '10', '2', '7.95', 'Tablet', 'Calamba', '89.93', 'Tomato', '4', '8.0'),
('User_153', 'Sibuyas', '5-Apr', 'No', '3', 'Satisfied overall.', '2', '21', '2', '12', '13.19', 'Mobile', 'Lipa', '450.49', 'Corn', '4', '8.0'),
('User_154', 'Tomato', '5-Apr', 'No', '2', 'Great initiative!', '9', '5', '2', '9', '14.5', 'Desktop', 'San Pablo', '299.79', 'Bawang', '4', '21.0'),
('User_155', 'Carrot', '3-Feb', 'No', '3', 'Will use again.', '15', '30', '2', '6', '10.96', 'Mobile', 'Batangas', '465.42', 'Pechay', '4', '5.0'),
('User_156', 'Okra', 'More than 5', 'Yes', '2', 'The UI is intuitive.', '9', '28', '8', '7', '4.99', 'Desktop', 'Batangas', '492.23', 'Carrot', '3', '10.0'),
('User_157', 'Sitaw', '5-Apr', 'No', '5', 'Very easy to use platform.', '3', '17', '8', '10', '1.25', 'Desktop', 'Lipa', '287.23', 'Eggplant', '5', '2.0'),
('User_158', 'Corn', '1', 'No', '4', 'Will use again.', '18', '21', '3', '11', '13.43', 'Tablet', 'Batangas', '393.68', 'Okra', '5', '6.0'),
('User_159', 'Sibuyas', '3-Feb', 'Yes', '5', 'Could use better product search.', '5', '4', '10', '12', '4.18', 'Desktop', 'Calamba', '112.61', 'Patatas', '5', '8.0'),
('User_160', 'Okra', 'More than 5', 'Yes', '1', 'Will use again.', '14', '10', '3', '12', '5.48', 'Tablet', 'San Pablo', '58.98', 'Luya', '3', '10.0'),
('User_161', 'Luya', '1', 'No', '2', 'Very easy to use platform.', '13', '8', '3', '10', '8.65', 'Desktop', 'Calamba', '466.35', 'Mango', '5', '4.0'),
('User_162', 'Tomato', '3-Feb', 'No', '4', 'Will use again.', '9', '28', '10', '4', '8.94', 'Mobile', 'Lipa', '349.78', 'Corn', '5', '21.0'),
('User_163', 'Eggplant', '3-Feb', 'Yes', '3', 'Needs improvements.', '8', '16', '10', '11', '5.57', 'Mobile', 'San Pablo', '98.57', 'Calabasa', '3', '8.0'),
('User_164', 'Sitaw', '3-Feb', 'No', '4', 'I love the recommendations!', '12', '23', '5', '5', '14.06', 'Mobile', 'Lucena', '375.87', 'Patatas', '3', '2.0'),
('User_165', 'Okra', 'More than 5', 'No', '5', 'Great initiative!', '16', '28', '8', '3', '2.37', 'Desktop', 'Batangas', '167.23', 'Mango', '4', '10.0'),
('User_166', 'Cabbage', '3-Feb', 'No', '2', 'Helpful for small farmers.', '19', '17', '2', '11', '11.76', 'Mobile', 'San Pablo', '461.76', 'Eggplant', '3', '20.0'),
('User_167', 'Mango', '1', 'Yes', '2', 'The UI is intuitive.', '1', '8', '4', '10', '1.95', 'Tablet', 'Calamba', '433.53', 'Tomato', '5', '12.0'),
('User_168', 'Calabasa', '3-Feb', 'No', '3', 'Great initiative!', '9', '19', '9', '12', '10.28', 'Desktop', 'Lipa', '334.09', 'Mango', '3', '5.0'),
('User_169', 'Patatas', '3-Feb', 'No', '2', 'Needs improvements.', '6', '8', '9', '14', '3.55', 'Mobile', 'Lucena', '60.79', 'Luya', '5', '7.0'),
('User_170', 'Sitaw', '5-Apr', 'Yes', '3', 'Will use again.', '12', '6', '3', '5', '8.07', 'Tablet', 'Lipa', '370.99', 'Mango', '3', '2.0'),
('User_171', 'Bell Pepper', '5-Apr', 'No', '2', 'Could use better product search.', '17', '13', '8', '11', '11.36', 'Tablet', 'Batangas', '379.69', 'Patatas', '3', '2.0'),
('User_172', 'Corn', 'More than 5', 'No', '5', 'The UI is intuitive.', '19', '8', '3', '11', '2.55', 'Mobile', 'Batangas', '143.91', 'Corn', '4', '6.0'),
('User_173', 'Bawang', 'More than 5', 'No', '2', 'Could use better product search.', '8', '22', '7', '2', '11.89', 'Mobile', 'Batangas', '166.34', 'Eggplant', '4', '9.0'),
('User_174', 'Carrot', 'More than 5', 'No', '3', 'Will use again.', '1', '23', '1', '2', '14.21', 'Tablet', 'Lucena', '317.35', 'Corn', '4', '5.0'),
('User_175', 'Sitaw', '5-Apr', 'No', '3', 'Needs improvements.', '16', '2', '8', '1', '5.02', 'Mobile', 'Lipa', '89.24', 'Mango', '3', '2.0'),
('User_176', 'Carrot', '5-Apr', 'No', '2', 'Helpful for small farmers.', '3', '19', '6', '5', '4.83', 'Mobile', 'San Pablo', '121.23', 'Tomato', '4', '5.0'),
('User_177', 'Bawang', '5-Apr', 'No', '5', 'Very easy to use platform.', '19', '22', '6', '6', '12.89', 'Mobile', 'Calamba', '84.05', 'Eggplant', '5', '9.0'),
('User_178', 'Mango', '1', 'Yes', '2', 'Could use better product search.', '4', '5', '8', '2', '11.86', 'Mobile', 'Calamba', '271.26', 'Sibuyas', '5', '12.0'),
('User_179', 'Corn', '1', 'No', '1', 'The UI is intuitive.', '1', '11', '0', '14', '5.08', 'Tablet', 'Lucena', '378.79', 'Bell Pepper', '3', '6.0'),
('User_180', 'Carrot', '5-Apr', 'No', '4', 'Needs improvements.', '11', '22', '0', '10', '12.68', 'Mobile', 'Calamba', '108.64', 'Calabasa', '4', '5.0'),
('User_181', 'Calabasa', 'More than 5', 'Yes', '5', 'Fast delivery and great quality!', '11', '10', '7', '2', '13.95', 'Mobile', 'Lipa', '440.48', 'Pechay', '4', '5.0'),
('User_182', 'Okra', '5-Apr', 'No', '1', 'Fast delivery and great quality!', '18', '16', '3', '6', '9.17', 'Desktop', 'Lipa', '308.01', 'Patatas', '5', '10.0'),
('User_183', 'Luya', 'More than 5', 'No', '2', 'Needs improvements.', '10', '26', '9', '9', '4.38', 'Mobile', 'Batangas', '233.47', 'Patatas', '5', '4.0'),
('User_184', 'Patatas', '3-Feb', 'No', '1', 'Helpful for small farmers.', '9', '18', '6', '2', '13.0', 'Desktop', 'Lipa', '293.61', 'Carrot', '3', '7.0'),
('User_185', 'Okra', '1', 'Yes', '4', 'Needs improvements.', '4', '7', '1', '12', '10.66', 'Tablet', 'San Pablo', '442.68', 'Okra', '4', '10.0'),
('User_186', 'Bell Pepper', '1', 'No', '2', 'Satisfied overall.', '16', '29', '7', '10', '5.62', 'Mobile', 'Lucena', '224.41', 'Sibuyas', '3', '2.0'),
('User_187', 'Sibuyas', '1', 'No', '5', 'Satisfied overall.', '1', '13', '10', '15', '14.19', 'Desktop', 'Lipa', '93.78', 'Patatas', '5', '8.0'),
('User_188', 'Pechay', 'More than 5', 'Yes', '1', 'Very easy to use platform.', '14', '15', '9', '9', '14.84', 'Mobile', 'Lucena', '281.95', 'Calabasa', '5', '6.0'),
('User_189', 'Carrot', 'More than 5', 'Yes', '2', 'Satisfied overall.', '12', '21', '1', '9', '12.44', 'Tablet', 'Calamba', '56.07', 'Tomato', '4', '5.0'),
('User_190', 'Cabbage', '5-Apr', 'Yes', '4', 'Could use better product search.', '4', '30', '10', '7', '10.93', 'Tablet', 'Batangas', '365.98', 'Patatas', '4', '20.0'),
('User_191', 'Carrot', '5-Apr', 'Yes', '3', 'Very easy to use platform.', '2', '15', '6', '12', '4.18', 'Desktop', 'Lucena', '146.75', 'Carrot', '3', '5.0'),
('User_192', 'Sitaw', '3-Feb', 'Yes', '5', 'Great initiative!', '4', '9', '8', '3', '12.44', 'Tablet', 'Calamba', '80.18', 'Bawang', '5', '2.0'),
('User_193', 'Pechay', 'More than 5', 'No', '3', 'Could use better product search.', '1', '14', '4', '13', '11.71', 'Tablet', 'San Pablo', '228.52', 'Cabbage', '4', '6.0'),
('User_194', 'Sibuyas', '1', 'No', '1', 'The UI is intuitive.', '5', '5', '4', '2', '1.29', 'Tablet', 'Batangas', '337.8', 'Calabasa', '4', '8.0'),
('User_195', 'Tomato', '3-Feb', 'Yes', '3', 'The UI is intuitive.', '9', '13', '5', '8', '8.03', 'Mobile', 'Calamba', '494.81', 'Papaya', '3', '21.0'),
('User_196', 'Carrot', '3-Feb', 'Yes', '1', 'Needs improvements.', '9', '12', '3', '14', '5.13', 'Mobile', 'Lucena', '138.21', 'Mango', '5', '5.0'),
('User_197', 'Pechay', '5-Apr', 'Yes', '1', 'Needs improvements.', '14', '22', '7', '3', '5.98', 'Desktop', 'Lipa', '289.84', 'Carrot', '3', '6.0'),
('User_198', 'Pechay', 'More than 5', 'Yes', '4', 'Helpful for small farmers.', '15', '22', '10', '9', '9.94', 'Tablet', 'Batangas', '357.64', 'Pechay', '5', '6.0'),
('User_199', 'Corn', '1', 'No', '1', 'Very easy to use platform.', '9', '26', '2', '2', '14.51', 'Mobile', 'Batangas', '325.45', 'Bawang', '4', '6.0'),
('User_200', 'Tomato', '3-Feb', 'No', '2', 'I love the recommendations!', '18', '9', '2', '8', '2.23', 'Tablet', 'Batangas', '165.03', 'Luya', '5', '21.0'),
('User_201', 'Sibuyas', '1', 'Yes', '3', 'The UI is intuitive.', '15', '6', '10', '2', '13.47', 'Desktop', 'Lucena', '146.4', 'Sitaw', '3', '8.0'),
('User_202', 'Okra', 'More than 5', 'Yes', '1', 'Could use better product search.', '17', '10', '1', '8', '8.06', 'Tablet', 'Batangas', '141.52', 'Bell Pepper', '5', '10.0'),
('User_203', 'Mango', '1', 'No', '5', 'I love the recommendations!', '15', '4', '10', '8', '5.96', 'Tablet', 'Lucena', '118.34', 'Sibuyas', '3', '12.0'),
('User_204', 'Bawang', '3-Feb', 'Yes', '3', 'Will use again.', '12', '24', '1', '7', '13.46', 'Desktop', 'San Pablo', '472.27', 'Bawang', '5', '9.0'),
('User_205', 'Patatas', 'More than 5', 'Yes', '3', 'Great initiative!', '2', '24', '9', '10', '11.6', 'Mobile', 'San Pablo', '450.67', 'Papaya', '5', '7.0'),
('User_206', 'Corn', 'More than 5', 'Yes', '2', 'Could use better product search.', '15', '12', '4', '13', '5.38', 'Mobile', 'Batangas', '191.07', 'Corn', '5', '6.0'),
('User_207', 'Bawang', '1', 'Yes', '3', 'Great initiative!', '16', '15', '8', '8', '3.8', 'Desktop', 'Lucena', '262.19', 'Carrot', '3', '9.0'),
('User_208', 'Sibuyas', '5-Apr', 'No', '3', 'Will use again.', '1', '15', '0', '1', '11.23', 'Desktop', 'San Pablo', '336.76', 'Pechay', '5', '8.0'),
('User_209', 'Calabasa', '1', 'Yes', '1', 'Will use again.', '19', '10', '2', '15', '7.61', 'Desktop', 'San Pablo', '421.51', 'Okra', '5', '5.0'),
('User_210', 'Carrot', 'More than 5', 'Yes', '5', 'Will use again.', '17', '7', '2', '5', '5.61', 'Tablet', 'Lipa', '163.93', 'Tomato', '4', '5.0'),
('User_211', 'Okra', '5-Apr', 'Yes', '4', 'The UI is intuitive.', '12', '29', '2', '4', '3.48', 'Mobile', 'San Pablo', '264.14', 'Pechay', '4', '10.0'),
('User_212', 'Mango', '1', 'Yes', '5', 'Satisfied overall.', '12', '13', '4', '15', '10.47', 'Tablet', 'San Pablo', '88.02', 'Corn', '5', '12.0'),
('User_213', 'Sitaw', '1', 'Yes', '2', 'Great initiative!', '10', '12', '3', '2', '4.47', 'Desktop', 'Batangas', '456.64', 'Bell Pepper', '3', '2.0'),
('User_214', 'Calabasa', '3-Feb', 'No', '5', 'Very easy to use platform.', '4', '29', '5', '8', '4.75', 'Mobile', 'Lucena', '361.44', 'Cabbage', '4', '5.0'),
('User_215', 'Bawang', '1', 'No', '4', 'Very easy to use platform.', '16', '29', '4', '7', '10.73', 'Desktop', 'San Pablo', '239.9', 'Calabasa', '4', '9.0'),
('User_216', 'Corn', '1', 'Yes', '4', 'Could use better product search.', '6', '24', '1', '9', '11.2', 'Mobile', 'San Pablo', '271.94', 'Patatas', '4', '6.0'),
('User_217', 'Carrot', '5-Apr', 'No', '5', 'I love the recommendations!', '13', '12', '6', '11', '1.69', 'Tablet', 'Calamba', '395.81', 'Bell Pepper', '4', '5.0'),
('User_218', 'Corn', '1', 'Yes', '1', 'The UI is intuitive.', '1', '3', '0', '15', '12.01', 'Tablet', 'Lipa', '493.78', 'Cabbage', '4', '6.0'),
('User_219', 'Bell Pepper', 'More than 5', 'Yes', '3', 'Satisfied overall.', '10', '15', '10', '12', '3.6', 'Mobile', 'Calamba', '313.07', 'Pechay', '4', '2.0'),
('User_220', 'Corn', '5-Apr', 'No', '3', 'Could use better product search.', '11', '8', '2', '4', '10.22', 'Desktop', 'Calamba', '58.83', 'Bell Pepper', '4', '6.0'),
('User_221', 'Bell Pepper', '3-Feb', 'Yes', '2', 'Could use better product search.', '10', '4', '4', '13', '4.17', 'Desktop', 'Calamba', '165.38', 'Okra', '4', '2.0'),
('User_222', 'Luya', '3-Feb', 'Yes', '5', 'I love the recommendations!', '11', '23', '0', '3', '5.64', 'Mobile', 'San Pablo', '136.13', 'Bawang', '4', '4.0'),
('User_223', 'Sibuyas', '3-Feb', 'No', '4', 'Very easy to use platform.', '20', '19', '10', '14', '11.12', 'Mobile', 'Lipa', '413.63', 'Tomato', '4', '8.0'),
('User_224', 'Tomato', '3-Feb', 'No', '1', 'I love the recommendations!', '20', '4', '9', '15', '11.87', 'Desktop', 'Calamba', '354.28', 'Sitaw', '5', '21.0'),
('User_225', 'Corn', 'More than 5', 'No', '4', 'Will use again.', '11', '27', '8', '7', '10.98', 'Mobile', 'Calamba', '226.84', 'Carrot', '4', '6.0'),
('User_226', 'Calabasa', '1', 'No', '5', 'Fast delivery and great quality!', '7', '25', '2', '13', '2.26', 'Tablet', 'Lipa', '218.34', 'Okra', '4', '5.0'),
('User_227', 'Okra', 'More than 5', 'Yes', '4', 'Fast delivery and great quality!', '14', '14', '4', '5', '4.85', 'Tablet', 'Batangas', '253.5', 'Papaya', '3', '10.0'),
('User_228', 'Papaya', '3-Feb', 'Yes', '2', 'Helpful for small farmers.', '6', '24', '6', '14', '9.9', 'Tablet', 'Lipa', '384.65', 'Eggplant', '3', '0.0'),
('User_229', 'Bawang', 'More than 5', 'No', '3', 'Fast delivery and great quality!', '15', '19', '3', '15', '5.84', 'Tablet', 'Calamba', '290.82', 'Eggplant', '5', '9.0'),
('User_230', 'Calabasa', '3-Feb', 'Yes', '1', 'Helpful for small farmers.', '1', '28', '4', '9', '14.39', 'Tablet', 'Lipa', '94.6', 'Sitaw', '3', '5.0'),
('User_231', 'Sitaw', '1', 'No', '4', 'Very easy to use platform.', '9', '27', '5', '15', '9.47', 'Mobile', 'Lucena', '493.17', 'Patatas', '5', '2.0'),
('User_232', 'Bawang', '3-Feb', 'No', '1', 'Helpful for small farmers.', '6', '8', '7', '9', '2.21', 'Desktop', 'Calamba', '70.82', 'Tomato', '4', '9.0'),
('User_233', 'Okra', 'More than 5', 'Yes', '5', 'I love the recommendations!', '7', '26', '3', '15', '4.85', 'Desktop', 'San Pablo', '89.28', 'Patatas', '5', '10.0'),
('User_234', 'Bawang', '1', 'No', '1', 'I love the recommendations!', '10', '19', '10', '4', '7.43', 'Tablet', 'Lucena', '334.79', 'Patatas', '3', '9.0'),
('User_235', 'Okra', '3-Feb', 'Yes', '1', 'The UI is intuitive.', '19', '5', '3', '10', '14.73', 'Mobile', 'San Pablo', '346.14', 'Luya', '4', '10.0'),
('User_236', 'Bawang', 'More than 5', 'Yes', '4', 'Helpful for small farmers.', '13', '30', '10', '1', '12.57', 'Tablet', 'Batangas', '220.96', 'Pechay', '5', '9.0'),
('User_237', 'Corn', '1', 'Yes', '3', 'Helpful for small farmers.', '3', '29', '4', '15', '1.11', 'Desktop', 'Lipa', '474.85', 'Sibuyas', '5', '6.0'),
('User_238', 'Tomato', '5-Apr', 'No', '1', 'Fast delivery and great quality!', '3', '9', '7', '12', '7.73', 'Mobile', 'San Pablo', '303.04', 'Tomato', '3', '21.0'),
('User_239', 'Papaya', '1', 'Yes', '4', 'Very easy to use platform.', '2', '17', '8', '5', '11.94', 'Mobile', 'Lucena', '206.11', 'Papaya', '3', '0.0'),
('User_240', 'Pechay', '3-Feb', 'Yes', '1', 'Great initiative!', '16', '9', '10', '10', '6.24', 'Desktop', 'San Pablo', '50.61', 'Pechay', '4', '6.0'),
('User_241', 'Bell Pepper', '5-Apr', 'No', '1', 'Great initiative!', '13', '23', '3', '12', '2.49', 'Tablet', 'Lucena', '468.22', 'Luya', '5', '2.0'),
('User_242', 'Patatas', 'More than 5', 'No', '2', 'Could use better product search.', '4', '15', '7', '15', '2.63', 'Desktop', 'Lipa', '68.79', 'Carrot', '3', '7.0'),
('User_243', 'Bell Pepper', '3-Feb', 'Yes', '3', 'Fast delivery and great quality!', '18', '27', '8', '9', '2.42', 'Mobile', 'Lucena', '428.05', 'Bell Pepper', '3', '2.0'),
('User_244', 'Patatas', '5-Apr', 'No', '4', 'Could use better product search.', '15', '5', '10', '15', '8.52', 'Tablet', 'Calamba', '366.36', 'Corn', '4', '7.0'),
('User_245', 'Mango', '3-Feb', 'No', '1', 'Fast delivery and great quality!', '15', '14', '2', '4', '7.83', 'Mobile', 'Lucena', '155.06', 'Calabasa', '5', '12.0'),
('User_246', 'Patatas', '5-Apr', 'No', '4', 'Could use better product search.', '7', '17', '1', '3', '8.96', 'Tablet', 'Batangas', '180.52', 'Luya', '4', '7.0'),
('User_247', 'Patatas', '5-Apr', 'No', '3', 'Great initiative!', '19', '6', '2', '12', '3.35', 'Desktop', 'San Pablo', '255.22', 'Corn', '5', '7.0'),
('User_248', 'Okra', '3-Feb', 'Yes', '1', 'Will use again.', '6', '2', '3', '12', '5.56', 'Tablet', 'Batangas', '260.82', 'Calabasa', '5', '10.0'),
('User_249', 'Bawang', '5-Apr', 'Yes', '5', 'Could use better product search.', '6', '2', '9', '9', '10.51', 'Desktop', 'San Pablo', '383.62', 'Cabbage', '5', '9.0'),
('User_250', 'Mango', '5-Apr', 'No', '3', 'Needs improvements.', '2', '22', '5', '10', '13.07', 'Desktop', 'Batangas', '291.56', 'Sibuyas', '4', '12.0'),
('User_251', 'Sibuyas', 'More than 5', 'No', '5', 'The UI is intuitive.', '2', '13', '3', '6', '12.94', 'Desktop', 'Lipa', '55.57', 'Luya', '4', '8.0'),
('User_252', 'Eggplant', '1', 'No', '5', 'Satisfied overall.', '8', '20', '3', '10', '13.83', 'Tablet', 'Calamba', '440.35', 'Cabbage', '3', '8.0'),
('User_253', 'Bawang', '5-Apr', 'No', '3', 'I love the recommendations!', '6', '25', '5', '9', '4.04', 'Mobile', 'Calamba', '475.33', 'Pechay', '5', '9.0'),
('User_254', 'Okra', '5-Apr', 'Yes', '3', 'Satisfied overall.', '20', '23', '5', '2', '5.4', 'Tablet', 'Calamba', '78.53', 'Patatas', '3', '10.0'),
('User_255', 'Bawang', 'More than 5', 'No', '2', 'Will use again.', '19', '26', '10', '11', '10.49', 'Desktop', 'Lipa', '456.17', 'Pechay', '3', '9.0'),
('User_256', 'Patatas', '3-Feb', 'Yes', '2', 'Fast delivery and great quality!', '9', '18', '1', '5', '10.95', 'Tablet', 'Batangas', '281.06', 'Bell Pepper', '3', '7.0'),
('User_257', 'Eggplant', '5-Apr', 'Yes', '1', 'Very easy to use platform.', '13', '8', '1', '1', '13.1', 'Mobile', 'Lucena', '78.62', 'Calabasa', '3', '8.0'),
('User_258', 'Patatas', 'More than 5', 'No', '4', 'Fast delivery and great quality!', '10', '25', '7', '8', '9.64', 'Desktop', 'Lucena', '66.87', 'Patatas', '4', '7.0'),
('User_259', 'Bawang', '5-Apr', 'Yes', '2', 'Great initiative!', '4', '24', '3', '15', '7.33', 'Tablet', 'Batangas', '84.98', 'Sibuyas', '5', '9.0'),
('User_260', 'Tomato', '1', 'No', '3', 'Helpful for small farmers.', '17', '14', '6', '1', '6.25', 'Mobile', 'San Pablo', '465.44', 'Okra', '3', '21.0'),
('User_261', 'Sibuyas', '1', 'Yes', '1', 'Very easy to use platform.', '6', '18', '7', '9', '5.81', 'Tablet', 'Batangas', '250.81', 'Pechay', '4', '8.0'),
('User_262', 'Corn', '5-Apr', 'No', '1', 'Great initiative!', '3', '29', '1', '7', '12.64', 'Desktop', 'Lipa', '302.06', 'Cabbage', '4', '6.0'),
('User_263', 'Sibuyas', '3-Feb', 'Yes', '1', 'Could use better product search.', '8', '27', '3', '7', '14.63', 'Mobile', 'San Pablo', '127.3', 'Eggplant', '4', '8.0'),
('User_264', 'Calabasa', '3-Feb', 'Yes', '1', 'I love the recommendations!', '5', '19', '8', '14', '7.1', 'Mobile', 'Lucena', '142.41', 'Patatas', '5', '5.0'),
('User_265', 'Tomato', '3-Feb', 'No', '5', 'Satisfied overall.', '13', '13', '6', '2', '14.15', 'Mobile', 'Lucena', '426.6', 'Bell Pepper', '4', '21.0'),
('User_266', 'Okra', '1', 'Yes', '3', 'Fast delivery and great quality!', '8', '20', '2', '6', '2.35', 'Desktop', 'San Pablo', '286.05', 'Tomato', '4', '10.0'),
('User_267', 'Sibuyas', 'More than 5', 'No', '2', 'Helpful for small farmers.', '15', '7', '7', '11', '12.78', 'Tablet', 'Calamba', '288.27', 'Pechay', '4', '8.0'),
('User_268', 'Mango', '3-Feb', 'Yes', '1', 'Could use better product search.', '10', '5', '2', '7', '9.57', 'Desktop', 'Batangas', '425.67', 'Carrot', '3', '12.0'),
('User_269', 'Mango', '3-Feb', 'No', '1', 'Very easy to use platform.', '2', '26', '5', '5', '10.36', 'Mobile', 'Calamba', '459.97', 'Luya', '4', '12.0'),
('User_270', 'Pechay', 'More than 5', 'No', '3', 'The UI is intuitive.', '18', '21', '7', '8', '5.84', 'Tablet', 'Lipa', '185.13', 'Calabasa', '3', '6.0'),
('User_271', 'Corn', '1', 'Yes', '4', 'The UI is intuitive.', '14', '23', '0', '3', '10.76', 'Mobile', 'Batangas', '185.36', 'Papaya', '3', '6.0'),
('User_272', 'Tomato', '3-Feb', 'No', '3', 'Fast delivery and great quality!', '13', '11', '0', '12', '8.28', 'Tablet', 'Calamba', '244.63', 'Papaya', '4', '21.0'),
('User_273', 'Patatas', '1', 'No', '5', 'Will use again.', '3', '23', '8', '3', '6.85', 'Desktop', 'Lucena', '360.43', 'Pechay', '5', '7.0'),
('User_274', 'Bawang', '1', 'Yes', '2', 'Needs improvements.', '13', '20', '4', '12', '5.69', 'Desktop', 'San Pablo', '154.75', 'Sitaw', '5', '9.0'),
('User_275', 'Mango', '5-Apr', 'Yes', '5', 'Satisfied overall.', '20', '20', '8', '15', '3.65', 'Mobile', 'San Pablo', '134.35', 'Eggplant', '5', '12.0'),
('User_276', 'Bawang', 'More than 5', 'Yes', '3', 'Fast delivery and great quality!', '2', '28', '5', '13', '10.79', 'Mobile', 'Lipa', '466.54', 'Calabasa', '4', '9.0'),
('User_277', 'Carrot', '1', 'Yes', '3', 'Helpful for small farmers.', '6', '28', '2', '2', '2.69', 'Mobile', 'Lipa', '169.36', 'Okra', '4', '5.0'),
('User_278', 'Cabbage', '3-Feb', 'No', '4', 'Very easy to use platform.', '1', '3', '8', '12', '7.67', 'Mobile', 'San Pablo', '463.89', 'Sitaw', '3', '20.0'),
('User_279', 'Cabbage', 'More than 5', 'Yes', '4', 'Great initiative!', '3', '27', '0', '9', '7.05', 'Tablet', 'San Pablo', '68.12', 'Eggplant', '5', '20.0'),
('User_280', 'Bawang', 'More than 5', 'Yes', '3', 'The UI is intuitive.', '12', '14', '10', '12', '13.87', 'Desktop', 'Lucena', '366.85', 'Luya', '4', '9.0'),
('User_281', 'Calabasa', '1', 'Yes', '1', 'Needs improvements.', '20', '8', '6', '13', '10.51', 'Mobile', 'Batangas', '210.39', 'Corn', '3', '5.0'),
('User_282', 'Pechay', 'More than 5', 'Yes', '4', 'Satisfied overall.', '2', '11', '10', '6', '4.44', 'Tablet', 'Batangas', '283.18', 'Sitaw', '3', '6.0'),
('User_283', 'Carrot', '1', 'No', '5', 'The UI is intuitive.', '2', '26', '3', '12', '3.67', 'Mobile', 'Lucena', '353.35', 'Calabasa', '3', '5.0'),
('User_284', 'Calabasa', 'More than 5', 'Yes', '3', 'Could use better product search.', '18', '13', '7', '13', '1.02', 'Tablet', 'San Pablo', '424.06', 'Tomato', '3', '5.0'),
('User_285', 'Pechay', 'More than 5', 'Yes', '2', 'I love the recommendations!', '19', '17', '7', '6', '7.04', 'Tablet', 'Batangas', '71.77', 'Okra', '5', '6.0'),
('User_286', 'Bell Pepper', '3-Feb', 'No', '2', 'Will use again.', '10', '14', '6', '1', '11.57', 'Tablet', 'San Pablo', '449.95', 'Sitaw', '5', '2.0'),
('User_287', 'Okra', '3-Feb', 'Yes', '2', 'Very easy to use platform.', '17', '19', '10', '4', '12.15', 'Mobile', 'San Pablo', '439.37', 'Mango', '5', '10.0'),
('User_298', 'Sibuyas', 'More than 5', 'Yes', '5', 'Will use again.', '1', '30', '0', '5', '2.39', 'Mobile', 'Lipa', '279.61', 'Bell Pepper', '4', '8.0'),
('User_289', 'Corn', '3-Feb', 'Yes', '3', 'I love the recommendations!', '16', '3', '8', '15', '1.16', 'Desktop', 'Lucena', '358.32', 'Okra', '5', '6.0'),
('User_290', 'Corn', '1', 'No', '2', 'Will use again.', '14', '24', '0', '8', '4.56', 'Mobile', 'Calamba', '304.13', 'Mango', '3', '6.0'),
('User_291', 'Carrot', '1', 'No', '1', 'I love the recommendations!', '13', '23', '3', '8', '11.63', 'Tablet', 'San Pablo', '243.04', 'Mango', '3', '5.0'),
('User_292', 'Sibuyas', 'More than 5', 'No', '4', 'Great initiative!', '18', '9', '9', '1', '1.27', 'Tablet', 'San Pablo', '74.9', 'Eggplant', '5', '8.0'),
('User_293', 'Corn', '5-Apr', 'Yes', '4', 'I love the recommendations!', '3', '1', '8', '15', '14.86', 'Mobile', 'San Pablo', '415.3', 'Calabasa', '5', '6.0'),
('User_294', 'Bawang', '1', 'No', '1', 'Fast delivery and great quality!', '8', '2', '10', '13', '14.21', 'Desktop', 'Lipa', '113.58', 'Carrot', '3', '9.0'),
('User_295', 'Bawang', '5-Apr', 'Yes', '2', 'Needs improvements.', '20', '26', '2', '3', '10.26', 'Tablet', 'San Pablo', '229.27', 'Pechay', '3', '9.0'),
('User_296', 'Mango', 'More than 5', 'No', '3', 'Great initiative!', '11', '7', '4', '1', '11.79', 'Tablet', 'Lipa', '209.76', 'Mango', '3', '12.0'),
('User_297', 'Sibuyas', 'More than 5', 'Yes', '4', 'Great initiative!', '9', '14', '0', '8', '9.41', 'Tablet', 'Lipa', '57.96', 'Eggplant', '4', '8.0'),
('User_298', 'Luya', '3-Feb', 'No', '2', 'Great initiative!', '7', '9', '4', '10', '3.27', 'Mobile', 'Lucena', '437.86', 'Luya', '4', '4.0'),
('User_299', 'Papaya', '1', 'No', '4', 'Helpful for small farmers.', '19', '15', '3', '6', '4.2', 'Tablet', 'Lucena', '228.9', 'Carrot', '4', '0.0'),
('User_300', 'Bell Pepper', '5-Apr', 'Yes', '1', 'Helpful for small farmers.', '8', '6', '7', '8', '2.97', 'Mobile', 'Lucena', '214.8', 'Sibuyas', '4', '2.0'),
('User_301', 'Bawang', 'More than 5', 'Yes', '5', 'Very easy to use platform.', '13', '8', '9', '1', '9.14', 'Tablet', 'Lucena', '490.88', 'Cabbage', '4', '9.0'),
('User_302', 'Mango', '5-Apr', 'No', '1', 'The UI is intuitive.', '3', '30', '0', '11', '2.05', 'Tablet', 'Calamba', '241.15', 'Pechay', '4', '12.0'),
('User_303', 'Bawang', '1', 'Yes', '1', 'Great initiative!', '20', '27', '4', '4', '13.26', 'Tablet', 'Lucena', '306.62', 'Pechay', '5', '9.0'),
('User_304', 'Papaya', '3-Feb', 'No', '4', 'Great initiative!', '15', '16', '1', '4', '7.23', 'Tablet', 'Batangas', '98.62', 'Carrot', '5', '0.0'),
('User_305', 'Eggplant', '1', 'Yes', '1', 'Could use better product search.', '16', '25', '6', '9', '1.44', 'Tablet', 'Lucena', '323.69', 'Luya', '5', '8.0'),
('User_306', 'Bell Pepper', '3-Feb', 'No', '2', 'I love the recommendations!', '8', '12', '4', '3', '4.68', 'Desktop', 'Lipa', '256.96', 'Bell Pepper', '4', '2.0'),
('User_307', 'Sibuyas', 'More than 5', 'No', '1', 'Great initiative!', '10', '25', '5', '15', '14.92', 'Tablet', 'Lipa', '60.83', 'Carrot', '3', '8.0'),
('User_308', 'Mango', '3-Feb', 'Yes', '1', 'Satisfied overall.', '1', '29', '10', '5', '4.18', 'Tablet', 'Lipa', '357.11', 'Calabasa', '5', '12.0'),
('User_309', 'Corn', 'More than 5', 'No', '5', 'Helpful for small farmers.', '3', '13', '9', '15', '1.5', 'Tablet', 'Calamba', '331.9', 'Bell Pepper', '3', '6.0'),
('User_310', 'Bawang', 'More than 5', 'Yes', '1', 'Very easy to use platform.', '3', '17', '6', '6', '9.57', 'Desktop', 'Lucena', '247.88', 'Luya', '4', '9.0'),
('User_311', 'Pechay', '5-Apr', 'Yes', '1', 'Will use again.', '3', '13', '10', '11', '6.15', 'Desktop', 'Lipa', '280.11', 'Corn', '3', '6.0'),
('User_312', 'Tomato', '3-Feb', 'No', '4', 'The UI is intuitive.', '2', '17', '7', '15', '4.57', 'Tablet', 'Batangas', '109.0', 'Calabasa', '3', '21.0'),
('User_313', 'Corn', '3-Feb', 'No', '2', 'Satisfied overall.', '8', '11', '3', '6', '1.77', 'Mobile', 'Lipa', '371.6', 'Eggplant', '4', '6.0'),
('User_314', 'Eggplant', '5-Apr', 'No', '4', 'Needs improvements.', '5', '22', '10', '6', '6.42', 'Desktop', 'Calamba', '86.72', 'Mango', '3', '8.0'),
('User_315', 'Bawang', '1', 'No', '4', 'Will use again.', '13', '8', '5', '7', '12.39', 'Desktop', 'Batangas', '247.03', 'Papaya', '4', '9.0'),
('User_316', 'Papaya', 'More than 5', 'No', '4', 'Helpful for small farmers.', '16', '11', '3', '4', '3.28', 'Desktop', 'Batangas', '463.97', 'Papaya', '4', '0.0'),
('User_317', 'Carrot', '1', 'No', '1', 'The UI is intuitive.', '8', '6', '7', '11', '7.13', 'Mobile', 'Lipa', '350.81', 'Pechay', '3', '5.0'),
('User_318', 'Corn', '1', 'No', '5', 'Fast delivery and great quality!', '5', '3', '8', '10', '6.79', 'Mobile', 'Batangas', '283.59', 'Carrot', '4', '6.0'),
('User_319', 'Patatas', '5-Apr', 'Yes', '5', 'I love the recommendations!', '16', '14', '10', '11', '1.64', 'Tablet', 'Lucena', '265.25', 'Corn', '4', '7.0'),
('User_320', 'Sitaw', '5-Apr', 'No', '5', 'The UI is intuitive.', '8', '11', '6', '6', '14.72', 'Mobile', 'Calamba', '111.5', 'Bawang', '4', '2.0'),
('User_321', 'Cabbage', '1', 'No', '1', 'Helpful for small farmers.', '1', '16', '4', '2', '10.07', 'Mobile', 'Calamba', '394.03', 'Tomato', '4', '20.0');
INSERT INTO `updated_dataset_with_fixed_product_encoded` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`) VALUES
('User_322', 'Okra', 'More than 5', 'Yes', '4', 'Will use again.', '14', '21', '6', '2', '8.51', 'Mobile', 'Lipa', '496.75', 'Corn', '3', '10.0'),
('User_323', 'Eggplant', '5-Apr', 'No', '4', 'Great initiative!', '15', '29', '5', '11', '2.38', 'Mobile', 'Lipa', '257.09', 'Carrot', '4', '8.0'),
('User_324', 'Pechay', '3-Feb', 'Yes', '1', 'Needs improvements.', '1', '14', '1', '9', '4.29', 'Desktop', 'Lipa', '171.76', 'Bawang', '5', '6.0'),
('User_325', 'Sitaw', '5-Apr', 'No', '2', 'Will use again.', '8', '12', '4', '12', '14.82', 'Desktop', 'San Pablo', '379.32', 'Pechay', '4', '2.0'),
('User_326', 'Sitaw', 'More than 5', 'Yes', '2', 'Needs improvements.', '14', '14', '8', '9', '4.09', 'Desktop', 'Calamba', '272.01', 'Patatas', '5', '2.0'),
('User_327', 'Luya', '1', 'Yes', '3', 'Could use better product search.', '19', '12', '1', '13', '5.51', 'Mobile', 'San Pablo', '129.52', 'Sibuyas', '3', '4.0'),
('User_328', 'Pechay', '1', 'Yes', '1', 'The UI is intuitive.', '19', '13', '5', '1', '10.26', 'Tablet', 'San Pablo', '197.66', 'Bell Pepper', '5', '6.0'),
('User_329', 'Corn', 'More than 5', 'Yes', '1', 'The UI is intuitive.', '9', '18', '7', '2', '13.3', 'Mobile', 'Batangas', '442.27', 'Carrot', '3', '6.0'),
('User_330', 'Patatas', 'More than 5', 'Yes', '1', 'Fast delivery and great quality!', '10', '2', '9', '15', '5.77', 'Tablet', 'Batangas', '251.56', 'Calabasa', '3', '7.0'),
('User_331', 'Sitaw', '1', 'No', '5', 'Needs improvements.', '11', '18', '1', '5', '2.07', 'Mobile', 'San Pablo', '441.49', 'Carrot', '5', '2.0'),
('User_332', 'Bawang', '1', 'Yes', '5', 'Needs improvements.', '19', '5', '8', '10', '2.28', 'Desktop', 'Calamba', '294.06', 'Bawang', '3', '9.0'),
('User_333', 'Eggplant', '1', 'Yes', '5', 'Needs improvements.', '5', '12', '6', '8', '2.56', 'Tablet', 'Calamba', '435.63', 'Pechay', '3', '8.0'),
('User_334', 'Patatas', '3-Feb', 'Yes', '3', 'Will use again.', '18', '17', '5', '15', '2.29', 'Mobile', 'Batangas', '494.82', 'Bawang', '5', '7.0'),
('User_335', 'Corn', 'More than 5', 'Yes', '1', 'I love the recommendations!', '19', '12', '0', '14', '1.52', 'Mobile', 'Batangas', '339.84', 'Corn', '4', '6.0'),
('User_336', 'Sitaw', '5-Apr', 'No', '1', 'I love the recommendations!', '20', '3', '7', '8', '4.89', 'Mobile', 'Calamba', '455.89', 'Luya', '4', '2.0'),
('User_337', 'Okra', '5-Apr', 'Yes', '2', 'I love the recommendations!', '16', '6', '7', '1', '11.57', 'Desktop', 'Calamba', '156.26', 'Carrot', '4', '10.0'),
('User_338', 'Bell Pepper', '1', 'Yes', '1', 'Very easy to use platform.', '2', '4', '6', '9', '8.45', 'Tablet', 'Lucena', '445.4', 'Bawang', '5', '2.0'),
('User_339', 'Sibuyas', 'More than 5', 'Yes', '3', 'The UI is intuitive.', '7', '6', '3', '3', '10.87', 'Tablet', 'Calamba', '427.47', 'Papaya', '4', '8.0'),
('User_340', 'Mango', '5-Apr', 'Yes', '4', 'Satisfied overall.', '3', '5', '10', '4', '11.14', 'Mobile', 'Calamba', '110.5', 'Tomato', '3', '12.0'),
('User_341', 'Corn', '1', 'Yes', '4', 'Could use better product search.', '18', '8', '3', '12', '3.78', 'Desktop', 'Calamba', '111.81', 'Papaya', '5', '6.0'),
('User_342', 'Pechay', '1', 'Yes', '5', 'Needs improvements.', '14', '9', '3', '13', '1.79', 'Mobile', 'Calamba', '401.6', 'Eggplant', '4', '6.0'),
('User_343', 'Pechay', 'More than 5', 'No', '5', 'Helpful for small farmers.', '2', '17', '6', '6', '12.28', 'Desktop', 'Lucena', '191.37', 'Pechay', '5', '6.0'),
('User_344', 'Pechay', '5-Apr', 'No', '4', 'Could use better product search.', '8', '12', '6', '4', '3.71', 'Tablet', 'San Pablo', '102.43', 'Cabbage', '5', '6.0'),
('User_345', 'Pechay', '1', 'Yes', '1', 'Very easy to use platform.', '5', '23', '2', '6', '12.23', 'Desktop', 'San Pablo', '69.48', 'Sibuyas', '5', '6.0'),
('User_346', 'Sibuyas', '1', 'Yes', '2', 'Could use better product search.', '4', '11', '0', '8', '11.8', 'Desktop', 'Lucena', '53.92', 'Corn', '3', '8.0'),
('User_347', 'Sitaw', '1', 'Yes', '4', 'Could use better product search.', '18', '2', '8', '1', '6.93', 'Tablet', 'Lucena', '147.92', 'Corn', '5', '2.0'),
('User_348', 'Corn', '5-Apr', 'Yes', '4', 'Great initiative!', '16', '14', '0', '11', '6.62', 'Mobile', 'Lipa', '236.03', 'Cabbage', '4', '6.0'),
('User_349', 'Bell Pepper', '3-Feb', 'No', '3', 'Satisfied overall.', '20', '27', '1', '14', '2.97', 'Desktop', 'Batangas', '438.02', 'Corn', '4', '2.0'),
('User_350', 'Okra', '5-Apr', 'Yes', '5', 'Great initiative!', '7', '11', '7', '11', '4.89', 'Desktop', 'Lucena', '261.39', 'Sitaw', '5', '10.0'),
('User_351', 'Calabasa', '5-Apr', 'No', '1', 'Fast delivery and great quality!', '19', '28', '7', '5', '1.27', 'Tablet', 'Lipa', '194.66', 'Cabbage', '5', '5.0'),
('User_352', 'Pechay', '1', 'Yes', '5', 'Needs improvements.', '8', '5', '3', '7', '8.73', 'Desktop', 'Calamba', '147.85', 'Carrot', '3', '6.0'),
('User_353', 'Papaya', '3-Feb', 'Yes', '4', 'The UI is intuitive.', '5', '7', '6', '4', '1.13', 'Mobile', 'Batangas', '480.23', 'Luya', '4', '0.0'),
('User_354', 'Calabasa', 'More than 5', 'No', '4', 'Needs improvements.', '6', '7', '9', '13', '6.26', 'Mobile', 'Lucena', '204.99', 'Sitaw', '5', '5.0'),
('User_355', 'Eggplant', '5-Apr', 'No', '3', 'Needs improvements.', '14', '20', '10', '4', '7.96', 'Mobile', 'Calamba', '76.95', 'Bawang', '4', '8.0'),
('User_356', 'Papaya', '3-Feb', 'Yes', '5', 'Fast delivery and great quality!', '8', '7', '7', '4', '4.37', 'Mobile', 'Calamba', '321.96', 'Eggplant', '4', '0.0'),
('User_357', 'Carrot', '3-Feb', 'Yes', '3', 'Satisfied overall.', '3', '2', '7', '12', '4.34', 'Desktop', 'Lipa', '354.18', 'Carrot', '5', '5.0'),
('User_358', 'Bawang', '1', 'Yes', '1', 'The UI is intuitive.', '15', '2', '0', '8', '1.78', 'Desktop', 'Lipa', '329.32', 'Bell Pepper', '3', '9.0'),
('User_359', 'Papaya', '5-Apr', 'No', '5', 'The UI is intuitive.', '18', '6', '0', '8', '14.28', 'Tablet', 'Calamba', '382.9', 'Eggplant', '5', '0.0'),
('User_360', 'Corn', '1', 'No', '1', 'Fast delivery and great quality!', '6', '18', '6', '15', '3.7', 'Tablet', 'San Pablo', '223.52', 'Patatas', '3', '6.0'),
('User_361', 'Sitaw', '1', 'Yes', '4', 'Helpful for small farmers.', '19', '8', '6', '8', '2.9', 'Tablet', 'Batangas', '233.5', 'Bell Pepper', '4', '2.0'),
('User_362', 'Bell Pepper', '1', 'No', '4', 'The UI is intuitive.', '12', '22', '3', '5', '11.32', 'Desktop', 'Batangas', '106.56', 'Bell Pepper', '4', '2.0'),
('User_363', 'Tomato', '3-Feb', 'Yes', '3', 'Great initiative!', '20', '18', '9', '6', '9.78', 'Tablet', 'Batangas', '252.69', 'Calabasa', '5', '21.0'),
('User_364', 'Sibuyas', '1', 'No', '4', 'Great initiative!', '1', '25', '6', '12', '9.46', 'Tablet', 'Lipa', '373.55', 'Papaya', '3', '8.0'),
('User_365', 'Papaya', '3-Feb', 'No', '4', 'Very easy to use platform.', '10', '1', '10', '1', '8.39', 'Tablet', 'Lipa', '151.48', 'Bawang', '5', '0.0'),
('User_366', 'Calabasa', '5-Apr', 'No', '1', 'Could use better product search.', '16', '16', '9', '9', '4.92', 'Tablet', 'Lipa', '271.83', 'Carrot', '3', '5.0'),
('User_367', 'Calabasa', 'More than 5', 'Yes', '1', 'Fast delivery and great quality!', '20', '13', '10', '3', '2.49', 'Mobile', 'Lucena', '290.5', 'Cabbage', '5', '5.0'),
('User_368', 'Okra', 'More than 5', 'Yes', '2', 'Satisfied overall.', '11', '27', '5', '10', '4.6', 'Mobile', 'Calamba', '499.05', 'Corn', '5', '10.0'),
('User_369', 'Sibuyas', 'More than 5', 'No', '3', 'Could use better product search.', '8', '27', '0', '13', '2.69', 'Mobile', 'Lipa', '330.9', 'Calabasa', '4', '8.0'),
('User_370', 'Corn', '3-Feb', 'Yes', '1', 'Helpful for small farmers.', '7', '16', '5', '15', '13.5', 'Tablet', 'Batangas', '449.59', 'Bawang', '4', '6.0'),
('User_371', 'Patatas', 'More than 5', 'Yes', '2', 'Fast delivery and great quality!', '17', '20', '6', '3', '13.31', 'Mobile', 'Lipa', '474.85', 'Mango', '3', '7.0'),
('User_372', 'Carrot', '5-Apr', 'No', '2', 'Fast delivery and great quality!', '19', '6', '4', '4', '3.52', 'Desktop', 'Lucena', '92.76', 'Sibuyas', '5', '5.0'),
('User_373', 'Tomato', '3-Feb', 'No', '3', 'The UI is intuitive.', '11', '7', '5', '12', '3.66', 'Mobile', 'Calamba', '152.07', 'Carrot', '5', '21.0'),
('User_374', 'Mango', '3-Feb', 'Yes', '2', 'Great initiative!', '16', '25', '1', '13', '3.35', 'Mobile', 'Calamba', '128.36', 'Tomato', '5', '12.0'),
('User_375', 'Mango', '5-Apr', 'No', '3', 'I love the recommendations!', '17', '19', '7', '8', '2.45', 'Desktop', 'Calamba', '264.67', 'Bell Pepper', '3', '12.0'),
('User_376', 'Sibuyas', 'More than 5', 'No', '2', 'Great initiative!', '2', '15', '9', '12', '11.94', 'Tablet', 'Lipa', '88.31', 'Mango', '4', '8.0'),
('User_377', 'Patatas', '5-Apr', 'No', '2', 'Could use better product search.', '5', '24', '2', '10', '4.05', 'Desktop', 'Lipa', '486.81', 'Eggplant', '3', '7.0'),
('User_378', 'Sibuyas', 'More than 5', 'No', '3', 'Will use again.', '12', '30', '5', '14', '8.46', 'Desktop', 'San Pablo', '366.79', 'Patatas', '3', '8.0'),
('User_379', 'Mango', '3-Feb', 'Yes', '1', 'Will use again.', '7', '30', '3', '15', '8.16', 'Tablet', 'Lipa', '299.83', 'Pechay', '3', '12.0'),
('User_380', 'Calabasa', 'More than 5', 'Yes', '5', 'Helpful for small farmers.', '14', '14', '9', '6', '4.4', 'Tablet', 'Calamba', '497.76', 'Eggplant', '3', '5.0'),
('User_381', 'Papaya', '5-Apr', 'Yes', '2', 'Needs improvements.', '12', '8', '7', '3', '1.33', 'Tablet', 'Batangas', '389.76', 'Tomato', '3', '0.0'),
('User_382', 'Okra', '5-Apr', 'Yes', '3', 'Great initiative!', '11', '24', '0', '1', '12.36', 'Desktop', 'San Pablo', '258.13', 'Pechay', '5', '10.0'),
('User_383', 'Bawang', '3-Feb', 'No', '4', 'Will use again.', '4', '5', '7', '11', '6.46', 'Mobile', 'Lucena', '474.74', 'Carrot', '5', '9.0'),
('User_384', 'Okra', '1', 'Yes', '1', 'The UI is intuitive.', '14', '22', '3', '13', '10.79', 'Desktop', 'Batangas', '472.25', 'Pechay', '3', '10.0'),
('User_385', 'Corn', '3-Feb', 'Yes', '4', 'Very easy to use platform.', '9', '12', '0', '1', '12.9', 'Tablet', 'Lipa', '448.88', 'Papaya', '5', '6.0'),
('User_386', 'Bell Pepper', 'More than 5', 'No', '2', 'The UI is intuitive.', '6', '11', '6', '6', '12.1', 'Desktop', 'Lipa', '473.4', 'Tomato', '5', '2.0'),
('User_387', 'Corn', '1', 'Yes', '4', 'Great initiative!', '20', '7', '10', '9', '1.01', 'Desktop', 'Lucena', '114.02', 'Bell Pepper', '4', '6.0'),
('User_388', 'Carrot', '1', 'Yes', '3', 'Helpful for small farmers.', '2', '6', '1', '14', '3.05', 'Desktop', 'Lipa', '160.48', 'Patatas', '5', '5.0'),
('User_389', 'Cabbage', '5-Apr', 'Yes', '2', 'Great initiative!', '3', '4', '6', '7', '8.7', 'Desktop', 'Batangas', '341.96', 'Corn', '4', '20.0'),
('User_390', 'Pechay', 'More than 5', 'No', '1', 'Great initiative!', '1', '16', '4', '13', '7.82', 'Mobile', 'San Pablo', '459.72', 'Sitaw', '5', '6.0'),
('User_391', 'Sitaw', 'More than 5', 'Yes', '1', 'Could use better product search.', '14', '23', '6', '2', '4.5', 'Mobile', 'Batangas', '121.3', 'Patatas', '4', '2.0'),
('User_392', 'Sibuyas', '3-Feb', 'Yes', '1', 'Helpful for small farmers.', '5', '3', '10', '2', '4.23', 'Tablet', 'Lucena', '182.32', 'Papaya', '3', '8.0'),
('User_393', 'Okra', 'More than 5', 'Yes', '4', 'Very easy to use platform.', '4', '26', '1', '11', '4.5', 'Tablet', 'Batangas', '330.34', 'Tomato', '3', '10.0'),
('User_394', 'Calabasa', 'More than 5', 'Yes', '4', 'Satisfied overall.', '1', '5', '9', '11', '14.29', 'Mobile', 'Lipa', '284.02', 'Bell Pepper', '4', '5.0'),
('User_395', 'Patatas', '3-Feb', 'No', '3', 'Could use better product search.', '10', '12', '3', '14', '2.98', 'Desktop', 'Calamba', '63.08', 'Patatas', '4', '7.0'),
('User_396', 'Sibuyas', '3-Feb', 'Yes', '1', 'Helpful for small farmers.', '19', '12', '3', '9', '7.47', 'Desktop', 'Batangas', '91.59', 'Okra', '3', '8.0'),
('User_397', 'Luya', 'More than 5', 'Yes', '2', 'Very easy to use platform.', '12', '4', '7', '9', '9.51', 'Desktop', 'Lipa', '490.86', 'Sibuyas', '5', '4.0'),
('User_398', 'Mango', 'More than 5', 'Yes', '1', 'The UI is intuitive.', '16', '29', '5', '5', '1.39', 'Tablet', 'Lucena', '442.65', 'Pechay', '5', '12.0'),
('User_399', 'Mango', 'More than 5', 'No', '3', 'Could use better product search.', '14', '26', '8', '4', '3.47', 'Mobile', 'Lucena', '181.22', 'Mango', '3', '12.0'),
('User_400', 'Luya', '5-Apr', 'No', '4', 'Helpful for small farmers.', '17', '10', '1', '10', '10.58', 'Mobile', 'Lipa', '114.06', 'Calabasa', '4', '4.0'),
('User_401', 'Patatas', '1', 'Yes', '3', 'The UI is intuitive.', '15', '30', '0', '5', '4.92', 'Desktop', 'San Pablo', '228.1', 'Patatas', '3', '7.0'),
('User_402', 'Eggplant', '5-Apr', 'No', '5', 'Fast delivery and great quality!', '1', '25', '2', '10', '5.37', 'Tablet', 'Batangas', '291.99', 'Mango', '5', '8.0'),
('User_403', 'Corn', '3-Feb', 'Yes', '4', 'Could use better product search.', '5', '20', '10', '5', '3.59', 'Tablet', 'Calamba', '443.87', 'Okra', '4', '6.0'),
('User_404', 'Luya', '3-Feb', 'No', '1', 'I love the recommendations!', '15', '7', '7', '12', '12.46', 'Tablet', 'Calamba', '367.87', 'Papaya', '5', '4.0'),
('User_405', 'Carrot', 'More than 5', 'No', '2', 'Great initiative!', '19', '23', '0', '6', '14.76', 'Tablet', 'Calamba', '281.82', 'Bawang', '3', '5.0'),
('User_406', 'Bell Pepper', '3-Feb', 'Yes', '2', 'Helpful for small farmers.', '18', '14', '9', '1', '7.23', 'Desktop', 'Calamba', '76.52', 'Bawang', '4', '2.0'),
('User_407', 'Sibuyas', '1', 'No', '2', 'Fast delivery and great quality!', '19', '11', '9', '5', '11.96', 'Desktop', 'San Pablo', '171.01', 'Carrot', '4', '8.0'),
('User_408', 'Mango', '3-Feb', 'No', '1', 'Satisfied overall.', '18', '8', '7', '4', '1.46', 'Mobile', 'Lucena', '381.18', 'Patatas', '3', '12.0'),
('User_409', 'Luya', '3-Feb', 'No', '2', 'The UI is intuitive.', '1', '4', '1', '15', '7.74', 'Desktop', 'San Pablo', '90.12', 'Eggplant', '5', '4.0'),
('User_410', 'Corn', 'More than 5', 'No', '2', 'Fast delivery and great quality!', '3', '6', '3', '3', '4.2', 'Desktop', 'San Pablo', '189.74', 'Okra', '5', '6.0'),
('User_411', 'Papaya', '5-Apr', 'No', '3', 'Fast delivery and great quality!', '20', '8', '4', '12', '7.7', 'Tablet', 'Batangas', '480.3', 'Calabasa', '5', '0.0'),
('User_412', 'Eggplant', '5-Apr', 'No', '4', 'Very easy to use platform.', '10', '16', '10', '12', '14.14', 'Mobile', 'San Pablo', '365.79', 'Corn', '5', '8.0'),
('User_413', 'Mango', '1', 'No', '2', 'I love the recommendations!', '18', '22', '6', '15', '2.32', 'Tablet', 'Lucena', '89.45', 'Cabbage', '5', '12.0'),
('User_414', 'Tomato', '5-Apr', 'Yes', '4', 'Great initiative!', '12', '11', '10', '7', '9.31', 'Tablet', 'San Pablo', '300.37', 'Bell Pepper', '5', '21.0'),
('User_415', 'Pechay', '5-Apr', 'Yes', '1', 'I love the recommendations!', '20', '12', '0', '4', '3.74', 'Mobile', 'Lipa', '277.14', 'Mango', '5', '6.0'),
('User_416', 'Mango', '3-Feb', 'Yes', '4', 'I love the recommendations!', '16', '23', '8', '7', '13.11', 'Tablet', 'Lipa', '429.55', 'Pechay', '4', '12.0'),
('User_417', 'Patatas', '3-Feb', 'No', '5', 'Could use better product search.', '19', '20', '10', '9', '3.23', 'Desktop', 'Batangas', '67.57', 'Corn', '4', '7.0'),
('User_418', 'Sitaw', '3-Feb', 'No', '3', 'Needs improvements.', '16', '24', '5', '12', '9.93', 'Tablet', 'Lucena', '374.73', 'Carrot', '5', '2.0'),
('User_419', 'Patatas', '5-Apr', 'Yes', '5', 'Fast delivery and great quality!', '4', '21', '9', '5', '13.67', 'Mobile', 'Lipa', '140.29', 'Carrot', '4', '7.0'),
('User_420', 'Bell Pepper', '3-Feb', 'No', '1', 'Very easy to use platform.', '13', '9', '4', '13', '3.16', 'Tablet', 'San Pablo', '386.48', 'Patatas', '3', '2.0'),
('User_421', 'Papaya', '1', 'No', '1', 'Could use better product search.', '14', '16', '4', '11', '13.25', 'Mobile', 'Batangas', '232.41', 'Calabasa', '5', '0.0'),
('User_422', 'Tomato', '1', 'No', '1', 'Will use again.', '4', '16', '4', '7', '12.86', 'Desktop', 'Lucena', '389.69', 'Calabasa', '3', '21.0'),
('User_423', 'Calabasa', 'More than 5', 'Yes', '4', 'Will use again.', '14', '2', '9', '4', '9.87', 'Mobile', 'Calamba', '482.75', 'Sitaw', '5', '5.0'),
('User_424', 'Cabbage', 'More than 5', 'Yes', '4', 'Helpful for small farmers.', '7', '9', '6', '15', '6.21', 'Tablet', 'San Pablo', '410.1', 'Bell Pepper', '4', '20.0'),
('User_425', 'Tomato', '1', 'Yes', '3', 'Will use again.', '9', '14', '2', '9', '3.28', 'Tablet', 'Calamba', '239.31', 'Tomato', '3', '21.0'),
('User_426', 'Tomato', '3-Feb', 'No', '4', 'Needs improvements.', '13', '14', '10', '12', '8.08', 'Desktop', 'Calamba', '320.95', 'Corn', '3', '21.0'),
('User_427', 'Calabasa', '1', 'No', '4', 'I love the recommendations!', '2', '13', '9', '12', '2.78', 'Desktop', 'Lipa', '417.8', 'Okra', '4', '5.0'),
('User_428', 'Luya', 'More than 5', 'No', '3', 'The UI is intuitive.', '20', '24', '1', '6', '2.72', 'Mobile', 'Batangas', '232.82', 'Mango', '5', '4.0'),
('User_429', 'Pechay', 'More than 5', 'No', '5', 'Very easy to use platform.', '1', '19', '0', '5', '8.88', 'Desktop', 'Lucena', '104.78', 'Luya', '3', '6.0'),
('User_430', 'Bell Pepper', 'More than 5', 'No', '4', 'Fast delivery and great quality!', '20', '17', '8', '2', '4.86', 'Mobile', 'Calamba', '353.42', 'Patatas', '4', '2.0'),
('User_431', 'Carrot', '3-Feb', 'Yes', '1', 'Great initiative!', '12', '26', '10', '15', '3.07', 'Tablet', 'Lucena', '437.38', 'Sitaw', '5', '5.0'),
('User_432', 'Sitaw', '5-Apr', 'Yes', '2', 'I love the recommendations!', '8', '22', '10', '9', '14.69', 'Mobile', 'Lucena', '218.46', 'Tomato', '5', '2.0'),
('User_433', 'Ampalaya', '1', 'No', '4', 'Satisfied overall.', '10', '25', '3', '7', '9.72', 'Mobile', 'Lipa', '481.79', 'Sitaw', '3', '1.0'),
('User_434', 'Papaya', '1', 'No', '4', 'Great initiative!', '7', '2', '0', '4', '14.34', 'Tablet', 'Batangas', '51.13', 'Patatas', '5', '0.0'),
('User_435', 'Papaya', '1', 'No', '5', 'Very easy to use platform.', '4', '18', '2', '1', '6.28', 'Tablet', 'Calamba', '104.75', 'Calabasa', '5', '0.0'),
('User_436', 'Sibuyas', '3-Feb', 'No', '4', 'The UI is intuitive.', '18', '25', '0', '9', '2.12', 'Desktop', 'Batangas', '56.67', 'Bell Pepper', '4', '8.0'),
('User_437', 'Okra', '3-Feb', 'No', '1', 'Great initiative!', '7', '12', '8', '6', '7.42', 'Mobile', 'Batangas', '432.1', 'Bell Pepper', '5', '10.0'),
('User_438', 'Calabasa', 'More than 5', 'No', '1', 'Fast delivery and great quality!', '7', '22', '3', '4', '11.49', 'Mobile', 'Lucena', '294.63', 'Sitaw', '4', '5.0'),
('User_439', 'Carrot', '5-Apr', 'Yes', '4', 'Helpful for small farmers.', '15', '8', '1', '11', '11.44', 'Desktop', 'Lucena', '468.54', 'Luya', '5', '5.0'),
('User_440', 'Bell Pepper', '3-Feb', 'No', '2', 'The UI is intuitive.', '7', '6', '5', '15', '6.08', 'Mobile', 'San Pablo', '262.92', 'Okra', '4', '2.0'),
('User_441', 'Luya', '5-Apr', 'No', '4', 'Will use again.', '12', '14', '4', '5', '1.91', 'Mobile', 'Lipa', '59.39', 'Carrot', '5', '4.0'),
('User_442', 'Okra', '1', 'Yes', '4', 'Very easy to use platform.', '15', '14', '1', '11', '2.09', 'Tablet', 'Batangas', '133.97', 'Corn', '4', '10.0'),
('User_443', 'Patatas', '1', 'Yes', '5', 'Satisfied overall.', '20', '9', '9', '3', '9.26', 'Desktop', 'San Pablo', '162.79', 'Corn', '5', '7.0'),
('User_444', 'Calabasa', '3-Feb', 'Yes', '5', 'Very easy to use platform.', '18', '28', '2', '13', '6.89', 'Desktop', 'Lucena', '87.94', 'Tomato', '3', '5.0'),
('User_445', 'Luya', '3-Feb', 'Yes', '2', 'Helpful for small farmers.', '7', '11', '10', '2', '2.09', 'Mobile', 'San Pablo', '378.26', 'Corn', '3', '4.0'),
('User_446', 'Papaya', 'More than 5', 'Yes', '3', 'Will use again.', '17', '27', '2', '4', '9.96', 'Mobile', 'Lipa', '311.07', 'Papaya', '5', '0.0'),
('User_447', 'Cabbage', '5-Apr', 'Yes', '1', 'Needs improvements.', '10', '19', '9', '9', '2.36', 'Mobile', 'Calamba', '105.15', 'Bawang', '4', '20.0'),
('User_448', 'Luya', 'More than 5', 'Yes', '1', 'I love the recommendations!', '6', '21', '0', '6', '9.56', 'Tablet', 'Calamba', '307.42', 'Bell Pepper', '4', '4.0'),
('User_449', 'Cabbage', '3-Feb', 'Yes', '4', 'I love the recommendations!', '7', '12', '6', '10', '3.26', 'Desktop', 'Calamba', '391.66', 'Papaya', '5', '20.0'),
('User_450', 'Bawang', '5-Apr', 'Yes', '2', 'Helpful for small farmers.', '9', '9', '5', '3', '3.1', 'Mobile', 'Calamba', '153.7', 'Bawang', '3', '9.0'),
('User_451', 'Sibuyas', '5-Apr', 'No', '1', 'Will use again.', '10', '8', '7', '9', '7.43', 'Tablet', 'Lucena', '65.21', 'Luya', '3', '8.0'),
('User_452', 'Corn', 'More than 5', 'Yes', '1', 'Needs improvements.', '6', '29', '9', '15', '10.8', 'Desktop', 'San Pablo', '208.58', 'Patatas', '3', '6.0'),
('User_453', 'Luya', '5-Apr', 'Yes', '2', 'I love the recommendations!', '12', '16', '10', '8', '12.88', 'Tablet', 'Lipa', '153.52', 'Mango', '5', '4.0'),
('User_454', 'Sibuyas', '3-Feb', 'No', '3', 'The UI is intuitive.', '6', '12', '6', '3', '7.1', 'Tablet', 'Calamba', '264.1', 'Calabasa', '3', '8.0'),
('User_455', 'Pechay', '1', 'Yes', '5', 'The UI is intuitive.', '10', '10', '8', '7', '6.39', 'Mobile', 'Lipa', '234.18', 'Carrot', '5', '6.0'),
('User_456', 'Corn', '5-Apr', 'Yes', '4', 'Could use better product search.', '10', '8', '4', '12', '14.79', 'Desktop', 'Lipa', '477.02', 'Okra', '4', '6.0'),
('User_457', 'Calabasa', 'More than 5', 'No', '3', 'Helpful for small farmers.', '3', '9', '0', '7', '10.47', 'Tablet', 'San Pablo', '370.43', 'Okra', '3', '5.0'),
('User_458', 'Tomato', '5-Apr', 'No', '3', 'Very easy to use platform.', '16', '21', '3', '5', '10.73', 'Desktop', 'San Pablo', '496.83', 'Patatas', '3', '21.0'),
('User_459', 'Eggplant', 'More than 5', 'No', '3', 'Will use again.', '3', '6', '3', '1', '8.88', 'Tablet', 'Calamba', '117.8', 'Calabasa', '4', '8.0'),
('User_460', 'Mango', '5-Apr', 'No', '4', 'Helpful for small farmers.', '8', '27', '8', '15', '9.6', 'Desktop', 'Lipa', '57.07', 'Tomato', '5', '12.0'),
('User_461', 'Sitaw', '1', 'No', '5', 'Needs improvements.', '1', '26', '7', '2', '10.43', 'Mobile', 'Calamba', '334.85', 'Sibuyas', '3', '2.0'),
('User_462', 'Tomato', 'More than 5', 'No', '4', 'Helpful for small farmers.', '17', '26', '8', '7', '1.61', 'Mobile', 'San Pablo', '219.1', 'Corn', '4', '21.0'),
('User_463', 'Okra', '5-Apr', 'Yes', '1', 'Needs improvements.', '1', '3', '6', '4', '12.83', 'Mobile', 'Batangas', '499.09', 'Luya', '4', '10.0'),
('User_464', 'Okra', '3-Feb', 'No', '3', 'The UI is intuitive.', '15', '26', '10', '5', '1.27', 'Tablet', 'San Pablo', '120.99', 'Mango', '5', '10.0'),
('User_465', 'Papaya', '3-Feb', 'No', '2', 'Helpful for small farmers.', '3', '23', '5', '14', '10.31', 'Desktop', 'Lucena', '105.13', 'Papaya', '3', '0.0'),
('User_466', 'Calabasa', 'More than 5', 'Yes', '1', 'Satisfied overall.', '13', '7', '0', '7', '5.22', 'Desktop', 'Lucena', '242.8', 'Carrot', '3', '5.0'),
('User_467', 'Corn', '1', 'Yes', '2', 'Fast delivery and great quality!', '10', '4', '2', '4', '8.15', 'Desktop', 'Lucena', '345.31', 'Papaya', '5', '6.0'),
('User_468', 'Papaya', '3-Feb', 'Yes', '1', 'Satisfied overall.', '16', '11', '6', '7', '14.05', 'Mobile', 'Calamba', '317.9', 'Calabasa', '4', '0.0'),
('User_469', 'Bell Pepper', 'More than 5', 'No', '5', 'Will use again.', '1', '26', '6', '15', '7.89', 'Desktop', 'Lipa', '122.31', 'Calabasa', '5', '2.0'),
('User_470', 'Luya', '3-Feb', 'Yes', '3', 'Great initiative!', '2', '30', '9', '11', '2.19', 'Desktop', 'Lucena', '317.47', 'Papaya', '5', '4.0'),
('User_471', 'Pechay', '5-Apr', 'No', '5', 'The UI is intuitive.', '14', '23', '4', '13', '5.84', 'Desktop', 'Lucena', '242.86', 'Tomato', '4', '6.0'),
('User_472', 'Cabbage', '1', 'No', '2', 'Fast delivery and great quality!', '3', '5', '4', '1', '6.71', 'Mobile', 'Lucena', '186.23', 'Cabbage', '5', '20.0'),
('User_473', 'Corn', '1', 'Yes', '5', 'Fast delivery and great quality!', '11', '23', '7', '15', '6.26', 'Tablet', 'Lucena', '239.61', 'Mango', '5', '6.0'),
('User_474', 'Bawang', '5-Apr', 'Yes', '4', 'The UI is intuitive.', '1', '29', '9', '8', '9.29', 'Mobile', 'Lipa', '464.77', 'Sitaw', '3', '9.0'),
('User_475', 'Calabasa', '5-Apr', 'No', '1', 'Helpful for small farmers.', '11', '1', '6', '7', '7.8', 'Mobile', 'Lucena', '279.3', 'Corn', '5', '5.0'),
('User_476', 'Bell Pepper', '5-Apr', 'No', '5', 'The UI is intuitive.', '10', '17', '9', '10', '13.81', 'Mobile', 'Calamba', '89.28', 'Sitaw', '5', '2.0'),
('User_477', 'Mango', 'More than 5', 'Yes', '1', 'Will use again.', '9', '9', '4', '14', '3.6', 'Tablet', 'Calamba', '334.66', 'Cabbage', '4', '12.0'),
('User_478', 'Sibuyas', '3-Feb', 'No', '1', 'Will use again.', '5', '22', '10', '12', '10.64', 'Mobile', 'Lucena', '226.29', 'Pechay', '3', '8.0'),
('User_479', 'Cabbage', '1', 'No', '4', 'Needs improvements.', '7', '5', '0', '12', '9.52', 'Desktop', 'Calamba', '467.42', 'Mango', '3', '20.0'),
('User_480', 'Papaya', '5-Apr', 'No', '4', 'Great initiative!', '1', '22', '7', '12', '12.5', 'Desktop', 'San Pablo', '456.23', 'Bell Pepper', '4', '0.0'),
('User_481', 'Papaya', '5-Apr', 'Yes', '3', 'I love the recommendations!', '13', '8', '2', '7', '8.8', 'Mobile', 'Lipa', '350.97', 'Sitaw', '5', '0.0'),
('User_482', 'Bell Pepper', '5-Apr', 'No', '5', 'Helpful for small farmers.', '10', '7', '5', '5', '2.95', 'Mobile', 'San Pablo', '478.58', 'Sibuyas', '3', '2.0'),
('User_483', 'Patatas', '5-Apr', 'Yes', '4', 'The UI is intuitive.', '13', '27', '3', '1', '5.65', 'Desktop', 'Lucena', '448.26', 'Sitaw', '4', '7.0'),
('User_484', 'Papaya', '5-Apr', 'No', '2', 'Very easy to use platform.', '16', '7', '0', '8', '7.31', 'Desktop', 'Calamba', '338.91', 'Calabasa', '3', '0.0'),
('User_485', 'Bell Pepper', '1', 'Yes', '2', 'Fast delivery and great quality!', '18', '27', '2', '11', '5.85', 'Tablet', 'Batangas', '262.78', 'Sitaw', '5', '2.0'),
('User_486', 'Mango', '5-Apr', 'Yes', '5', 'Fast delivery and great quality!', '5', '25', '2', '5', '1.4', 'Desktop', 'Lucena', '259.62', 'Eggplant', '5', '12.0'),
('User_487', 'Papaya', 'More than 5', 'No', '2', 'Helpful for small farmers.', '16', '1', '1', '5', '11.51', 'Tablet', 'Batangas', '401.95', 'Okra', '5', '0.0'),
('User_488', 'Okra', '1', 'No', '3', 'Helpful for small farmers.', '15', '1', '2', '7', '2.2', 'Tablet', 'Calamba', '276.03', 'Mango', '4', '10.0'),
('User_489', 'Tomato', '3-Feb', 'Yes', '1', 'The UI is intuitive.', '6', '27', '6', '6', '9.82', 'Tablet', 'Calamba', '156.56', 'Sibuyas', '5', '21.0'),
('User_490', 'Sitaw', '3-Feb', 'Yes', '1', 'Satisfied overall.', '14', '24', '6', '14', '2.43', 'Mobile', 'Calamba', '345.36', 'Bawang', '5', '2.0'),
('User_491', 'Okra', 'More than 5', 'Yes', '4', 'Needs improvements.', '13', '22', '8', '2', '11.97', 'Tablet', 'San Pablo', '286.97', 'Eggplant', '3', '10.0'),
('User_492', 'Patatas', '3-Feb', 'Yes', '2', 'Fast delivery and great quality!', '13', '1', '3', '11', '5.5', 'Mobile', 'San Pablo', '165.64', 'Luya', '3', '7.0'),
('User_493', 'Calabasa', 'More than 5', 'Yes', '3', 'Could use better product search.', '10', '12', '0', '1', '10.44', 'Tablet', 'Batangas', '145.92', 'Calabasa', '3', '5.0'),
('User_494', 'Eggplant', '5-Apr', 'No', '4', 'I love the recommendations!', '10', '14', '5', '1', '12.23', 'Mobile', 'San Pablo', '265.35', 'Carrot', '4', '8.0'),
('User_495', 'Eggplant', '5-Apr', 'No', '3', 'Needs improvements.', '7', '14', '5', '3', '14.13', 'Tablet', 'San Pablo', '411.26', 'Okra', '3', '8.0'),
('User_496', 'Sibuyas', 'More than 5', 'Yes', '4', 'Will use again.', '5', '1', '2', '3', '2.62', 'Desktop', 'Lucena', '463.18', 'Calabasa', '5', '8.0'),
('User_497', 'Luya', '5-Apr', 'No', '3', 'Satisfied overall.', '9', '7', '6', '12', '3.02', 'Mobile', 'Calamba', '212.91', 'Corn', '5', '4.0'),
('User_498', 'Corn', '3-Feb', 'No', '1', 'Helpful for small farmers.', '8', '1', '3', '7', '1.38', 'Desktop', 'Lipa', '453.39', 'Carrot', '3', '6.0'),
('User_499', 'Eggplant', 'More than 5', 'Yes', '3', 'Fast delivery and great quality!', '1', '22', '5', '15', '4.37', 'Desktop', 'Calamba', '220.41', 'Luya', '5', '8.0'),
('User_500', 'Okra', '5-Apr', 'No', '2', 'Will use again.', '13', '3', '4', '7', '14.55', 'Tablet', 'Batangas', '349.47', 'Papaya', '3', '10.0'),
('User_501', 'Star Apple', '5-Apr', 'No', '2', 'Great platform!', '14', '49', '5', '5', '14.68', 'Desktop', 'San Pablo', '414.26', 'Orange', '3', '13.0'),
('User_502', 'Orange', '5-Apr', 'Yes', '5', 'Easy to use.', '7', '4', '16', '9', '17.2', 'Desktop', 'Calamba', '414.26', 'Orange', '2', '16.0'),
('User_503', 'Orange', '1', 'Yes', '4', 'Love it!', '46', '38', '25', '14', '8.23', 'Desktop', 'Batangas', '414.26', 'Star Apple', '3', '16.0'),
('User_504', 'Saging', 'More than 5', 'No', '4', 'Great platform!', '42', '27', '18', '3', '11.62', 'Mobile', 'Batangas', '414.26', 'Atis', '3', '18.0'),
('User_505', 'Sili', '5-Apr', 'Yes', '2', 'Easy to use.', '2', '16', '24', '17', '19.04', 'Mobile', 'Lipa', '414.26', 'Dalandan', '3', '11.0'),
('User_506', 'Orange', '5-Apr', 'No', '1', 'Love it!', '18', '33', '3', '8', '1.05', 'Tablet', 'Batangas', '414.26', 'Star Apple', '4', '16.0'),
('User_507', 'Saging', '1', 'No', '3', 'Love it!', '19', '24', '12', '16', '3.07', 'Tablet', 'Calamba', '414.26', 'Atis', '2', '18.0'),
('User_508', 'Atis', '5-Apr', 'Yes', '4', 'Easy to use.', '23', '9', '27', '15', '19.09', 'Mobile', 'Lipa', '414.26', 'Dalandan', '3', '14.0'),
('User_509', 'Saging', '1', 'Yes', '2', 'Love it!', '45', '35', '19', '1', '7.11', 'Desktop', 'Batangas', '414.26', 'Dalandan', '1', '18.0'),
('User_510', 'Sili', '1', 'Yes', '1', 'Could be better.', '27', '31', '24', '10', '8.47', 'Mobile', 'Lipa', '414.26', 'Atis', '5', '11.0'),
('User_511', 'Dalandan', '5-Apr', 'Yes', '4', 'Easy to use.', '31', '23', '22', '9', '12.63', 'Tablet', 'Calamba', '414.26', 'Star Apple', '2', '15.0'),
('User_512', 'Saging', '1', 'Yes', '2', 'Could be better.', '1', '48', '6', '12', '19.35', 'Mobile', 'Lipa', '414.26', 'Saging', '3', '18.0'),
('User_513', 'Orange', '3-Feb', 'No', '1', 'Very useful!', '15', '26', '27', '12', '16.6', 'Mobile', 'Lucena', '414.26', 'Dalandan', '2', '16.0'),
('User_514', 'Orange', '5-Apr', 'No', '5', 'Love it!', '26', '5', '4', '3', '18.33', 'Desktop', 'Lipa', '414.26', 'Orange', '3', '16.0'),
('User_515', 'Star Apple', '5-Apr', 'No', '5', 'Love it!', '22', '38', '27', '15', '1.12', 'Desktop', 'Batangas', '414.26', 'Atis', '4', '13.0'),
('User_516', 'Atis', '3-Feb', 'No', '3', 'Very useful!', '17', '14', '5', '5', '16.92', 'Desktop', 'Batangas', '414.26', 'Star Apple', '3', '14.0'),
('User_517', 'Saging', 'More than 5', 'Yes', '1', 'Very useful!', '13', '3', '15', '19', '2.99', 'Desktop', 'Batangas', '414.26', 'Atis', '4', '18.0'),
('User_518', 'Atis', '3-Feb', 'No', '5', 'Easy to use.', '4', '7', '5', '19', '13.94', 'Desktop', 'Lipa', '414.26', 'Saging', '5', '14.0'),
('User_519', 'Atis', '3-Feb', 'No', '2', 'Love it!', '5', '34', '12', '7', '10.57', 'Mobile', 'Calamba', '414.26', 'Dalandan', '4', '14.0'),
('User_520', 'Star Apple', '5-Apr', 'Yes', '2', 'Easy to use.', '8', '21', '26', '17', '2.03', 'Tablet', 'Lipa', '414.26', 'Star Apple', '4', '13.0'),
('User_521', 'Orange', 'More than 5', 'Yes', '5', 'Very useful!', '16', '30', '29', '9', '14.5', 'Mobile', 'San Pablo', '414.26', 'Star Apple', '2', '16.0'),
('User_522', 'Sili', '3-Feb', 'No', '1', 'Easy to use.', '26', '35', '24', '2', '17.64', 'Mobile', 'Calamba', '414.26', 'Saging', '1', '11.0'),
('User_523', 'Sili', '3-Feb', 'Yes', '4', 'Could be better.', '39', '14', '10', '17', '1.18', 'Mobile', 'Lipa', '414.26', 'Atis', '2', '11.0'),
('User_524', 'Sili', '3-Feb', 'No', '1', 'Great platform!', '14', '30', '6', '9', '19.08', 'Tablet', 'Batangas', '414.26', 'Star Apple', '5', '11.0'),
('User_525', 'Sili', '5-Apr', 'Yes', '2', 'Easy to use.', '5', '26', '9', '1', '8.65', 'Mobile', 'San Pablo', '414.26', 'Atis', '3', '11.0'),
('User_526', 'Star Apple', '3-Feb', 'Yes', '4', 'Very useful!', '17', '29', '20', '13', '15.74', 'Desktop', 'Lipa', '414.26', 'Orange', '4', '13.0'),
('User_527', 'Sili', 'More than 5', 'No', '5', 'Love it!', '28', '43', '3', '14', '15.72', 'Mobile', 'Lucena', '414.26', 'Saging', '4', '11.0'),
('User_528', 'Dalandan', '1', 'No', '4', 'Very useful!', '47', '11', '16', '17', '18.35', 'Tablet', 'San Pablo', '414.26', 'Atis', '5', '15.0'),
('User_529', 'Dalandan', '3-Feb', 'No', '3', 'Great platform!', '17', '46', '22', '12', '12.46', 'Tablet', 'Calamba', '414.26', 'Orange', '3', '15.0'),
('User_530', 'Saging', '1', 'Yes', '5', 'Love it!', '13', '7', '1', '13', '19.49', 'Desktop', 'Calamba', '414.26', 'Atis', '1', '18.0'),
('User_531', 'Dalandan', '1', 'No', '5', 'Could be better.', '31', '20', '17', '11', '12.99', 'Tablet', 'Lucena', '414.26', 'Atis', '3', '15.0'),
('User_532', 'Dalandan', '1', 'No', '4', 'Easy to use.', '11', '14', '3', '6', '9.28', 'Desktop', 'Lipa', '414.26', 'Star Apple', '1', '15.0'),
('User_533', 'Dalandan', '3-Feb', 'No', '4', 'Could be better.', '40', '13', '24', '17', '14.76', 'Desktop', 'Calamba', '414.26', 'Star Apple', '3', '15.0'),
('User_534', 'Saging', '3-Feb', 'No', '2', 'Easy to use.', '10', '3', '29', '19', '9.21', 'Mobile', 'Batangas', '414.26', 'Sili', '2', '18.0'),
('User_535', 'Saging', '5-Apr', 'No', '3', 'Very useful!', '40', '25', '13', '6', '18.66', 'Tablet', 'Batangas', '414.26', 'Star Apple', '4', '18.0'),
('User_536', 'Star Apple', '3-Feb', 'No', '1', 'Could be better.', '15', '43', '12', '17', '13.73', 'Desktop', 'Lipa', '414.26', 'Saging', '4', '13.0'),
('User_537', 'Star Apple', '5-Apr', 'No', '3', 'Easy to use.', '31', '16', '27', '8', '2.66', 'Desktop', 'Lucena', '414.26', 'Orange', '4', '13.0'),
('User_538', 'Atis', '1', 'No', '5', 'Very useful!', '21', '48', '4', '18', '10.62', 'Desktop', 'Lucena', '414.26', 'Orange', '1', '14.0'),
('User_539', 'Sili', '3-Feb', 'No', '1', 'Very useful!', '31', '49', '2', '12', '8.59', 'Desktop', 'San Pablo', '414.26', 'Atis', '5', '11.0'),
('User_540', 'Saging', '5-Apr', 'Yes', '5', 'Love it!', '25', '49', '19', '5', '2.16', 'Mobile', 'Batangas', '414.26', 'Sili', '1', '18.0'),
('User_541', 'Saging', 'More than 5', 'No', '4', 'Could be better.', '36', '21', '14', '1', '2.35', 'Desktop', 'Lucena', '414.26', 'Atis', '2', '18.0'),
('User_542', 'Sili', '5-Apr', 'Yes', '1', 'Very useful!', '26', '45', '19', '14', '18.96', 'Desktop', 'Lipa', '414.26', 'Star Apple', '4', '11.0'),
('User_543', 'Atis', '1', 'No', '1', 'Great platform!', '22', '36', '29', '4', '11.88', 'Tablet', 'Calamba', '414.26', 'Dalandan', '1', '14.0'),
('User_544', 'Atis', '3-Feb', 'Yes', '3', 'Love it!', '27', '2', '23', '2', '19.8', 'Tablet', 'Calamba', '414.26', 'Star Apple', '3', '14.0'),
('User_545', 'Sili', '5-Apr', 'No', '5', 'Very useful!', '8', '40', '6', '9', '14.44', 'Mobile', 'Calamba', '414.26', 'Dalandan', '5', '11.0'),
('User_546', 'Orange', '1', 'Yes', '1', 'Love it!', '34', '40', '19', '9', '16.83', 'Mobile', 'Lucena', '414.26', 'Sili', '5', '16.0'),
('User_547', 'Atis', '5-Apr', 'No', '3', 'Love it!', '46', '22', '8', '13', '15.14', 'Mobile', 'Batangas', '414.26', 'Orange', '3', '14.0'),
('User_548', 'Dalandan', '1', 'No', '1', 'Very useful!', '13', '46', '11', '15', '10.46', 'Tablet', 'Batangas', '414.26', 'Dalandan', '2', '15.0'),
('User_549', 'Orange', '5-Apr', 'No', '5', 'Great platform!', '3', '49', '6', '16', '15.17', 'Tablet', 'Lucena', '414.26', 'Dalandan', '2', '16.0'),
('User_550', 'Sili', '1', 'Yes', '5', 'Very useful!', '14', '22', '6', '12', '14.26', 'Mobile', 'Batangas', '414.26', 'Sili', '5', '11.0'),
('User_551', 'Orange', '3-Feb', 'Yes', '5', 'Great platform!', '48', '39', '20', '6', '1.39', 'Mobile', 'Lipa', '414.26', 'Star Apple', '2', '16.0'),
('User_552', 'Sili', '3-Feb', 'No', '5', 'Great platform!', '44', '49', '24', '19', '19.02', 'Mobile', 'Calamba', '414.26', 'Sili', '5', '11.0'),
('User_553', 'Saging', '1', 'Yes', '3', 'Very useful!', '45', '29', '11', '1', '4.37', 'Mobile', 'San Pablo', '414.26', 'Star Apple', '3', '18.0'),
('User_554', 'Sili', '5-Apr', 'Yes', '4', 'Love it!', '13', '12', '19', '19', '9.81', 'Mobile', 'Lipa', '414.26', 'Star Apple', '5', '11.0'),
('User_555', 'Dalandan', '1', 'No', '4', 'Love it!', '32', '33', '1', '9', '7.95', 'Tablet', 'Lucena', '414.26', 'Star Apple', '4', '15.0'),
('User_556', 'Dalandan', '5-Apr', 'No', '3', 'Very useful!', '42', '27', '26', '18', '13.42', 'Desktop', 'Batangas', '414.26', 'Dalandan', '5', '15.0'),
('User_557', 'Dalandan', '5-Apr', 'No', '5', 'Could be better.', '39', '46', '3', '5', '1.22', 'Desktop', 'Batangas', '414.26', 'Atis', '4', '15.0'),
('User_558', 'Saging', 'More than 5', 'No', '3', 'Could be better.', '30', '16', '14', '17', '12.6', 'Desktop', 'Lipa', '414.26', 'Star Apple', '2', '18.0'),
('User_559', 'Sili', '1', 'No', '2', 'Easy to use.', '31', '29', '27', '4', '5.05', 'Tablet', 'Batangas', '414.26', 'Orange', '5', '11.0'),
('User_560', 'Star Apple', 'More than 5', 'No', '5', 'Great platform!', '10', '25', '2', '18', '13.47', 'Mobile', 'San Pablo', '414.26', 'Atis', '2', '13.0'),
('User_561', 'Star Apple', 'More than 5', 'Yes', '2', 'Love it!', '23', '13', '26', '19', '8.36', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '5', '13.0'),
('User_562', 'Dalandan', '3-Feb', 'Yes', '1', 'Easy to use.', '36', '44', '25', '17', '17.19', 'Mobile', 'Lipa', '414.26', 'Dalandan', '1', '15.0'),
('User_563', 'Saging', '1', 'No', '1', 'Easy to use.', '16', '37', '22', '6', '15.54', 'Desktop', 'Calamba', '414.26', 'Sili', '1', '18.0'),
('User_564', 'Dalandan', '3-Feb', 'No', '1', 'Easy to use.', '26', '40', '5', '5', '2.91', 'Tablet', 'San Pablo', '414.26', 'Orange', '3', '15.0'),
('User_565', 'Atis', '5-Apr', 'No', '5', 'Great platform!', '25', '47', '5', '1', '14.54', 'Mobile', 'Batangas', '414.26', 'Orange', '2', '14.0'),
('User_566', 'Saging', '3-Feb', 'Yes', '4', 'Very useful!', '12', '31', '7', '3', '14.79', 'Tablet', 'Batangas', '414.26', 'Atis', '1', '18.0'),
('User_567', 'Sili', '1', 'No', '1', 'Very useful!', '10', '26', '26', '3', '11.74', 'Mobile', 'Batangas', '414.26', 'Sili', '1', '11.0'),
('User_568', 'Dalandan', 'More than 5', 'Yes', '1', 'Very useful!', '26', '30', '24', '9', '8.75', 'Tablet', 'Calamba', '414.26', 'Sili', '3', '15.0'),
('User_569', 'Dalandan', '5-Apr', 'No', '2', 'Great platform!', '32', '13', '7', '15', '4.08', 'Desktop', 'Batangas', '414.26', 'Atis', '1', '15.0'),
('User_570', 'Dalandan', 'More than 5', 'Yes', '5', 'Love it!', '44', '47', '13', '1', '3.91', 'Desktop', 'Lucena', '414.26', 'Saging', '4', '15.0'),
('User_571', 'Orange', '3-Feb', 'Yes', '3', 'Easy to use.', '1', '1', '22', '5', '19.29', 'Tablet', 'Lucena', '414.26', 'Sili', '2', '16.0'),
('User_572', 'Dalandan', 'More than 5', 'No', '2', 'Easy to use.', '12', '32', '9', '16', '17.81', 'Desktop', 'San Pablo', '414.26', 'Sili', '3', '15.0'),
('User_573', 'Star Apple', '1', 'No', '4', 'Easy to use.', '19', '14', '8', '12', '16.2', 'Desktop', 'Lucena', '414.26', 'Atis', '4', '13.0'),
('User_574', 'Star Apple', '5-Apr', 'Yes', '5', 'Easy to use.', '22', '30', '6', '6', '3.14', 'Mobile', 'Calamba', '414.26', 'Star Apple', '5', '13.0'),
('User_575', 'Orange', '1', 'No', '2', 'Easy to use.', '40', '9', '7', '3', '7.09', 'Tablet', 'San Pablo', '414.26', 'Atis', '2', '16.0'),
('User_576', 'Sili', 'More than 5', 'Yes', '2', 'Easy to use.', '29', '1', '8', '10', '15.85', 'Mobile', 'San Pablo', '414.26', 'Dalandan', '1', '11.0'),
('User_577', 'Star Apple', '5-Apr', 'Yes', '1', 'Very useful!', '7', '23', '9', '13', '9.3', 'Tablet', 'Lipa', '414.26', 'Dalandan', '4', '13.0'),
('User_578', 'Saging', '3-Feb', 'No', '2', 'Very useful!', '11', '40', '7', '19', '18.74', 'Desktop', 'Calamba', '414.26', 'Sili', '3', '18.0'),
('User_579', 'Sili', 'More than 5', 'Yes', '1', 'Love it!', '24', '6', '8', '8', '7.33', 'Tablet', 'Batangas', '414.26', 'Star Apple', '1', '11.0'),
('User_580', 'Dalandan', 'More than 5', 'Yes', '3', 'Great platform!', '11', '22', '9', '10', '8.89', 'Desktop', 'Calamba', '414.26', 'Atis', '3', '15.0'),
('User_581', 'Star Apple', '3-Feb', 'No', '2', 'Love it!', '15', '6', '10', '12', '18.8', 'Desktop', 'San Pablo', '414.26', 'Dalandan', '1', '13.0'),
('User_582', 'Star Apple', 'More than 5', 'Yes', '5', 'Could be better.', '36', '42', '29', '2', '14.52', 'Mobile', 'Lucena', '414.26', 'Saging', '5', '13.0'),
('User_583', 'Orange', '5-Apr', 'No', '2', 'Easy to use.', '40', '44', '24', '17', '6.77', 'Mobile', 'Lucena', '414.26', 'Star Apple', '2', '16.0'),
('User_584', 'Dalandan', '3-Feb', 'No', '3', 'Love it!', '32', '36', '10', '2', '7.82', 'Desktop', 'Batangas', '414.26', 'Saging', '3', '15.0'),
('User_585', 'Atis', '5-Apr', 'No', '2', 'Great platform!', '1', '26', '22', '19', '1.51', 'Desktop', 'Lucena', '414.26', 'Atis', '2', '14.0'),
('User_586', 'Star Apple', 'More than 5', 'No', '1', 'Could be better.', '23', '24', '7', '15', '13.45', 'Tablet', 'Calamba', '414.26', 'Dalandan', '2', '13.0'),
('User_587', 'Atis', '5-Apr', 'Yes', '2', 'Great platform!', '10', '10', '3', '6', '7.96', 'Mobile', 'San Pablo', '414.26', 'Saging', '5', '14.0'),
('User_588', 'Saging', '5-Apr', 'No', '4', 'Love it!', '15', '49', '16', '7', '14.62', 'Desktop', 'San Pablo', '414.26', 'Orange', '2', '18.0'),
('User_589', 'Atis', '5-Apr', 'Yes', '4', 'Could be better.', '36', '35', '7', '14', '4.3', 'Mobile', 'Lucena', '414.26', 'Orange', '1', '14.0'),
('User_590', 'Sili', '1', 'No', '5', 'Love it!', '22', '43', '3', '11', '2.74', 'Tablet', 'Calamba', '414.26', 'Sili', '5', '11.0'),
('User_591', 'Atis', '3-Feb', 'No', '5', 'Great platform!', '8', '11', '1', '2', '13.43', 'Desktop', 'Calamba', '414.26', 'Atis', '1', '14.0'),
('User_592', 'Orange', 'More than 5', 'No', '1', 'Great platform!', '32', '18', '16', '18', '4.03', 'Mobile', 'San Pablo', '414.26', 'Saging', '2', '16.0'),
('User_593', 'Saging', '1', 'Yes', '5', 'Great platform!', '48', '25', '25', '4', '13.25', 'Desktop', 'Calamba', '414.26', 'Atis', '2', '18.0'),
('User_594', 'Dalandan', '5-Apr', 'No', '3', 'Could be better.', '17', '15', '3', '16', '15.72', 'Mobile', 'Lucena', '414.26', 'Star Apple', '2', '15.0'),
('User_595', 'Sili', 'More than 5', 'Yes', '3', 'Very useful!', '35', '13', '19', '3', '12.39', 'Tablet', 'Batangas', '414.26', 'Sili', '2', '11.0'),
('User_596', 'Orange', '5-Apr', 'No', '4', 'Very useful!', '2', '45', '21', '18', '8.57', 'Desktop', 'Lucena', '414.26', 'Dalandan', '2', '16.0'),
('User_597', 'Orange', '3-Feb', 'Yes', '1', 'Easy to use.', '45', '11', '15', '8', '11.59', 'Tablet', 'Calamba', '414.26', 'Sili', '5', '16.0'),
('User_598', 'Sili', '3-Feb', 'No', '3', 'Easy to use.', '8', '34', '17', '5', '11.99', 'Desktop', 'Calamba', '414.26', 'Saging', '5', '11.0'),
('User_599', 'Orange', '3-Feb', 'No', '5', 'Love it!', '16', '31', '28', '10', '4.63', 'Tablet', 'San Pablo', '414.26', 'Star Apple', '4', '16.0'),
('User_600', 'Orange', '5-Apr', 'Yes', '1', 'Very useful!', '44', '8', '3', '1', '12.67', 'Mobile', 'San Pablo', '414.26', 'Star Apple', '5', '16.0'),
('User_601', 'Star Apple', '1', 'Yes', '1', 'Love it!', '22', '17', '27', '18', '3.62', 'Desktop', 'Lucena', '414.26', 'Dalandan', '3', '13.0'),
('User_602', 'Star Apple', 'More than 5', 'No', '1', 'Great platform!', '7', '1', '14', '12', '12.51', 'Mobile', 'Lucena', '414.26', 'Orange', '2', '13.0'),
('User_603', 'Sili', '3-Feb', 'No', '4', 'Great platform!', '14', '6', '13', '17', '13.89', 'Mobile', 'Batangas', '414.26', 'Star Apple', '4', '11.0'),
('User_604', 'Star Apple', '3-Feb', 'Yes', '2', 'Very useful!', '17', '29', '14', '4', '14.15', 'Tablet', 'Lipa', '414.26', 'Saging', '1', '13.0'),
('User_605', 'Saging', '3-Feb', 'Yes', '2', 'Could be better.', '33', '22', '19', '6', '17.5', 'Tablet', 'Lipa', '414.26', 'Orange', '3', '18.0'),
('User_606', 'Saging', '3-Feb', 'No', '2', 'Easy to use.', '42', '13', '22', '17', '12.98', 'Mobile', 'Lucena', '414.26', 'Atis', '1', '18.0'),
('User_607', 'Atis', '1', 'No', '5', 'Could be better.', '47', '18', '19', '13', '14.29', 'Tablet', 'Lucena', '414.26', 'Saging', '3', '14.0'),
('User_608', 'Sili', '3-Feb', 'No', '4', 'Great platform!', '45', '4', '18', '7', '12.26', 'Desktop', 'Calamba', '414.26', 'Saging', '5', '11.0'),
('User_609', 'Atis', '3-Feb', 'Yes', '2', 'Very useful!', '23', '4', '4', '2', '6.63', 'Desktop', 'Batangas', '414.26', 'Sili', '3', '14.0'),
('User_610', 'Dalandan', '5-Apr', 'Yes', '2', 'Very useful!', '14', '15', '0', '6', '8.91', 'Desktop', 'Calamba', '414.26', 'Star Apple', '5', '15.0'),
('User_611', 'Sili', '1', 'Yes', '1', 'Easy to use.', '2', '45', '0', '18', '16.04', 'Desktop', 'Lipa', '414.26', 'Atis', '1', '11.0'),
('User_612', 'Dalandan', 'More than 5', 'Yes', '5', 'Easy to use.', '44', '15', '24', '19', '5.23', 'Mobile', 'Batangas', '414.26', 'Orange', '5', '15.0'),
('User_613', 'Saging', 'More than 5', 'No', '4', 'Easy to use.', '14', '10', '18', '19', '8.28', 'Tablet', 'Lipa', '414.26', 'Orange', '2', '18.0'),
('User_614', 'Orange', '1', 'Yes', '5', 'Love it!', '14', '43', '9', '4', '18.74', 'Mobile', 'Lipa', '414.26', 'Saging', '2', '16.0'),
('User_615', 'Dalandan', '3-Feb', 'No', '1', 'Easy to use.', '38', '8', '7', '4', '13.05', 'Mobile', 'San Pablo', '414.26', 'Sili', '4', '15.0'),
('User_616', 'Atis', '1', 'No', '3', 'Great platform!', '45', '30', '26', '9', '11.26', 'Tablet', 'Batangas', '414.26', 'Star Apple', '1', '14.0'),
('User_617', 'Sili', '3-Feb', 'No', '4', 'Could be better.', '19', '7', '20', '6', '14.29', 'Mobile', 'Calamba', '414.26', 'Dalandan', '2', '11.0'),
('User_618', 'Sili', '1', 'Yes', '5', 'Could be better.', '32', '19', '6', '8', '14.22', 'Tablet', 'Batangas', '414.26', 'Dalandan', '4', '11.0'),
('User_619', 'Orange', '3-Feb', 'No', '1', 'Love it!', '3', '42', '4', '15', '13.33', 'Desktop', 'Lucena', '414.26', 'Sili', '5', '16.0'),
('User_620', 'Orange', 'More than 5', 'Yes', '4', 'Great platform!', '41', '13', '26', '15', '4.82', 'Desktop', 'Batangas', '414.26', 'Saging', '4', '16.0'),
('User_621', 'Dalandan', '5-Apr', 'No', '1', 'Very useful!', '2', '2', '21', '7', '4.22', 'Desktop', 'Lipa', '414.26', 'Sili', '4', '15.0'),
('User_622', 'Star Apple', '1', 'Yes', '1', 'Very useful!', '21', '42', '2', '12', '7.44', 'Desktop', 'Calamba', '414.26', 'Sili', '2', '13.0'),
('User_623', 'Dalandan', '1', 'No', '3', 'Very useful!', '18', '43', '12', '12', '4.43', 'Desktop', 'Lucena', '414.26', 'Atis', '3', '15.0'),
('User_624', 'Orange', 'More than 5', 'Yes', '4', 'Easy to use.', '49', '47', '26', '16', '4.74', 'Desktop', 'Batangas', '414.26', 'Star Apple', '5', '16.0'),
('User_625', 'Atis', '1', 'No', '1', 'Great platform!', '5', '16', '22', '18', '12.55', 'Mobile', 'San Pablo', '414.26', 'Sili', '3', '14.0'),
('User_626', 'Atis', 'More than 5', 'No', '3', 'Very useful!', '23', '5', '11', '6', '6.06', 'Desktop', 'Lucena', '414.26', 'Star Apple', '2', '14.0'),
('User_627', 'Sili', '1', 'No', '3', 'Could be better.', '3', '23', '26', '11', '14.09', 'Desktop', 'Lucena', '414.26', 'Orange', '1', '11.0'),
('User_628', 'Dalandan', '5-Apr', 'Yes', '5', 'Could be better.', '23', '47', '17', '13', '3.94', 'Tablet', 'Calamba', '414.26', 'Atis', '3', '15.0'),
('User_629', 'Star Apple', '5-Apr', 'Yes', '1', 'Great platform!', '49', '44', '19', '18', '13.53', 'Mobile', 'San Pablo', '414.26', 'Star Apple', '3', '13.0'),
('User_630', 'Orange', '3-Feb', 'Yes', '5', 'Love it!', '16', '35', '23', '12', '1.05', 'Mobile', 'Batangas', '414.26', 'Dalandan', '2', '16.0'),
('User_631', 'Atis', '5-Apr', 'Yes', '3', 'Easy to use.', '3', '9', '5', '9', '12.13', 'Tablet', 'Batangas', '414.26', 'Star Apple', '3', '14.0'),
('User_632', 'Saging', 'More than 5', 'Yes', '1', 'Love it!', '41', '19', '5', '16', '17.42', 'Mobile', 'Batangas', '414.26', 'Orange', '4', '18.0'),
('User_633', 'Dalandan', '5-Apr', 'No', '5', 'Love it!', '19', '30', '6', '4', '19.38', 'Desktop', 'San Pablo', '414.26', 'Orange', '2', '15.0'),
('User_634', 'Orange', 'More than 5', 'Yes', '3', 'Great platform!', '20', '5', '17', '18', '14.0', 'Mobile', 'San Pablo', '414.26', 'Atis', '5', '16.0'),
('User_635', 'Dalandan', '1', 'Yes', '4', 'Could be better.', '2', '34', '11', '6', '12.95', 'Tablet', 'Calamba', '414.26', 'Dalandan', '2', '15.0'),
('User_636', 'Saging', 'More than 5', 'Yes', '3', 'Very useful!', '40', '33', '14', '8', '16.41', 'Tablet', 'San Pablo', '414.26', 'Sili', '1', '18.0'),
('User_637', 'Atis', '1', 'Yes', '5', 'Very useful!', '5', '46', '5', '4', '16.08', 'Tablet', 'Lucena', '414.26', 'Atis', '1', '14.0'),
('User_638', 'Orange', '3-Feb', 'Yes', '1', 'Love it!', '15', '36', '24', '7', '8.0', 'Mobile', 'San Pablo', '414.26', 'Sili', '3', '16.0'),
('User_639', 'Saging', '3-Feb', 'No', '3', 'Great platform!', '12', '19', '4', '9', '17.54', 'Mobile', 'Lipa', '414.26', 'Dalandan', '4', '18.0'),
('User_640', 'Sili', '5-Apr', 'Yes', '4', 'Very useful!', '26', '9', '16', '2', '19.22', 'Desktop', 'Lipa', '414.26', 'Dalandan', '1', '11.0'),
('User_641', 'Dalandan', 'More than 5', 'Yes', '5', 'Could be better.', '15', '19', '14', '6', '4.29', 'Desktop', 'Lipa', '414.26', 'Sili', '5', '15.0'),
('User_642', 'Star Apple', '1', 'No', '3', 'Love it!', '33', '27', '13', '14', '12.22', 'Desktop', 'San Pablo', '414.26', 'Dalandan', '2', '13.0'),
('User_643', 'Sili', '1', 'Yes', '2', 'Very useful!', '16', '5', '1', '12', '19.58', 'Desktop', 'San Pablo', '414.26', 'Dalandan', '4', '11.0'),
('User_644', 'Orange', '3-Feb', 'No', '5', 'Easy to use.', '9', '17', '27', '15', '16.53', 'Mobile', 'Batangas', '414.26', 'Saging', '3', '16.0'),
('User_645', 'Saging', '5-Apr', 'Yes', '1', 'Love it!', '23', '2', '20', '3', '19.06', 'Desktop', 'Lucena', '414.26', 'Sili', '3', '18.0'),
('User_646', 'Star Apple', '5-Apr', 'Yes', '4', 'Easy to use.', '46', '5', '21', '5', '17.81', 'Tablet', 'Lucena', '414.26', 'Orange', '3', '13.0'),
('User_647', 'Star Apple', '3-Feb', 'No', '1', 'Could be better.', '41', '2', '5', '16', '18.35', 'Tablet', 'Calamba', '414.26', 'Orange', '4', '13.0'),
('User_648', 'Sili', '1', 'Yes', '3', 'Love it!', '27', '15', '12', '8', '4.41', 'Tablet', 'Lucena', '414.26', 'Saging', '2', '11.0'),
('User_649', 'Saging', '5-Apr', 'No', '2', 'Great platform!', '12', '34', '0', '12', '6.6', 'Tablet', 'Lipa', '414.26', 'Saging', '3', '18.0'),
('User_650', 'Sili', 'More than 5', 'Yes', '2', 'Love it!', '31', '18', '19', '13', '14.47', 'Mobile', 'Calamba', '414.26', 'Dalandan', '4', '11.0'),
('User_651', 'Dalandan', 'More than 5', 'Yes', '4', 'Easy to use.', '9', '12', '6', '16', '19.54', 'Tablet', 'Batangas', '414.26', 'Sili', '4', '15.0'),
('User_652', 'Dalandan', '5-Apr', 'Yes', '2', 'Very useful!', '43', '7', '15', '15', '10.35', 'Desktop', 'Lipa', '414.26', 'Star Apple', '1', '15.0'),
('User_653', 'Dalandan', '1', 'No', '4', 'Could be better.', '3', '32', '20', '3', '1.77', 'Desktop', 'Calamba', '414.26', 'Atis', '3', '15.0');
INSERT INTO `updated_dataset_with_fixed_product_encoded` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`) VALUES
('User_654', 'Orange', '1', 'Yes', '5', 'Could be better.', '17', '36', '10', '5', '1.39', 'Mobile', 'Calamba', '414.26', 'Star Apple', '2', '16.0'),
('User_655', 'Dalandan', '1', 'Yes', '1', 'Easy to use.', '23', '11', '18', '16', '14.03', 'Tablet', 'Calamba', '414.26', 'Sili', '3', '15.0'),
('User_656', 'Atis', 'More than 5', 'Yes', '4', 'Could be better.', '43', '35', '14', '17', '1.07', 'Mobile', 'Lucena', '414.26', 'Sili', '2', '14.0'),
('User_657', 'Saging', '3-Feb', 'Yes', '1', 'Great platform!', '14', '25', '27', '14', '8.06', 'Mobile', 'San Pablo', '414.26', 'Dalandan', '2', '18.0'),
('User_658', 'Dalandan', '5-Apr', 'No', '5', 'Great platform!', '49', '47', '19', '3', '13.67', 'Desktop', 'Lucena', '414.26', 'Orange', '2', '15.0'),
('User_659', 'Star Apple', 'More than 5', 'No', '1', 'Easy to use.', '23', '46', '1', '15', '6.14', 'Tablet', 'Lucena', '414.26', 'Sili', '5', '13.0'),
('User_660', 'Saging', '3-Feb', 'Yes', '4', 'Great platform!', '13', '45', '13', '16', '11.66', 'Mobile', 'Batangas', '414.26', 'Atis', '2', '18.0'),
('User_661', 'Atis', '1', 'No', '2', 'Love it!', '19', '26', '28', '9', '8.54', 'Tablet', 'Lucena', '414.26', 'Orange', '5', '14.0'),
('User_662', 'Saging', '5-Apr', 'Yes', '2', 'Great platform!', '9', '3', '13', '9', '10.45', 'Desktop', 'San Pablo', '414.26', 'Orange', '3', '18.0'),
('User_663', 'Orange', '3-Feb', 'Yes', '5', 'Great platform!', '47', '48', '25', '17', '6.63', 'Mobile', 'Lucena', '414.26', 'Atis', '2', '16.0'),
('User_664', 'Dalandan', '5-Apr', 'Yes', '1', 'Could be better.', '22', '23', '9', '6', '5.86', 'Tablet', 'Lucena', '414.26', 'Dalandan', '2', '15.0'),
('User_665', 'Star Apple', '1', 'No', '3', 'Easy to use.', '42', '3', '13', '6', '11.44', 'Mobile', 'Batangas', '414.26', 'Star Apple', '3', '13.0'),
('User_666', 'Orange', '1', 'Yes', '2', 'Great platform!', '2', '1', '26', '10', '16.06', 'Mobile', 'Lucena', '414.26', 'Dalandan', '1', '16.0'),
('User_667', 'Atis', '1', 'Yes', '3', 'Great platform!', '41', '17', '25', '4', '18.4', 'Mobile', 'Batangas', '414.26', 'Atis', '2', '14.0'),
('User_668', 'Atis', '1', 'No', '5', 'Love it!', '11', '26', '16', '15', '1.84', 'Tablet', 'San Pablo', '414.26', 'Orange', '5', '14.0'),
('User_669', 'Sili', '3-Feb', 'Yes', '2', 'Love it!', '47', '6', '28', '1', '3.41', 'Mobile', 'Calamba', '414.26', 'Saging', '5', '11.0'),
('User_670', 'Orange', '3-Feb', 'Yes', '1', 'Could be better.', '29', '37', '16', '18', '7.41', 'Mobile', 'Lucena', '414.26', 'Dalandan', '3', '16.0'),
('User_671', 'Saging', 'More than 5', 'Yes', '1', 'Very useful!', '5', '29', '15', '4', '17.4', 'Tablet', 'Lucena', '414.26', 'Star Apple', '3', '18.0'),
('User_672', 'Sili', '3-Feb', 'No', '5', 'Love it!', '37', '27', '2', '12', '4.11', 'Tablet', 'Calamba', '414.26', 'Sili', '3', '11.0'),
('User_673', 'Sili', 'More than 5', 'Yes', '4', 'Great platform!', '10', '28', '11', '12', '1.43', 'Mobile', 'Batangas', '414.26', 'Saging', '4', '11.0'),
('User_674', 'Atis', '1', 'Yes', '4', 'Could be better.', '38', '18', '10', '12', '4.28', 'Mobile', 'Calamba', '414.26', 'Saging', '2', '14.0'),
('User_675', 'Atis', '3-Feb', 'Yes', '5', 'Love it!', '46', '30', '19', '11', '7.89', 'Tablet', 'Lucena', '414.26', 'Orange', '1', '14.0'),
('User_676', 'Atis', '5-Apr', 'No', '4', 'Great platform!', '34', '41', '20', '16', '7.43', 'Tablet', 'Lucena', '414.26', 'Orange', '4', '14.0'),
('User_677', 'Saging', 'More than 5', 'No', '1', 'Love it!', '27', '36', '1', '14', '13.0', 'Desktop', 'Calamba', '414.26', 'Dalandan', '4', '18.0'),
('User_678', 'Sili', 'More than 5', 'Yes', '1', 'Very useful!', '28', '31', '24', '14', '4.75', 'Mobile', 'Lipa', '414.26', 'Atis', '3', '11.0'),
('User_679', 'Atis', '5-Apr', 'No', '1', 'Great platform!', '35', '23', '19', '12', '2.93', 'Mobile', 'Lipa', '414.26', 'Dalandan', '5', '14.0'),
('User_680', 'Star Apple', '3-Feb', 'Yes', '4', 'Could be better.', '27', '42', '11', '3', '19.34', 'Mobile', 'Lucena', '414.26', 'Sili', '5', '13.0'),
('User_681', 'Saging', '5-Apr', 'Yes', '5', 'Great platform!', '38', '34', '14', '3', '14.14', 'Tablet', 'Lipa', '414.26', 'Atis', '4', '18.0'),
('User_682', 'Saging', 'More than 5', 'Yes', '5', 'Easy to use.', '36', '16', '1', '1', '16.78', 'Desktop', 'Batangas', '414.26', 'Dalandan', '2', '18.0'),
('User_683', 'Sili', '3-Feb', 'Yes', '1', 'Could be better.', '23', '13', '10', '18', '18.98', 'Desktop', 'Lipa', '414.26', 'Atis', '1', '11.0'),
('User_684', 'Atis', '5-Apr', 'No', '3', 'Easy to use.', '16', '12', '26', '17', '6.69', 'Tablet', 'Calamba', '414.26', 'Saging', '2', '14.0'),
('User_685', 'Saging', '3-Feb', 'Yes', '5', 'Could be better.', '33', '8', '27', '17', '4.97', 'Desktop', 'Lipa', '414.26', 'Dalandan', '4', '18.0'),
('User_686', 'Atis', '1', 'Yes', '1', 'Very useful!', '16', '20', '3', '6', '12.21', 'Desktop', 'Lipa', '414.26', 'Saging', '1', '14.0'),
('User_687', 'Star Apple', 'More than 5', 'No', '2', 'Great platform!', '8', '18', '7', '15', '10.6', 'Desktop', 'Lipa', '414.26', 'Star Apple', '5', '13.0'),
('User_688', 'Atis', 'More than 5', 'No', '4', 'Very useful!', '45', '35', '23', '1', '13.81', 'Mobile', 'Batangas', '414.26', 'Dalandan', '1', '14.0'),
('User_689', 'Saging', '3-Feb', 'Yes', '4', 'Could be better.', '30', '41', '4', '15', '3.47', 'Tablet', 'Lucena', '414.26', 'Dalandan', '3', '18.0'),
('User_690', 'Dalandan', 'More than 5', 'No', '1', 'Love it!', '28', '36', '4', '10', '14.34', 'Tablet', 'San Pablo', '414.26', 'Orange', '2', '15.0'),
('User_691', 'Dalandan', '3-Feb', 'Yes', '2', 'Easy to use.', '28', '6', '15', '16', '1.71', 'Tablet', 'San Pablo', '414.26', 'Saging', '2', '15.0'),
('User_692', 'Star Apple', 'More than 5', 'No', '4', 'Great platform!', '7', '5', '26', '14', '4.61', 'Tablet', 'Lucena', '414.26', 'Atis', '5', '13.0'),
('User_693', 'Orange', '3-Feb', 'Yes', '3', 'Very useful!', '31', '10', '3', '8', '5.82', 'Mobile', 'Lucena', '414.26', 'Sili', '1', '16.0'),
('User_694', 'Star Apple', '1', 'Yes', '4', 'Great platform!', '6', '35', '8', '14', '2.03', 'Desktop', 'Calamba', '414.26', 'Star Apple', '2', '13.0'),
('User_695', 'Atis', '5-Apr', 'Yes', '4', 'Love it!', '7', '6', '16', '16', '16.85', 'Mobile', 'Calamba', '414.26', 'Atis', '4', '14.0'),
('User_696', 'Sili', 'More than 5', 'No', '5', 'Could be better.', '29', '37', '9', '2', '2.6', 'Desktop', 'Lucena', '414.26', 'Orange', '4', '11.0'),
('User_697', 'Sili', '1', 'No', '3', 'Love it!', '2', '9', '16', '15', '16.24', 'Desktop', 'San Pablo', '414.26', 'Atis', '3', '11.0'),
('User_698', 'Dalandan', '5-Apr', 'Yes', '3', 'Very useful!', '41', '47', '2', '8', '19.7', 'Desktop', 'Batangas', '414.26', 'Dalandan', '2', '15.0'),
('User_699', 'Saging', '3-Feb', 'No', '1', 'Very useful!', '18', '22', '29', '6', '15.32', 'Desktop', 'Batangas', '414.26', 'Star Apple', '4', '18.0'),
('User_700', 'Sili', '5-Apr', 'No', '5', 'Easy to use.', '30', '36', '8', '15', '11.83', 'Mobile', 'Lipa', '414.26', 'Star Apple', '2', '11.0'),
('User_701', 'Dalandan', '3-Feb', 'Yes', '3', 'Easy to use.', '14', '40', '21', '16', '16.74', 'Desktop', 'Lucena', '414.26', 'Saging', '2', '15.0'),
('User_702', 'Star Apple', '3-Feb', 'No', '3', 'Great platform!', '31', '18', '9', '10', '10.52', 'Tablet', 'San Pablo', '414.26', 'Atis', '3', '13.0'),
('User_703', 'Atis', '3-Feb', 'Yes', '1', 'Great platform!', '17', '3', '8', '8', '12.37', 'Tablet', 'San Pablo', '414.26', 'Saging', '4', '14.0'),
('User_704', 'Sili', '1', 'No', '3', 'Easy to use.', '4', '35', '17', '7', '19.47', 'Tablet', 'Batangas', '414.26', 'Orange', '3', '11.0'),
('User_705', 'Orange', '5-Apr', 'No', '3', 'Love it!', '4', '18', '22', '18', '6.85', 'Mobile', 'Lucena', '414.26', 'Saging', '2', '16.0'),
('User_706', 'Atis', '3-Feb', 'Yes', '4', 'Very useful!', '37', '31', '5', '9', '7.18', 'Tablet', 'Lipa', '414.26', 'Dalandan', '3', '14.0'),
('User_707', 'Star Apple', '5-Apr', 'No', '1', 'Love it!', '43', '36', '14', '10', '16.63', 'Desktop', 'Lucena', '414.26', 'Sili', '3', '13.0'),
('User_708', 'Saging', '1', 'Yes', '2', 'Easy to use.', '36', '21', '4', '9', '8.28', 'Tablet', 'Batangas', '414.26', 'Dalandan', '4', '18.0'),
('User_709', 'Sili', '1', 'No', '5', 'Love it!', '7', '42', '25', '10', '9.82', 'Desktop', 'Lucena', '414.26', 'Dalandan', '4', '11.0'),
('User_710', 'Star Apple', '5-Apr', 'Yes', '1', 'Very useful!', '44', '5', '27', '10', '6.97', 'Desktop', 'Lipa', '414.26', 'Dalandan', '5', '13.0'),
('User_711', 'Orange', 'More than 5', 'Yes', '5', 'Very useful!', '16', '19', '6', '12', '10.24', 'Mobile', 'Calamba', '414.26', 'Star Apple', '1', '16.0'),
('User_712', 'Atis', '5-Apr', 'No', '4', 'Very useful!', '45', '34', '1', '19', '6.4', 'Desktop', 'Batangas', '414.26', 'Sili', '2', '14.0'),
('User_713', 'Orange', '3-Feb', 'No', '5', 'Easy to use.', '4', '4', '9', '14', '5.35', 'Mobile', 'Calamba', '414.26', 'Star Apple', '2', '16.0'),
('User_714', 'Sili', '5-Apr', 'No', '1', 'Could be better.', '5', '38', '9', '17', '13.77', 'Tablet', 'Batangas', '414.26', 'Sili', '5', '11.0'),
('User_715', 'Dalandan', '1', 'Yes', '4', 'Could be better.', '21', '5', '6', '7', '14.64', 'Tablet', 'Batangas', '414.26', 'Atis', '3', '15.0'),
('User_716', 'Dalandan', '1', 'Yes', '5', 'Very useful!', '5', '13', '22', '4', '12.55', 'Desktop', 'Lucena', '414.26', 'Sili', '3', '15.0'),
('User_717', 'Atis', '5-Apr', 'No', '3', 'Great platform!', '48', '2', '4', '11', '2.98', 'Tablet', 'Calamba', '414.26', 'Orange', '5', '14.0'),
('User_718', 'Orange', '1', 'Yes', '1', 'Great platform!', '30', '23', '5', '10', '2.99', 'Desktop', 'Batangas', '414.26', 'Star Apple', '3', '16.0'),
('User_719', 'Saging', '5-Apr', 'Yes', '4', 'Could be better.', '23', '42', '13', '13', '7.33', 'Mobile', 'San Pablo', '414.26', 'Atis', '5', '18.0'),
('User_720', 'Atis', '1', 'Yes', '2', 'Great platform!', '39', '39', '18', '16', '9.58', 'Mobile', 'Batangas', '414.26', 'Star Apple', '2', '14.0'),
('User_721', 'Sili', '3-Feb', 'No', '5', 'Great platform!', '21', '9', '1', '10', '1.44', 'Mobile', 'Lucena', '414.26', 'Atis', '1', '11.0'),
('User_722', 'Atis', '5-Apr', 'Yes', '3', 'Could be better.', '46', '25', '4', '16', '3.12', 'Desktop', 'Lipa', '414.26', 'Dalandan', '5', '14.0'),
('User_723', 'Sili', '5-Apr', 'No', '5', 'Very useful!', '46', '22', '11', '1', '5.38', 'Tablet', 'San Pablo', '414.26', 'Star Apple', '5', '11.0'),
('User_724', 'Saging', 'More than 5', 'No', '3', 'Easy to use.', '4', '46', '6', '8', '19.04', 'Desktop', 'San Pablo', '414.26', 'Atis', '4', '18.0'),
('User_725', 'Sili', '3-Feb', 'No', '4', 'Great platform!', '19', '21', '4', '17', '10.78', 'Mobile', 'Lucena', '414.26', 'Saging', '4', '11.0'),
('User_726', 'Atis', '3-Feb', 'No', '1', 'Love it!', '15', '13', '6', '15', '11.25', 'Mobile', 'Lucena', '414.26', 'Orange', '5', '14.0'),
('User_727', 'Orange', '1', 'Yes', '1', 'Could be better.', '14', '1', '13', '1', '6.14', 'Mobile', 'Lipa', '414.26', 'Saging', '1', '16.0'),
('User_728', 'Dalandan', 'More than 5', 'No', '5', 'Easy to use.', '39', '30', '9', '3', '5.25', 'Tablet', 'Lucena', '414.26', 'Atis', '2', '15.0'),
('User_729', 'Sili', '3-Feb', 'Yes', '4', 'Easy to use.', '5', '6', '19', '16', '10.03', 'Tablet', 'Lipa', '414.26', 'Orange', '4', '11.0'),
('User_730', 'Star Apple', 'More than 5', 'No', '3', 'Could be better.', '5', '15', '17', '18', '12.84', 'Mobile', 'Lipa', '414.26', 'Sili', '4', '13.0'),
('User_731', 'Saging', '1', 'Yes', '2', 'Easy to use.', '3', '26', '1', '17', '11.68', 'Mobile', 'San Pablo', '414.26', 'Star Apple', '5', '18.0'),
('User_732', 'Orange', '3-Feb', 'Yes', '5', 'Easy to use.', '2', '29', '22', '9', '17.47', 'Tablet', 'Lucena', '414.26', 'Sili', '1', '16.0'),
('User_733', 'Dalandan', '3-Feb', 'No', '2', 'Very useful!', '7', '4', '22', '18', '12.07', 'Mobile', 'Lucena', '414.26', 'Dalandan', '1', '15.0'),
('User_734', 'Atis', '5-Apr', 'No', '3', 'Very useful!', '23', '38', '20', '10', '13.82', 'Mobile', 'Lipa', '414.26', 'Saging', '5', '14.0'),
('User_735', 'Saging', '1', 'No', '1', 'Great platform!', '25', '4', '2', '10', '9.73', 'Mobile', 'San Pablo', '414.26', 'Dalandan', '4', '18.0'),
('User_736', 'Star Apple', '5-Apr', 'Yes', '5', 'Very useful!', '16', '48', '7', '9', '14.64', 'Desktop', 'Lucena', '414.26', 'Atis', '1', '13.0'),
('User_737', 'Orange', '3-Feb', 'Yes', '3', 'Very useful!', '12', '3', '20', '17', '18.4', 'Desktop', 'Lipa', '414.26', 'Sili', '3', '16.0'),
('User_738', 'Dalandan', '1', 'Yes', '3', 'Very useful!', '2', '23', '15', '16', '3.38', 'Mobile', 'Batangas', '414.26', 'Sili', '1', '15.0'),
('User_739', 'Orange', '5-Apr', 'No', '1', 'Love it!', '49', '26', '28', '18', '16.18', 'Desktop', 'Calamba', '414.26', 'Star Apple', '2', '16.0'),
('User_740', 'Star Apple', '1', 'Yes', '4', 'Love it!', '39', '38', '18', '1', '14.08', 'Tablet', 'Lipa', '414.26', 'Saging', '3', '13.0'),
('User_741', 'Star Apple', '5-Apr', 'Yes', '5', 'Easy to use.', '5', '32', '0', '1', '14.13', 'Mobile', 'San Pablo', '414.26', 'Dalandan', '2', '13.0'),
('User_742', 'Orange', 'More than 5', 'No', '1', 'Easy to use.', '45', '29', '17', '3', '2.63', 'Tablet', 'Calamba', '414.26', 'Sili', '2', '16.0'),
('User_743', 'Sili', '1', 'Yes', '2', 'Could be better.', '49', '41', '15', '7', '8.1', 'Tablet', 'Lucena', '414.26', 'Dalandan', '4', '11.0'),
('User_744', 'Saging', '3-Feb', 'No', '1', 'Great platform!', '27', '10', '18', '7', '1.79', 'Tablet', 'San Pablo', '414.26', 'Atis', '3', '18.0'),
('User_745', 'Saging', '1', 'Yes', '2', 'Very useful!', '39', '26', '17', '14', '15.76', 'Desktop', 'Batangas', '414.26', 'Star Apple', '4', '18.0'),
('User_746', 'Dalandan', 'More than 5', 'Yes', '4', 'Very useful!', '6', '31', '4', '18', '15.97', 'Tablet', 'Lipa', '414.26', 'Orange', '3', '15.0'),
('User_747', 'Dalandan', 'More than 5', 'No', '1', 'Very useful!', '1', '25', '25', '15', '3.17', 'Desktop', 'Lucena', '414.26', 'Saging', '4', '15.0'),
('User_748', 'Dalandan', '1', 'Yes', '2', 'Easy to use.', '27', '41', '14', '6', '10.92', 'Mobile', 'Calamba', '414.26', 'Atis', '2', '15.0'),
('User_749', 'Atis', '1', 'Yes', '4', 'Love it!', '34', '49', '1', '18', '1.21', 'Mobile', 'Lucena', '414.26', 'Atis', '5', '14.0'),
('User_750', 'Atis', '1', 'Yes', '3', 'Easy to use.', '12', '38', '20', '4', '15.49', 'Desktop', 'Lipa', '414.26', 'Dalandan', '5', '14.0'),
('User_751', 'Sili', '1', 'Yes', '1', 'Easy to use.', '48', '8', '6', '13', '1.71', 'Desktop', 'Batangas', '414.26', 'Dalandan', '4', '11.0'),
('User_752', 'Atis', 'More than 5', 'No', '4', 'Easy to use.', '17', '1', '26', '4', '5.74', 'Tablet', 'Batangas', '414.26', 'Atis', '2', '14.0'),
('User_753', 'Orange', '5-Apr', 'No', '1', 'Very useful!', '48', '27', '12', '2', '14.2', 'Tablet', 'Lipa', '414.26', 'Star Apple', '1', '16.0'),
('User_754', 'Orange', '3-Feb', 'No', '4', 'Love it!', '2', '15', '27', '10', '2.36', 'Mobile', 'San Pablo', '414.26', 'Dalandan', '3', '16.0'),
('User_755', 'Saging', 'More than 5', 'No', '4', 'Could be better.', '28', '19', '15', '12', '7.38', 'Desktop', 'Batangas', '414.26', 'Dalandan', '4', '18.0'),
('User_756', 'Orange', '5-Apr', 'Yes', '1', 'Great platform!', '4', '5', '15', '3', '10.85', 'Desktop', 'Calamba', '414.26', 'Star Apple', '4', '16.0'),
('User_757', 'Sili', '5-Apr', 'Yes', '2', 'Easy to use.', '29', '31', '18', '19', '16.35', 'Mobile', 'Lucena', '414.26', 'Atis', '3', '11.0'),
('User_758', 'Atis', '3-Feb', 'No', '4', 'Love it!', '15', '13', '18', '6', '18.84', 'Desktop', 'Batangas', '414.26', 'Dalandan', '1', '14.0'),
('User_759', 'Dalandan', 'More than 5', 'Yes', '5', 'Very useful!', '22', '30', '7', '9', '18.13', 'Tablet', 'San Pablo', '414.26', 'Star Apple', '4', '15.0'),
('User_760', 'Star Apple', '3-Feb', 'No', '1', 'Easy to use.', '17', '32', '4', '10', '12.16', 'Desktop', 'Batangas', '414.26', 'Atis', '1', '13.0'),
('User_761', 'Saging', '5-Apr', 'Yes', '5', 'Great platform!', '15', '43', '6', '9', '6.89', 'Tablet', 'Batangas', '414.26', 'Dalandan', '4', '18.0'),
('User_762', 'Orange', '1', 'Yes', '5', 'Great platform!', '41', '5', '2', '5', '3.67', 'Tablet', 'Lucena', '414.26', 'Star Apple', '2', '16.0'),
('User_763', 'Atis', '5-Apr', 'No', '4', 'Very useful!', '25', '34', '7', '6', '6.6', 'Tablet', 'San Pablo', '414.26', 'Atis', '5', '14.0'),
('User_764', 'Saging', '5-Apr', 'No', '3', 'Easy to use.', '3', '11', '21', '19', '13.87', 'Tablet', 'Batangas', '414.26', 'Sili', '3', '18.0'),
('User_765', 'Star Apple', '5-Apr', 'No', '4', 'Could be better.', '10', '35', '3', '7', '8.7', 'Mobile', 'Batangas', '414.26', 'Sili', '4', '13.0'),
('User_766', 'Saging', '1', 'No', '2', 'Easy to use.', '20', '32', '2', '4', '1.38', 'Desktop', 'Calamba', '414.26', 'Atis', '5', '18.0'),
('User_767', 'Saging', '1', 'No', '3', 'Could be better.', '34', '8', '1', '3', '14.7', 'Mobile', 'Calamba', '414.26', 'Orange', '3', '18.0'),
('User_768', 'Atis', '1', 'Yes', '4', 'Could be better.', '24', '39', '11', '13', '3.07', 'Desktop', 'Calamba', '414.26', 'Orange', '4', '14.0'),
('User_769', 'Atis', '3-Feb', 'Yes', '3', 'Love it!', '26', '48', '1', '4', '3.96', 'Tablet', 'Lipa', '414.26', 'Star Apple', '2', '14.0'),
('User_770', 'Saging', '5-Apr', 'No', '4', 'Love it!', '48', '48', '27', '16', '2.18', 'Mobile', 'Lucena', '414.26', 'Atis', '4', '18.0'),
('User_771', 'Star Apple', 'More than 5', 'No', '3', 'Easy to use.', '35', '40', '4', '9', '9.0', 'Tablet', 'Lucena', '414.26', 'Orange', '2', '13.0'),
('User_772', 'Orange', 'More than 5', 'No', '4', 'Love it!', '28', '41', '0', '4', '10.34', 'Desktop', 'Calamba', '414.26', 'Orange', '2', '16.0'),
('User_773', 'Star Apple', '5-Apr', 'No', '4', 'Could be better.', '47', '30', '21', '3', '3.14', 'Desktop', 'San Pablo', '414.26', 'Star Apple', '5', '13.0'),
('User_774', 'Saging', '1', 'No', '3', 'Very useful!', '18', '20', '20', '8', '4.9', 'Desktop', 'Lipa', '414.26', 'Atis', '3', '18.0'),
('User_775', 'Dalandan', '1', 'No', '5', 'Very useful!', '44', '48', '8', '18', '2.01', 'Tablet', 'Lucena', '414.26', 'Dalandan', '5', '15.0'),
('User_776', 'Saging', 'More than 5', 'No', '3', 'Easy to use.', '31', '9', '14', '10', '4.65', 'Mobile', 'Batangas', '414.26', 'Saging', '3', '18.0'),
('User_777', 'Star Apple', '5-Apr', 'No', '2', 'Very useful!', '15', '23', '29', '18', '18.7', 'Mobile', 'Lipa', '414.26', 'Orange', '4', '13.0'),
('User_778', 'Star Apple', '3-Feb', 'No', '3', 'Easy to use.', '12', '47', '17', '3', '14.83', 'Mobile', 'Calamba', '414.26', 'Orange', '4', '13.0'),
('User_779', 'Atis', '3-Feb', 'No', '4', 'Great platform!', '13', '22', '18', '15', '14.62', 'Mobile', 'Batangas', '414.26', 'Dalandan', '5', '14.0'),
('User_780', 'Saging', 'More than 5', 'No', '4', 'Could be better.', '19', '26', '5', '12', '12.3', 'Desktop', 'Lucena', '414.26', 'Sili', '3', '18.0'),
('User_781', 'Orange', '1', 'Yes', '2', 'Easy to use.', '48', '14', '5', '13', '17.05', 'Tablet', 'Batangas', '414.26', 'Sili', '4', '16.0'),
('User_782', 'Saging', '5-Apr', 'Yes', '3', 'Very useful!', '37', '8', '22', '4', '6.73', 'Desktop', 'San Pablo', '414.26', 'Saging', '2', '18.0'),
('User_783', 'Dalandan', '3-Feb', 'Yes', '3', 'Easy to use.', '41', '42', '15', '2', '6.55', 'Tablet', 'Calamba', '414.26', 'Dalandan', '4', '15.0'),
('User_784', 'Saging', 'More than 5', 'No', '2', 'Easy to use.', '7', '35', '12', '10', '16.62', 'Desktop', 'San Pablo', '414.26', 'Atis', '3', '18.0'),
('User_785', 'Saging', 'More than 5', 'No', '5', 'Very useful!', '28', '31', '27', '19', '13.29', 'Desktop', 'Lucena', '414.26', 'Saging', '5', '18.0'),
('User_786', 'Saging', '3-Feb', 'No', '1', 'Very useful!', '22', '20', '11', '16', '15.35', 'Mobile', 'Calamba', '414.26', 'Orange', '5', '18.0'),
('User_787', 'Atis', 'More than 5', 'No', '5', 'Love it!', '33', '10', '24', '9', '16.61', 'Mobile', 'San Pablo', '414.26', 'Atis', '3', '14.0'),
('User_788', 'Orange', '1', 'Yes', '5', 'Love it!', '16', '24', '7', '11', '19.48', 'Desktop', 'Lipa', '414.26', 'Atis', '3', '16.0'),
('User_789', 'Saging', '3-Feb', 'Yes', '5', 'Love it!', '44', '6', '28', '5', '3.11', 'Tablet', 'San Pablo', '414.26', 'Saging', '5', '18.0'),
('User_790', 'Dalandan', '3-Feb', 'No', '5', 'Very useful!', '12', '10', '5', '12', '15.74', 'Tablet', 'Lipa', '414.26', 'Atis', '5', '15.0'),
('User_791', 'Atis', '1', 'No', '1', 'Very useful!', '44', '13', '2', '10', '4.3', 'Mobile', 'Batangas', '414.26', 'Sili', '1', '14.0'),
('User_792', 'Star Apple', 'More than 5', 'No', '3', 'Love it!', '37', '25', '3', '4', '3.35', 'Mobile', 'Lipa', '414.26', 'Star Apple', '5', '13.0'),
('User_793', 'Atis', '3-Feb', 'Yes', '2', 'Great platform!', '15', '27', '15', '6', '3.26', 'Desktop', 'Lucena', '414.26', 'Dalandan', '5', '14.0'),
('User_794', 'Orange', '5-Apr', 'No', '4', 'Love it!', '29', '35', '1', '13', '18.97', 'Tablet', 'San Pablo', '414.26', 'Star Apple', '2', '16.0'),
('User_795', 'Star Apple', '3-Feb', 'No', '3', 'Easy to use.', '48', '1', '5', '1', '13.58', 'Mobile', 'Calamba', '414.26', 'Star Apple', '2', '13.0'),
('User_796', 'Orange', 'More than 5', 'Yes', '2', 'Easy to use.', '37', '41', '7', '19', '7.5', 'Mobile', 'Lipa', '414.26', 'Atis', '5', '16.0'),
('User_797', 'Saging', '5-Apr', 'Yes', '4', 'Easy to use.', '1', '25', '9', '5', '3.88', 'Tablet', 'Calamba', '414.26', 'Atis', '5', '18.0'),
('User_798', 'Atis', 'More than 5', 'No', '2', 'Love it!', '7', '2', '13', '1', '3.55', 'Tablet', 'Batangas', '414.26', 'Dalandan', '2', '14.0'),
('User_799', 'Orange', '1', 'Yes', '5', 'Love it!', '4', '43', '4', '7', '6.09', 'Tablet', 'Calamba', '414.26', 'Atis', '5', '16.0'),
('User_800', 'Saging', '1', 'Yes', '3', 'Great platform!', '3', '13', '5', '9', '16.0', 'Tablet', 'Calamba', '414.26', 'Atis', '3', '18.0'),
('User_801', 'Dalandan', 'More than 5', 'Yes', '5', 'Love it!', '15', '44', '17', '16', '6.96', 'Desktop', 'Calamba', '414.26', 'Star Apple', '1', '15.0'),
('User_802', 'Sili', '1', 'No', '3', 'Could be better.', '21', '21', '5', '18', '10.26', 'Desktop', 'Lipa', '414.26', 'Star Apple', '5', '11.0'),
('User_803', 'Saging', '1', 'Yes', '4', 'Love it!', '26', '45', '6', '18', '15.73', 'Mobile', 'Batangas', '414.26', 'Atis', '1', '18.0'),
('User_804', 'Sili', '5-Apr', 'Yes', '3', 'Great platform!', '7', '12', '19', '6', '3.17', 'Mobile', 'Batangas', '414.26', 'Saging', '5', '11.0'),
('User_805', 'Orange', '3-Feb', 'No', '2', 'Easy to use.', '31', '8', '2', '16', '5.45', 'Desktop', 'Batangas', '414.26', 'Dalandan', '4', '16.0'),
('User_806', 'Saging', '1', 'No', '4', 'Easy to use.', '49', '36', '10', '11', '2.66', 'Mobile', 'Calamba', '414.26', 'Star Apple', '1', '18.0'),
('User_807', 'Saging', '3-Feb', 'Yes', '1', 'Very useful!', '25', '49', '23', '17', '15.1', 'Tablet', 'Batangas', '414.26', 'Atis', '4', '18.0'),
('User_808', 'Orange', '1', 'Yes', '2', 'Very useful!', '34', '45', '14', '18', '2.78', 'Tablet', 'San Pablo', '414.26', 'Atis', '3', '16.0'),
('User_809', 'Atis', '5-Apr', 'Yes', '3', 'Could be better.', '46', '28', '23', '19', '17.0', 'Desktop', 'Calamba', '414.26', 'Atis', '3', '14.0'),
('User_810', 'Sili', 'More than 5', 'No', '3', 'Very useful!', '33', '46', '20', '9', '7.83', 'Desktop', 'Calamba', '414.26', 'Star Apple', '1', '11.0'),
('User_811', 'Dalandan', '3-Feb', 'No', '3', 'Could be better.', '36', '30', '15', '8', '13.63', 'Mobile', 'San Pablo', '414.26', 'Sili', '3', '15.0'),
('User_812', 'Orange', '1', 'Yes', '5', 'Very useful!', '36', '4', '21', '7', '1.68', 'Tablet', 'San Pablo', '414.26', 'Saging', '5', '16.0'),
('User_813', 'Orange', '3-Feb', 'Yes', '1', 'Great platform!', '37', '32', '11', '19', '15.44', 'Tablet', 'San Pablo', '414.26', 'Orange', '4', '16.0'),
('User_814', 'Atis', '3-Feb', 'No', '4', 'Could be better.', '48', '6', '15', '9', '8.55', 'Mobile', 'Batangas', '414.26', 'Orange', '1', '14.0'),
('User_815', 'Saging', 'More than 5', 'No', '1', 'Great platform!', '38', '38', '26', '6', '12.92', 'Tablet', 'Lucena', '414.26', 'Orange', '1', '18.0'),
('User_816', 'Orange', '5-Apr', 'Yes', '4', 'Easy to use.', '7', '36', '10', '17', '1.75', 'Mobile', 'Calamba', '414.26', 'Star Apple', '4', '16.0'),
('User_817', 'Saging', '3-Feb', 'Yes', '4', 'Could be better.', '40', '10', '4', '19', '12.17', 'Mobile', 'Batangas', '414.26', 'Saging', '4', '18.0'),
('User_818', 'Saging', 'More than 5', 'Yes', '5', 'Easy to use.', '45', '38', '7', '15', '13.26', 'Desktop', 'Batangas', '414.26', 'Star Apple', '4', '18.0'),
('User_819', 'Sili', '1', 'No', '2', 'Love it!', '40', '26', '14', '4', '17.13', 'Tablet', 'Calamba', '414.26', 'Orange', '5', '11.0'),
('User_820', 'Orange', '1', 'No', '1', 'Could be better.', '41', '5', '17', '19', '1.14', 'Desktop', 'Lipa', '414.26', 'Dalandan', '4', '16.0'),
('User_821', 'Saging', '3-Feb', 'No', '1', 'Love it!', '44', '32', '3', '4', '19.03', 'Mobile', 'Batangas', '414.26', 'Orange', '1', '18.0'),
('User_822', 'Sili', '1', 'No', '5', 'Great platform!', '49', '41', '18', '16', '15.27', 'Mobile', 'Batangas', '414.26', 'Sili', '5', '11.0'),
('User_823', 'Star Apple', 'More than 5', 'Yes', '2', 'Very useful!', '32', '3', '19', '12', '15.67', 'Mobile', 'San Pablo', '414.26', 'Orange', '4', '13.0'),
('User_824', 'Orange', '1', 'No', '2', 'Great platform!', '29', '43', '27', '7', '14.99', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '3', '16.0'),
('User_825', 'Star Apple', '3-Feb', 'No', '2', 'Could be better.', '40', '3', '16', '8', '11.27', 'Tablet', 'Calamba', '414.26', 'Saging', '1', '13.0'),
('User_826', 'Star Apple', 'More than 5', 'Yes', '2', 'Love it!', '15', '11', '16', '17', '9.55', 'Tablet', 'Calamba', '414.26', 'Saging', '4', '13.0'),
('User_827', 'Saging', '5-Apr', 'No', '5', 'Could be better.', '20', '19', '11', '5', '5.71', 'Tablet', 'Batangas', '414.26', 'Sili', '2', '18.0'),
('User_828', 'Dalandan', '3-Feb', 'No', '2', 'Easy to use.', '22', '33', '21', '1', '15.46', 'Mobile', 'San Pablo', '414.26', 'Star Apple', '5', '15.0'),
('User_829', 'Dalandan', '3-Feb', 'Yes', '4', 'Easy to use.', '26', '26', '3', '9', '16.32', 'Tablet', 'Calamba', '414.26', 'Sili', '2', '15.0'),
('User_830', 'Dalandan', '5-Apr', 'Yes', '1', 'Love it!', '24', '43', '26', '11', '17.54', 'Mobile', 'Lucena', '414.26', 'Star Apple', '4', '15.0'),
('User_831', 'Star Apple', 'More than 5', 'Yes', '5', 'Great platform!', '24', '3', '9', '13', '9.09', 'Mobile', 'Calamba', '414.26', 'Atis', '2', '13.0'),
('User_832', 'Atis', 'More than 5', 'Yes', '5', 'Easy to use.', '42', '28', '10', '16', '17.94', 'Desktop', 'Lipa', '414.26', 'Atis', '4', '14.0'),
('User_833', 'Orange', 'More than 5', 'No', '4', 'Easy to use.', '5', '41', '4', '14', '3.46', 'Mobile', 'San Pablo', '414.26', 'Saging', '4', '16.0'),
('User_834', 'Dalandan', '1', 'No', '1', 'Very useful!', '18', '20', '8', '1', '17.02', 'Mobile', 'Lucena', '414.26', 'Star Apple', '3', '15.0'),
('User_835', 'Saging', 'More than 5', 'No', '5', 'Very useful!', '4', '21', '24', '11', '19.91', 'Desktop', 'Lucena', '414.26', 'Atis', '3', '18.0'),
('User_836', 'Saging', '3-Feb', 'No', '5', 'Great platform!', '40', '36', '4', '5', '3.57', 'Desktop', 'Lipa', '414.26', 'Star Apple', '3', '18.0'),
('User_837', 'Saging', 'More than 5', 'No', '3', 'Great platform!', '32', '32', '10', '13', '4.42', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '5', '18.0'),
('User_838', 'Sili', '5-Apr', 'No', '3', 'Great platform!', '39', '35', '2', '2', '9.18', 'Mobile', 'Lipa', '414.26', 'Sili', '5', '11.0'),
('User_839', 'Sili', '5-Apr', 'Yes', '2', 'Easy to use.', '25', '7', '8', '14', '8.55', 'Mobile', 'Calamba', '414.26', 'Atis', '5', '11.0'),
('User_840', 'Saging', '5-Apr', 'No', '3', 'Great platform!', '1', '18', '12', '15', '5.54', 'Tablet', 'Calamba', '414.26', 'Saging', '4', '18.0'),
('User_841', 'Orange', '5-Apr', 'No', '4', 'Easy to use.', '39', '33', '26', '16', '5.32', 'Tablet', 'Calamba', '414.26', 'Star Apple', '4', '16.0'),
('User_842', 'Orange', '5-Apr', 'Yes', '4', 'Easy to use.', '12', '19', '26', '6', '12.71', 'Mobile', 'Lucena', '414.26', 'Dalandan', '3', '16.0'),
('User_843', 'Atis', '3-Feb', 'Yes', '5', 'Great platform!', '23', '41', '16', '19', '6.72', 'Mobile', 'Lipa', '414.26', 'Orange', '2', '14.0'),
('User_844', 'Atis', '5-Apr', 'No', '5', 'Very useful!', '38', '17', '16', '6', '14.09', 'Desktop', 'Batangas', '414.26', 'Sili', '3', '14.0'),
('User_845', 'Saging', '1', 'Yes', '5', 'Great platform!', '40', '39', '8', '5', '2.7', 'Tablet', 'Batangas', '414.26', 'Atis', '2', '18.0'),
('User_846', 'Orange', '5-Apr', 'No', '1', 'Love it!', '47', '13', '18', '2', '14.89', 'Mobile', 'Calamba', '414.26', 'Atis', '1', '16.0'),
('User_847', 'Star Apple', '5-Apr', 'No', '1', 'Great platform!', '35', '39', '3', '14', '10.44', 'Desktop', 'Calamba', '414.26', 'Sili', '3', '13.0'),
('User_848', 'Orange', '1', 'Yes', '3', 'Easy to use.', '27', '32', '0', '11', '13.42', 'Tablet', 'San Pablo', '414.26', 'Saging', '2', '16.0'),
('User_849', 'Orange', 'More than 5', 'No', '5', 'Very useful!', '29', '42', '27', '18', '19.37', 'Desktop', 'Lucena', '414.26', 'Sili', '1', '16.0'),
('User_850', 'Sili', 'More than 5', 'Yes', '4', 'Easy to use.', '3', '46', '2', '8', '16.23', 'Desktop', 'San Pablo', '414.26', 'Orange', '5', '11.0'),
('User_851', 'Dalandan', '5-Apr', 'No', '5', 'Great platform!', '7', '36', '14', '14', '18.39', 'Tablet', 'Calamba', '414.26', 'Atis', '2', '15.0'),
('User_852', 'Saging', '5-Apr', 'Yes', '3', 'Love it!', '9', '34', '10', '18', '7.19', 'Tablet', 'Calamba', '414.26', 'Saging', '4', '18.0'),
('User_853', 'Sili', '5-Apr', 'Yes', '1', 'Very useful!', '41', '30', '13', '1', '14.01', 'Tablet', 'San Pablo', '414.26', 'Saging', '4', '11.0'),
('User_854', 'Saging', '5-Apr', 'No', '3', 'Love it!', '19', '49', '21', '1', '13.88', 'Desktop', 'Batangas', '414.26', 'Star Apple', '2', '18.0'),
('User_855', 'Orange', 'More than 5', 'No', '2', 'Very useful!', '11', '40', '2', '11', '8.92', 'Desktop', 'Lucena', '414.26', 'Star Apple', '5', '16.0'),
('User_856', 'Sili', '1', 'Yes', '5', 'Great platform!', '17', '38', '28', '2', '10.12', 'Mobile', 'San Pablo', '414.26', 'Saging', '5', '11.0'),
('User_857', 'Sili', '3-Feb', 'Yes', '5', 'Could be better.', '40', '40', '8', '19', '5.36', 'Desktop', 'Batangas', '414.26', 'Sili', '4', '11.0'),
('User_858', 'Sili', 'More than 5', 'Yes', '3', 'Could be better.', '5', '41', '2', '2', '15.18', 'Tablet', 'Calamba', '414.26', 'Atis', '5', '11.0'),
('User_859', 'Orange', '1', 'Yes', '2', 'Love it!', '8', '20', '3', '18', '3.55', 'Desktop', 'San Pablo', '414.26', 'Atis', '4', '16.0'),
('User_860', 'Star Apple', '3-Feb', 'No', '1', 'Love it!', '2', '48', '22', '9', '3.37', 'Tablet', 'Lucena', '414.26', 'Orange', '4', '13.0'),
('User_861', 'Orange', '3-Feb', 'Yes', '5', 'Very useful!', '19', '24', '21', '11', '3.6', 'Tablet', 'San Pablo', '414.26', 'Atis', '2', '16.0'),
('User_862', 'Dalandan', '1', 'No', '3', 'Love it!', '32', '29', '16', '13', '14.11', 'Desktop', 'Batangas', '414.26', 'Orange', '4', '15.0'),
('User_863', 'Dalandan', '3-Feb', 'No', '4', 'Could be better.', '47', '34', '22', '6', '2.44', 'Tablet', 'Batangas', '414.26', 'Orange', '1', '15.0'),
('User_864', 'Dalandan', '3-Feb', 'No', '2', 'Great platform!', '40', '37', '29', '8', '5.03', 'Desktop', 'San Pablo', '414.26', 'Star Apple', '1', '15.0'),
('User_865', 'Atis', '3-Feb', 'Yes', '2', 'Could be better.', '37', '5', '12', '7', '10.72', 'Tablet', 'Lucena', '414.26', 'Orange', '3', '14.0'),
('User_866', 'Orange', '5-Apr', 'Yes', '1', 'Love it!', '37', '3', '27', '11', '2.19', 'Mobile', 'Lipa', '414.26', 'Sili', '3', '16.0'),
('User_867', 'Sili', 'More than 5', 'No', '3', 'Great platform!', '47', '46', '4', '8', '19.29', 'Mobile', 'Calamba', '414.26', 'Saging', '3', '11.0'),
('User_868', 'Sili', 'More than 5', 'Yes', '5', 'Great platform!', '6', '49', '27', '3', '1.46', 'Desktop', 'Calamba', '414.26', 'Star Apple', '5', '11.0'),
('User_869', 'Orange', '3-Feb', 'Yes', '1', 'Very useful!', '27', '3', '24', '11', '18.18', 'Desktop', 'Calamba', '414.26', 'Orange', '3', '16.0'),
('User_870', 'Dalandan', '3-Feb', 'No', '4', 'Love it!', '10', '3', '18', '16', '2.36', 'Mobile', 'San Pablo', '414.26', 'Saging', '4', '15.0'),
('User_871', 'Atis', '1', 'No', '2', 'Could be better.', '28', '14', '13', '16', '1.84', 'Tablet', 'Batangas', '414.26', 'Dalandan', '2', '14.0'),
('User_872', 'Saging', '1', 'No', '2', 'Very useful!', '38', '6', '20', '7', '8.17', 'Mobile', 'San Pablo', '414.26', 'Orange', '3', '18.0'),
('User_873', 'Star Apple', '1', 'No', '5', 'Easy to use.', '24', '32', '1', '16', '15.06', 'Desktop', 'San Pablo', '414.26', 'Sili', '2', '13.0'),
('User_874', 'Dalandan', '3-Feb', 'Yes', '2', 'Very useful!', '40', '5', '20', '15', '4.25', 'Mobile', 'Lipa', '414.26', 'Star Apple', '4', '15.0'),
('User_875', 'Saging', '3-Feb', 'Yes', '5', 'Easy to use.', '44', '6', '23', '2', '17.45', 'Desktop', 'Batangas', '414.26', 'Dalandan', '1', '18.0'),
('User_876', 'Sili', '1', 'No', '5', 'Very useful!', '25', '2', '18', '5', '14.93', 'Desktop', 'Lipa', '414.26', 'Sili', '5', '11.0'),
('User_877', 'Sili', '3-Feb', 'Yes', '4', 'Very useful!', '39', '49', '17', '11', '18.13', 'Mobile', 'Lucena', '414.26', 'Saging', '5', '11.0'),
('User_878', 'Atis', '1', 'Yes', '3', 'Great platform!', '10', '39', '16', '13', '17.62', 'Desktop', 'San Pablo', '414.26', 'Dalandan', '5', '14.0'),
('User_879', 'Star Apple', '5-Apr', 'Yes', '2', 'Could be better.', '1', '9', '15', '16', '11.77', 'Desktop', 'Lucena', '414.26', 'Dalandan', '1', '13.0'),
('User_880', 'Atis', 'More than 5', 'No', '4', 'Very useful!', '7', '10', '12', '13', '8.81', 'Mobile', 'Batangas', '414.26', 'Atis', '3', '14.0'),
('User_881', 'Orange', '3-Feb', 'Yes', '2', 'Great platform!', '14', '32', '1', '18', '19.78', 'Mobile', 'Batangas', '414.26', 'Orange', '5', '16.0'),
('User_882', 'Dalandan', 'More than 5', 'No', '4', 'Very useful!', '38', '3', '17', '3', '11.39', 'Mobile', 'Calamba', '414.26', 'Orange', '5', '15.0'),
('User_883', 'Saging', '5-Apr', 'No', '1', 'Very useful!', '11', '27', '28', '5', '16.65', 'Desktop', 'Lucena', '414.26', 'Sili', '3', '18.0'),
('User_884', 'Sili', 'More than 5', 'Yes', '3', 'Love it!', '22', '33', '3', '11', '6.76', 'Mobile', 'Lucena', '414.26', 'Atis', '2', '11.0'),
('User_885', 'Saging', '5-Apr', 'Yes', '5', 'Easy to use.', '39', '20', '28', '10', '3.98', 'Tablet', 'Lipa', '414.26', 'Star Apple', '3', '18.0'),
('User_886', 'Star Apple', '5-Apr', 'No', '5', 'Great platform!', '27', '9', '18', '12', '10.53', 'Mobile', 'Batangas', '414.26', 'Orange', '3', '13.0'),
('User_887', 'Saging', '5-Apr', 'Yes', '1', 'Great platform!', '16', '41', '14', '9', '11.04', 'Desktop', 'Batangas', '414.26', 'Orange', '4', '18.0'),
('User_888', 'Orange', 'More than 5', 'Yes', '2', 'Could be better.', '48', '18', '14', '15', '6.21', 'Tablet', 'Calamba', '414.26', 'Sili', '2', '16.0'),
('User_889', 'Star Apple', '1', 'Yes', '2', 'Love it!', '10', '13', '20', '4', '6.66', 'Tablet', 'Lucena', '414.26', 'Orange', '2', '13.0'),
('User_890', 'Saging', '5-Apr', 'Yes', '2', 'Easy to use.', '38', '31', '8', '15', '10.46', 'Mobile', 'Calamba', '414.26', 'Dalandan', '4', '18.0'),
('User_891', 'Orange', '5-Apr', 'Yes', '5', 'Easy to use.', '37', '26', '10', '9', '4.57', 'Tablet', 'Lucena', '414.26', 'Star Apple', '2', '16.0'),
('User_892', 'Orange', '3-Feb', 'No', '3', 'Very useful!', '48', '39', '27', '12', '14.05', 'Desktop', 'Lucena', '414.26', 'Orange', '4', '16.0'),
('User_893', 'Dalandan', '5-Apr', 'No', '1', 'Great platform!', '35', '45', '0', '16', '5.8', 'Desktop', 'Lipa', '414.26', 'Sili', '3', '15.0'),
('User_894', 'Star Apple', 'More than 5', 'Yes', '4', 'Love it!', '27', '20', '0', '16', '5.16', 'Tablet', 'San Pablo', '414.26', 'Saging', '1', '13.0'),
('User_895', 'Atis', '5-Apr', 'Yes', '5', 'Love it!', '21', '8', '4', '16', '15.82', 'Tablet', 'Calamba', '414.26', 'Orange', '3', '14.0'),
('User_896', 'Star Apple', '3-Feb', 'No', '4', 'Great platform!', '1', '31', '24', '7', '14.01', 'Desktop', 'Batangas', '414.26', 'Orange', '5', '13.0'),
('User_897', 'Atis', '5-Apr', 'No', '4', 'Great platform!', '26', '38', '29', '16', '7.81', 'Desktop', 'San Pablo', '414.26', 'Dalandan', '4', '14.0'),
('User_898', 'Saging', '3-Feb', 'No', '3', 'Very useful!', '7', '40', '20', '5', '17.54', 'Desktop', 'Batangas', '414.26', 'Sili', '2', '18.0'),
('User_899', 'Sili', '5-Apr', 'No', '4', 'Could be better.', '3', '29', '10', '3', '14.21', 'Desktop', 'Lipa', '414.26', 'Orange', '1', '11.0'),
('User_900', 'Atis', 'More than 5', 'Yes', '3', 'Great platform!', '41', '10', '11', '6', '17.62', 'Mobile', 'Batangas', '414.26', 'Saging', '1', '14.0'),
('User_901', 'Dalandan', '1', 'Yes', '5', 'Great platform!', '7', '42', '23', '18', '18.67', 'Mobile', 'Batangas', '414.26', 'Sili', '2', '15.0'),
('User_902', 'Dalandan', 'More than 5', 'No', '2', 'Very useful!', '37', '17', '21', '2', '18.65', 'Desktop', 'San Pablo', '414.26', 'Sili', '5', '15.0'),
('User_903', 'Sili', '5-Apr', 'No', '1', 'Easy to use.', '44', '10', '11', '6', '12.82', 'Tablet', 'Batangas', '414.26', 'Orange', '3', '11.0'),
('User_904', 'Saging', '3-Feb', 'No', '3', 'Love it!', '49', '44', '10', '9', '5.05', 'Tablet', 'Lucena', '414.26', 'Orange', '5', '18.0'),
('User_905', 'Star Apple', '1', 'No', '1', 'Could be better.', '1', '29', '23', '1', '16.86', 'Desktop', 'Lipa', '414.26', 'Star Apple', '4', '13.0'),
('User_906', 'Atis', 'More than 5', 'Yes', '5', 'Easy to use.', '11', '46', '1', '12', '9.22', 'Desktop', 'Lipa', '414.26', 'Atis', '2', '14.0'),
('User_907', 'Star Apple', 'More than 5', 'Yes', '1', 'Easy to use.', '37', '27', '6', '3', '13.05', 'Tablet', 'Lucena', '414.26', 'Star Apple', '2', '13.0'),
('User_908', 'Sili', 'More than 5', 'No', '3', 'Very useful!', '41', '3', '8', '12', '10.77', 'Tablet', 'Batangas', '414.26', 'Dalandan', '3', '11.0'),
('User_909', 'Sili', '3-Feb', 'Yes', '4', 'Could be better.', '26', '34', '27', '3', '14.77', 'Tablet', 'Batangas', '414.26', 'Orange', '2', '11.0'),
('User_910', 'Dalandan', '1', 'No', '2', 'Great platform!', '15', '32', '17', '4', '1.68', 'Mobile', 'Calamba', '414.26', 'Orange', '2', '15.0'),
('User_911', 'Atis', 'More than 5', 'No', '2', 'Love it!', '49', '48', '20', '2', '12.37', 'Tablet', 'San Pablo', '414.26', 'Atis', '2', '14.0'),
('User_912', 'Dalandan', '3-Feb', 'Yes', '2', 'Very useful!', '40', '2', '25', '1', '1.11', 'Tablet', 'San Pablo', '414.26', 'Orange', '1', '15.0'),
('User_913', 'Atis', '5-Apr', 'Yes', '2', 'Great platform!', '46', '18', '25', '12', '13.05', 'Mobile', 'Lipa', '414.26', 'Orange', '4', '14.0'),
('User_914', 'Atis', '5-Apr', 'No', '1', 'Love it!', '30', '13', '23', '13', '3.66', 'Mobile', 'Lucena', '414.26', 'Dalandan', '3', '14.0'),
('User_915', 'Star Apple', '1', 'No', '2', 'Great platform!', '35', '7', '25', '18', '13.64', 'Mobile', 'San Pablo', '414.26', 'Atis', '2', '13.0'),
('User_916', 'Dalandan', '1', 'No', '4', 'Very useful!', '28', '44', '11', '10', '2.89', 'Mobile', 'San Pablo', '414.26', 'Saging', '1', '15.0'),
('User_917', 'Sili', '3-Feb', 'Yes', '2', 'Very useful!', '40', '11', '4', '7', '19.59', 'Desktop', 'San Pablo', '414.26', 'Orange', '2', '11.0'),
('User_918', 'Star Apple', '3-Feb', 'Yes', '5', 'Great platform!', '46', '36', '14', '6', '4.58', 'Desktop', 'San Pablo', '414.26', 'Saging', '2', '13.0'),
('User_919', 'Sili', 'More than 5', 'Yes', '3', 'Easy to use.', '8', '41', '3', '5', '19.04', 'Desktop', 'San Pablo', '414.26', 'Dalandan', '1', '11.0'),
('User_920', 'Orange', 'More than 5', 'No', '1', 'Great platform!', '19', '39', '22', '16', '19.92', 'Mobile', 'San Pablo', '414.26', 'Orange', '5', '16.0'),
('User_921', 'Star Apple', 'More than 5', 'Yes', '5', 'Love it!', '19', '44', '13', '10', '5.34', 'Tablet', 'San Pablo', '414.26', 'Saging', '2', '13.0'),
('User_922', 'Saging', '3-Feb', 'Yes', '4', 'Great platform!', '36', '30', '0', '9', '7.03', 'Tablet', 'Calamba', '414.26', 'Saging', '2', '18.0'),
('User_923', 'Saging', 'More than 5', 'Yes', '2', 'Could be better.', '9', '19', '7', '14', '4.59', 'Mobile', 'Batangas', '414.26', 'Sili', '2', '18.0'),
('User_924', 'Sili', 'More than 5', 'No', '3', 'Great platform!', '4', '34', '9', '7', '2.43', 'Tablet', 'Lipa', '414.26', 'Star Apple', '4', '11.0'),
('User_925', 'Sili', '5-Apr', 'No', '2', 'Great platform!', '33', '47', '1', '4', '13.81', 'Mobile', 'San Pablo', '414.26', 'Sili', '5', '11.0'),
('User_926', 'Saging', '1', 'Yes', '5', 'Could be better.', '23', '6', '10', '10', '18.88', 'Desktop', 'Lucena', '414.26', 'Sili', '3', '18.0'),
('User_927', 'Orange', '3-Feb', 'No', '1', 'Love it!', '17', '33', '12', '12', '14.97', 'Desktop', 'Calamba', '414.26', 'Sili', '1', '16.0'),
('User_928', 'Saging', '3-Feb', 'Yes', '1', 'Could be better.', '10', '38', '6', '15', '12.88', 'Tablet', 'Calamba', '414.26', 'Orange', '2', '18.0'),
('User_929', 'Dalandan', 'More than 5', 'Yes', '5', 'Could be better.', '46', '48', '23', '17', '2.59', 'Tablet', 'San Pablo', '414.26', 'Orange', '3', '15.0'),
('User_930', 'Star Apple', 'More than 5', 'No', '3', 'Could be better.', '17', '10', '21', '11', '14.19', 'Mobile', 'Batangas', '414.26', 'Atis', '3', '13.0'),
('User_931', 'Orange', 'More than 5', 'No', '5', 'Easy to use.', '21', '41', '3', '6', '14.92', 'Desktop', 'Batangas', '414.26', 'Saging', '2', '16.0'),
('User_932', 'Star Apple', '1', 'No', '1', 'Very useful!', '29', '18', '5', '10', '3.2', 'Desktop', 'Batangas', '414.26', 'Dalandan', '3', '13.0'),
('User_933', 'Saging', '5-Apr', 'No', '2', 'Could be better.', '30', '31', '18', '5', '13.71', 'Mobile', 'Batangas', '414.26', 'Sili', '4', '18.0'),
('User_934', 'Saging', '3-Feb', 'Yes', '2', 'Very useful!', '30', '10', '5', '9', '19.24', 'Tablet', 'Lucena', '414.26', 'Saging', '3', '18.0'),
('User_935', 'Dalandan', '1', 'No', '3', 'Very useful!', '27', '3', '9', '6', '14.48', 'Desktop', 'San Pablo', '414.26', 'Saging', '3', '15.0'),
('User_936', 'Sili', '3-Feb', 'No', '2', 'Great platform!', '47', '4', '22', '18', '3.39', 'Desktop', 'Lipa', '414.26', 'Saging', '4', '11.0'),
('User_937', 'Ampalaya', 'More than 5', 'Yes', '3', 'Very useful!', '48', '13', '5', '3', '14.08', 'Tablet', 'Calamba', '414.26', 'Orange', '2', '1.0'),
('User_938', 'Saging', 'More than 5', 'No', '1', 'Could be better.', '17', '19', '8', '7', '14.61', 'Tablet', 'Lucena', '414.26', 'Dalandan', '2', '18.0'),
('User_939', 'Dalandan', '5-Apr', 'Yes', '3', 'Easy to use.', '5', '48', '4', '8', '9.36', 'Desktop', 'Lipa', '414.26', 'Sili', '1', '15.0'),
('User_940', 'Dalandan', '5-Apr', 'No', '5', 'Could be better.', '11', '23', '19', '5', '9.8', 'Desktop', 'Lucena', '414.26', 'Dalandan', '1', '15.0'),
('User_941', 'Dalandan', '5-Apr', 'No', '5', 'Great platform!', '7', '12', '23', '4', '19.4', 'Mobile', 'Lipa', '414.26', 'Sili', '3', '15.0'),
('User_942', 'Star Apple', '5-Apr', 'Yes', '4', 'Easy to use.', '15', '6', '9', '15', '9.75', 'Desktop', 'Calamba', '414.26', 'Atis', '5', '13.0'),
('User_943', 'Star Apple', 'More than 5', 'Yes', '1', 'Great platform!', '10', '18', '0', '9', '3.28', 'Mobile', 'Lipa', '414.26', 'Atis', '4', '13.0'),
('User_944', 'Dalandan', '3-Feb', 'No', '3', 'Very useful!', '45', '44', '13', '1', '9.42', 'Tablet', 'Lucena', '414.26', 'Orange', '4', '15.0'),
('User_945', 'Sili', '1', 'No', '3', 'Love it!', '31', '41', '23', '5', '10.53', 'Tablet', 'Lipa', '414.26', 'Sili', '1', '11.0'),
('User_946', 'Star Apple', '3-Feb', 'Yes', '4', 'Easy to use.', '40', '21', '17', '16', '14.72', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '5', '13.0'),
('User_947', 'Dalandan', 'More than 5', 'Yes', '4', 'Could be better.', '29', '1', '10', '6', '12.88', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '1', '15.0'),
('User_948', 'Star Apple', '3-Feb', 'Yes', '4', 'Easy to use.', '5', '37', '3', '5', '12.49', 'Desktop', 'Calamba', '414.26', 'Dalandan', '2', '13.0'),
('User_949', 'Saging', 'More than 5', 'No', '1', 'Easy to use.', '3', '28', '8', '3', '3.97', 'Tablet', 'Lipa', '414.26', 'Atis', '1', '18.0'),
('User_950', 'Orange', 'More than 5', 'Yes', '5', 'Could be better.', '8', '21', '18', '15', '14.34', 'Tablet', 'Lucena', '414.26', 'Saging', '3', '16.0'),
('User_951', 'Orange', '5-Apr', 'Yes', '5', 'Love it!', '5', '27', '28', '4', '8.88', 'Tablet', 'Batangas', '414.26', 'Atis', '3', '16.0'),
('User_952', 'Orange', '3-Feb', 'Yes', '1', 'Could be better.', '22', '47', '0', '2', '19.53', 'Desktop', 'Batangas', '414.26', 'Atis', '2', '16.0'),
('User_953', 'Saging', '5-Apr', 'Yes', '3', 'Could be better.', '6', '46', '1', '16', '3.78', 'Mobile', 'Calamba', '414.26', 'Sili', '1', '18.0'),
('User_954', 'Orange', 'More than 5', 'Yes', '1', 'Great platform!', '30', '43', '23', '8', '19.05', 'Desktop', 'Lipa', '414.26', 'Sili', '3', '16.0'),
('User_955', 'Orange', '1', 'Yes', '3', 'Love it!', '14', '40', '16', '6', '8.52', 'Mobile', 'San Pablo', '414.26', 'Dalandan', '2', '16.0'),
('User_956', 'Dalandan', 'More than 5', 'No', '5', 'Great platform!', '33', '40', '24', '4', '17.9', 'Desktop', 'Batangas', '414.26', 'Atis', '5', '15.0'),
('User_957', 'Atis', 'More than 5', 'Yes', '4', 'Could be better.', '28', '2', '23', '19', '10.06', 'Mobile', 'Lucena', '414.26', 'Orange', '4', '14.0'),
('User_958', 'Saging', '1', 'Yes', '5', 'Love it!', '23', '9', '15', '16', '6.59', 'Tablet', 'Lucena', '414.26', 'Orange', '5', '18.0'),
('User_959', 'Orange', '3-Feb', 'Yes', '3', 'Easy to use.', '3', '5', '29', '2', '14.93', 'Tablet', 'Calamba', '414.26', 'Dalandan', '3', '16.0'),
('User_960', 'Dalandan', '3-Feb', 'No', '2', 'Love it!', '39', '24', '21', '15', '4.75', 'Mobile', 'San Pablo', '414.26', 'Atis', '3', '15.0'),
('User_961', 'Sili', '3-Feb', 'Yes', '1', 'Could be better.', '6', '22', '25', '17', '8.05', 'Mobile', 'Batangas', '414.26', 'Orange', '3', '11.0'),
('User_962', 'Orange', '3-Feb', 'No', '2', 'Love it!', '27', '12', '0', '15', '8.83', 'Tablet', 'Lucena', '414.26', 'Star Apple', '3', '16.0'),
('User_963', 'Orange', '3-Feb', 'Yes', '5', 'Love it!', '26', '38', '1', '10', '1.07', 'Tablet', 'Lucena', '414.26', 'Sili', '3', '16.0'),
('User_964', 'Dalandan', 'More than 5', 'No', '5', 'Easy to use.', '1', '49', '21', '13', '8.49', 'Tablet', 'Lucena', '414.26', 'Saging', '3', '15.0'),
('User_965', 'Star Apple', 'More than 5', 'Yes', '5', 'Could be better.', '42', '11', '4', '15', '7.46', 'Tablet', 'Calamba', '414.26', 'Saging', '4', '13.0'),
('User_966', 'Saging', '5-Apr', 'Yes', '2', 'Very useful!', '20', '29', '4', '9', '9.16', 'Tablet', 'Lucena', '414.26', 'Orange', '5', '18.0'),
('User_967', 'Sili', '3-Feb', 'Yes', '3', 'Love it!', '9', '12', '0', '19', '15.22', 'Desktop', 'Calamba', '414.26', 'Orange', '2', '11.0'),
('User_968', 'Sili', '1', 'Yes', '1', 'Very useful!', '2', '30', '20', '10', '1.35', 'Desktop', 'Batangas', '414.26', 'Dalandan', '5', '11.0'),
('User_969', 'Star Apple', '3-Feb', 'Yes', '1', 'Easy to use.', '49', '26', '8', '8', '12.66', 'Desktop', 'Batangas', '414.26', 'Dalandan', '5', '13.0'),
('User_970', 'Orange', '5-Apr', 'Yes', '5', 'Love it!', '46', '10', '15', '11', '5.78', 'Mobile', 'Calamba', '414.26', 'Dalandan', '4', '16.0'),
('User_971', 'Star Apple', '1', 'Yes', '4', 'Great platform!', '33', '32', '19', '11', '16.12', 'Mobile', 'Calamba', '414.26', 'Saging', '5', '13.0'),
('User_972', 'Orange', 'More than 5', 'Yes', '5', 'Very useful!', '29', '49', '20', '10', '16.14', 'Desktop', 'Calamba', '414.26', 'Star Apple', '5', '16.0'),
('User_973', 'Star Apple', 'More than 5', 'Yes', '4', 'Very useful!', '7', '27', '21', '5', '10.15', 'Desktop', 'San Pablo', '414.26', 'Orange', '4', '13.0'),
('User_974', 'Orange', '5-Apr', 'No', '2', 'Could be better.', '43', '35', '11', '18', '19.7', 'Desktop', 'Lucena', '414.26', 'Orange', '3', '16.0'),
('User_975', 'Orange', '1', 'Yes', '2', 'Great platform!', '46', '21', '17', '19', '13.11', 'Tablet', 'Lucena', '414.26', 'Sili', '3', '16.0'),
('User_976', 'Star Apple', '3-Feb', 'Yes', '2', 'Love it!', '10', '27', '8', '4', '3.62', 'Tablet', 'Lucena', '414.26', 'Orange', '5', '13.0'),
('User_977', 'Star Apple', '5-Apr', 'Yes', '1', 'Love it!', '7', '37', '25', '10', '17.8', 'Desktop', 'Calamba', '414.26', 'Star Apple', '2', '13.0'),
('User_978', 'Dalandan', 'More than 5', 'Yes', '1', 'Could be better.', '29', '1', '5', '16', '15.42', 'Desktop', 'Calamba', '414.26', 'Sili', '2', '15.0'),
('User_979', 'Saging', '5-Apr', 'Yes', '3', 'Great platform!', '34', '29', '10', '11', '3.88', 'Desktop', 'Batangas', '414.26', 'Atis', '2', '18.0'),
('User_980', 'Saging', '1', 'No', '2', 'Could be better.', '8', '49', '4', '15', '12.96', 'Mobile', 'Lipa', '414.26', 'Dalandan', '2', '18.0'),
('User_981', 'Atis', 'More than 5', 'Yes', '3', 'Love it!', '11', '41', '0', '13', '18.88', 'Tablet', 'Batangas', '414.26', 'Atis', '1', '14.0'),
('User_982', 'Atis', '1', 'No', '3', 'Love it!', '21', '20', '14', '2', '5.9', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '2', '14.0'),
('User_983', 'Dalandan', '1', 'No', '2', 'Easy to use.', '37', '8', '8', '14', '13.67', 'Desktop', 'Lucena', '414.26', 'Saging', '1', '15.0'),
('User_984', 'Dalandan', '1', 'Yes', '3', 'Love it!', '4', '21', '19', '11', '9.39', 'Desktop', 'Lucena', '414.26', 'Orange', '2', '15.0'),
('User_985', 'Atis', '3-Feb', 'No', '3', 'Great platform!', '23', '30', '16', '6', '12.89', 'Tablet', 'Batangas', '414.26', 'Orange', '4', '14.0'),
('User_986', 'Orange', 'More than 5', 'Yes', '4', 'Very useful!', '22', '45', '2', '6', '1.2', 'Tablet', 'Lucena', '414.26', 'Saging', '3', '16.0'),
('User_987', 'Dalandan', '5-Apr', 'No', '1', 'Could be better.', '12', '22', '26', '17', '9.99', 'Desktop', 'Calamba', '414.26', 'Sili', '3', '15.0'),
('User_988', 'Saging', 'More than 5', 'Yes', '2', 'Very useful!', '38', '11', '20', '19', '10.08', 'Desktop', 'Batangas', '414.26', 'Saging', '1', '18.0'),
('User_989', 'Star Apple', '3-Feb', 'Yes', '4', 'Great platform!', '27', '5', '25', '4', '2.47', 'Tablet', 'San Pablo', '414.26', 'Dalandan', '1', '13.0'),
('User_990', 'Orange', 'More than 5', 'Yes', '3', 'Great platform!', '3', '13', '12', '13', '14.62', 'Desktop', 'Lipa', '414.26', 'Star Apple', '2', '16.0'),
('User_991', 'Saging', '1', 'No', '2', 'Great platform!', '34', '11', '19', '14', '16.79', 'Mobile', 'San Pablo', '414.26', 'Atis', '1', '18.0'),
('User_992', 'Atis', '1', 'No', '5', 'Great platform!', '9', '43', '17', '19', '1.71', 'Mobile', 'Calamba', '414.26', 'Star Apple', '4', '14.0'),
('User_993', 'Dalandan', 'More than 5', 'Yes', '5', 'Easy to use.', '24', '2', '29', '15', '15.88', 'Mobile', 'Lucena', '414.26', 'Dalandan', '3', '15.0'),
('User_994', 'Atis', '5-Apr', 'No', '5', 'Very useful!', '39', '48', '8', '11', '1.49', 'Desktop', 'Batangas', '414.26', 'Sili', '1', '14.0');
INSERT INTO `updated_dataset_with_fixed_product_encoded` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`) VALUES
('User_995', 'Star Apple', '1', 'No', '5', 'Love it!', '49', '17', '19', '8', '5.59', 'Desktop', 'Batangas', '414.26', 'Sili', '1', '13.0'),
('User_996', 'Saging', '1', 'No', '5', 'Great platform!', '14', '6', '16', '4', '7.42', 'Mobile', 'San Pablo', '414.26', 'Atis', '1', '18.0'),
('User_997', 'Orange', '5-Apr', 'No', '2', 'Easy to use.', '43', '40', '14', '16', '11.06', 'Tablet', 'Lucena', '414.26', 'Sili', '4', '16.0'),
('User_998', 'Sili', '1', 'Yes', '1', 'Easy to use.', '24', '20', '13', '15', '17.19', 'Mobile', 'Lucena', '414.26', 'Star Apple', '3', '11.0'),
('User_999', 'Sili', '3-Feb', 'No', '3', 'Easy to use.', '20', '10', '21', '17', '19.63', 'Tablet', 'Calamba', '414.26', 'Atis', '1', '11.0'),
('User_1000', 'Ampalaya', '1', 'Yes', '1', 'Great platform!', '43', '47', '14', '6', '19.3', 'Mobile', 'San Pablo', '414.26', 'Sili', '5', '1.0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('buyer','seller') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Elias', 'marianoelias811@gmail.com', '$2b$10$cud895yj4y70/rwsL.Suye0b2oy3xFyf4OCb3PQkbU9jXlqKVCX/C', 'buyer', '2025-04-26 07:50:59'),
(3, 'Elias', 'marianoelijah811@gmail.com', '$2b$10$adAv3ezzhAP.uK/hcbNNGe9EOzOjm2fJAFUE04ednz2v0/f/sZhu6', 'buyer', '2025-04-26 08:08:37'),
(6, 'Fampco', 'fampcosantisimo@gmail.com', '$2b$10$vHRVLQf0L4ppFs7KtwwpEedqvyd5BRfm7XTSqJrD1.8AV1WcNUqR2', 'seller', '2025-04-26 08:28:30'),
(16, 'River Joseph', 'riverjoseph@gmail.com', '$2b$10$SXcE8K/TJ7heghth/BhnYuoqse2W76WM8nYh6.To4wPrGR/SBizEW', 'buyer', '2025-06-02 19:06:20'),
(17, 'Rovic Loterte', 'rovicloterte@gmail.com', '$2b$10$6hoWLJktkTiFBu3iHC8roOHzWoYHFS9TQ5pRghU3JfAhoRl3hlZje', 'buyer', '2025-06-02 19:07:06'),
(18, 'Mark Reyes', 'markreyes@gmail.com', '$2b$10$WQCr2iTlCkHehmREshE2ruVsbukvTA/VeIuow34p1iKvxWWv6HnPm', 'buyer', '2025-06-02 19:07:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donated_products`
--
ALTER TABLE `donated_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donation_requests`
--
ALTER TABLE `donation_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders2`
--
ALTER TABLE `orders2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `trades`
--
ALTER TABLE `trades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trades2`
--
ALTER TABLE `trades2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trade_cart`
--
ALTER TABLE `trade_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `trade_orders`
--
ALTER TABLE `trade_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donated_products`
--
ALTER TABLE `donated_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `donation_requests`
--
ALTER TABLE `donation_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders2`
--
ALTER TABLE `orders2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trades`
--
ALTER TABLE `trades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trades2`
--
ALTER TABLE `trades2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `trade_cart`
--
ALTER TABLE `trade_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trade_orders`
--
ALTER TABLE `trade_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donation_requests`
--
ALTER TABLE `donation_requests`
  ADD CONSTRAINT `donation_requests_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders2` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `trade_cart`
--
ALTER TABLE `trade_cart`
  ADD CONSTRAINT `trade_cart_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `trade_cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `trade_orders`
--
ALTER TABLE `trade_orders`
  ADD CONSTRAINT `trade_orders_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `trade_orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
