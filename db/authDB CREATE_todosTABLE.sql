CREATE TABLE `todos` (
  `idTodos` int NOT NULL AUTO_INCREMENT,
  `todos` tinytext,
  `idUser` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idTodos`),
  KEY `id_idx` (`idUser`),
  CONSTRAINT `id` FOREIGN KEY (`idUser`) REFERENCES `login` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
