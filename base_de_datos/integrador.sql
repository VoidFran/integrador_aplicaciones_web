-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-04-2024 a las 21:02:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `integrador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `Estado` enum('activo','no_activo') DEFAULT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `rol` enum('administrador','ejecutor') DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `clave`, `nombre`, `apellido`, `Estado`, `nombre_usuario`, `rol`, `fecha_registro`) VALUES
(1, 'franciscof2menosf1@gmail.com', '$2b$10$8CUhQks1PMbMYR7XUVmabO4h3t5BSBouPI..XdRpSUJ6mxGDjWTDe', 'Francisco', 'Rondan', 'activo', 'fran', 'administrador', '2024-04-14 20:23:57'),
(62, 'francisco_gearfried@outlook.com', '$2b$10$ZiWfcZbs..6weaR9VB3oxOn.57gt.ZUd5cu3OyiYQ8aBQ3ViC9Rfm', 'Brian', 'Baldeon', 'no_activo', 'brian', 'administrador', '2024-04-27 18:34:45'),
(68, 'francisco_gearfried@outlook.com', '$2b$10$eCAMfBVO5BBLSsenoUKmieJGjssnp30aM7.2qMNEclgFGpsyljUzm', 'Gonzalo', 'Garay', 'activo', 'gonza', 'ejecutor', '2024-04-27 18:57:31'),
(69, 'francisco_gearfried@outlook.com', '$2b$10$hYjw40xy.xOlYkZBQH2eYO8OuddvO6Axuj3BXY6yqxwjLcE6E61oC', 'a', 'a', 'no_activo', 'a', 'ejecutor', '2024-04-27 18:58:17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;