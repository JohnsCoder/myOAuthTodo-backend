CREATE TABLE `login` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password_hash` varchar(250) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
