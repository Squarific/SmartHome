-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 25 mei 2015 om 23:52
-- Serverversie: 5.5.43-0ubuntu0.14.04.1
-- PHP-versie: 5.5.9-1ubuntu4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+01:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `smarthome`
--
DROP DATABASE IF EXISTS `smarthome`;
CREATE DATABASE `smarthome` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `smarthome`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `name` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Gegevens worden uitgevoerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `surname`, `password`, `salt`, `email`, `role`, `date_registered`) VALUES
(1, 'david', 'David', 'Danssaert', '$2a$10$REt1yyfPNOZ87KxdiXlXs.hCrKX8ICtxZp2mvpeCNlXpycSmnO2vG', 'salt', 'david.danssaert@gmail.com', 0, '2016-02-07 17:40:41'),
(2, 'filip', 'Filip', 'Smets', '$2a$10$REt1yyfPNOZ87KxdiXlXs.hCrKX8ICtxZp2mvpeCNlXpycSmnO2vG
', 'salt', 'filip.smets@student.uantwerpen.be', 0, '2016-02-07 18:40:41'),
(3, 'jens', 'Jens', 'Bijtebier', '$2a$10$REt1yyfPNOZ87KxdiXlXs.hCrKX8ICtxZp2mvpeCNlXpycSmnO2vG
', 'salt', 'jens.bijtebier@student.uantwerpen.be', 0, '2016-02-07 18:53:31'),
(4, 'thanh_danh', 'Thanh Danh', 'Le', '$2a$10$REt1yyfPNOZ87KxdiXlXs.hCrKX8ICtxZp2mvpeCNlXpycSmnO2vG
', 'salt', 'thanh.danh.le@student.uantwerpen.be', 0, '2016-02-07 19:17:34'),
(5, 'nisse', 'Nisse', 'Strauven', '$2a$10$REt1yyfPNOZ87KxdiXlXs.hCrKX8ICtxZp2mvpeCNlXpycSmnO2vG
', 'salt', 'nisse.strauven@student.uantwerpen.be', 0, '2016-02-07 21:42:57');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `homes`
--

DROP TABLE IF EXISTS `homes`;
CREATE TABLE `homes` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `owner_id` tinyint(4) NOT NULL,
  `name` varchar(64) NOT NULL,
  `country` varchar(2) NOT NULL,
  `city` varchar(64) NOT NULL,
  `zipcode` varchar(16) NOT NULL,
  `street` varchar(64) NOT NULL,
  `house_number` varchar(8) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_owner` (`owner_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Gegevens worden uitgevoerd voor tabel `homes`
--

INSERT INTO `homes` (`id`, `owner_id`, `name`, `country`, `city`, `zipcode`, `street`, `house_number`, `date_added`) VALUES
(1, 1, 'Thuis', 'be', 'Antwerpen', '2018', 'Mercatorstraat', '12', '2016-02-9 18:15:39'),
(2, 2, 'Thuis', 'be', 'Antwerpen', '2060', 'Schoolstraat', '42', '2016-02-13 11:41:09'),
(3, 2, 'Vakantiehuis', 'be', 'houffalize', '6661', 'Taverneux', '17', '2016-02-16 14:25:42'),
(4, 3, 'Thuis', 'be', 'Deurne', '2100', 'Jozef Verbovenlei', '35', '2016-02-18 9:31:57'),
(5, 3, 'Praktijk', 'be', 'Deurne', '2100', 'Jozef Verbovenlei', '39', '2016-18-9 9:53:17');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users_homes`
--

DROP TABLE IF EXISTS `users_homes`;
CREATE TABLE `users_homes` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `user_id` tinyint(4) NOT NULL,
  `home_id` tinyint(4) NOT NULL,
  `permission_flags` tinyint(4) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_users` (`user_id`),
  KEY `fk_homes` (`home_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

--
-- Gegevens worden uitgevoerd voor tabel `users_homes`
--

INSERT INTO `users_homes` (`id`, `user_id`, `home_id`, `permission_flags`, `date_created`) VALUES
(1, 1, 1, 4294967296, '2015-03-02 23:41:09'),
(2, 2, 2, 4294967296, '2015-03-02 23:41:09'),
(3, 2, 3, 4294967296, '2015-03-02 23:41:09'),
(4, 3, 4, 4294967296, '2015-03-02 23:41:09'),
(5, 3, 5, 4294967296, '2015-03-02 23:41:09');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `sensors`
--

DROP TABLE IF EXISTS `sensors`;
CREATE TABLE `sensors` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `home_id` tinyint(4) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(256) NOT NULL,
  `power_unit` ENUM('Wh', 'kWh') NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_home` (`home_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Gegevens worden uitgevoerd voor tabel `sensors`
--

INSERT INTO `sensors` (`id`, `home_id`, `name`, `description`, `power_unit`, `date_created`) VALUES
(1, 1, 'Koelkast', 'beschrijving', 'kWh', '2016-02-9 18:15:39'),
(2, 2, 'Elektrische Douche', 'beschrijving', 'kWh', '2016-02-13 11:41:09'),
(3, 3, 'Computer', 'beschrijving', 'kWh', '2016-02-16 14:25:42'),
(4, 4, 'TV', 'beschrijving', 'kWh', '2016-02-18 9:31:57'),
(5, 5, 'Verlichting Keuken', 'beschrijving', 'kWh', '2016-18-9 9:53:17');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` varchar(256) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `tags`
--

INSERT INTO `tags` (`id`, `name`, `description`, `date_created`) VALUES
(1, 'Apparaten', 'beschrijving', '2016-02-9 18:15:39'),
(2, 'Verlichting', 'beschrijving', '2016-02-13 11:41:09');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `sensors_tags`
--

DROP TABLE IF EXISTS `sensors_tags`;
CREATE TABLE `sensors_tags` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sensor_id` tinyint(4) NOT NULL,
  `tag_id` tinyint(4) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_sensors` (`sensor_id`),
  KEY `fk_tags` (`tag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Gegevens worden uitgevoerd voor tabel `users_homes`
--

INSERT INTO `sensors_tags` (`id`, `sensor_id`, `tag_id`, `date_created`) VALUES
(1, 1, 1, '2015-03-02 23:41:09'),
(2, 2, 1, '2015-03-02 23:41:09'),
(3, 3, 1, '2015-03-02 23:41:09'),
(4, 4, 1, '2015-03-02 23:41:09'),
(5, 5, 2, '2015-03-02 23:41:09');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recent_data`
--

DROP TABLE IF EXISTS `recent_data`;
CREATE TABLE `recent_data` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sensor_id` tinyint(4) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usage` INT(8) NOT NULL,
  `n_measurements` INT(8) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE(`timestamp`),
  KEY `fk_sensor` (`sensor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4;

--
-- Gegevens worden uitgevoerd voor tabel `recent_data`
--
INSERT INTO `recent_data` (`id`, `sensor_id`, `timestamp`, `usage`, `n_measurements`) VALUES
(1, 1, '2015-03-02 13:04:09', 1000, 1),
(2, 1, '2015-03-02 13:27:19', 900, 1),
(3, 1, '2015-03-02 13:41:45', 1100, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `hourly_data`
--

DROP TABLE IF EXISTS `hourly_data`;
CREATE TABLE `hourly_data` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sensor_id` tinyint(4) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usage` INT(8) NOT NULL,
  `n_measurements` INT(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE(`timestamp`),
  KEY `fk_sensor` (`sensor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Gegevens worden uitgevoerd voor tabel `hourly_data`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `daily_data`
--

DROP TABLE IF EXISTS `daily_data`;
CREATE TABLE `daily_data` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sensor_id` tinyint(4) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usage` INT(8) NOT NULL,
  `n_measurements` INT(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE(`timestamp`),
  KEY `fk_sensor` (`sensor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Gegevens worden uitgevoerd voor tabel `daily_data`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `monthly_data`
--

DROP TABLE IF EXISTS `monthly_data`;
CREATE TABLE `monthly_data` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sensor_id` tinyint(4) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usage` INT(8) NOT NULL,
  `n_measurements` INT(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE(`timestamp`),
  KEY `fk_sensor` (`sensor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Gegevens worden uitgevoerd voor tabel `monthly_data`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `yearly_data`
--

DROP TABLE IF EXISTS `yearly_data`;
CREATE TABLE `yearly_data` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `sensor_id` tinyint(4) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usage` INT(8) NOT NULL,
  `n_measurements` INT(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE(`timestamp`),
  KEY `fk_sensor` (`sensor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0;

--
-- Gegevens worden uitgevoerd voor tabel `yearly_data`
--

-- --------------------------------------------------------

--
-- Beperkingen voor gedumpte tabellen
--

--
-- Beperkingen voor tabel `homes`
--
ALTER TABLE `homes`
  ADD CONSTRAINT `homes_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Beperkingen voor tabel `users_homes`
--
ALTER TABLE `users_homes`
  ADD CONSTRAINT `users_homes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_homes_ibfk_2` FOREIGN KEY (`home_id`) REFERENCES `homes` (`id`);

--
-- Beperkingen voor tabel `sensors`
--
ALTER TABLE `sensors`
  ADD CONSTRAINT `sensors_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `homes` (`id`);

--
-- Beperkingen voor tabel `sensors_tags`
--
ALTER TABLE `sensors_tags`
  ADD CONSTRAINT `sensors_tags_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`),
  ADD CONSTRAINT `sensors_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Beperkingen voor tabel `recent_data`
--
ALTER TABLE `recent_data`
  ADD CONSTRAINT `recent_data_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);

--
-- Beperkingen voor tabel `daily_data`
--
ALTER TABLE `daily_data`
  ADD CONSTRAINT `daily_data_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);

--
-- Beperkingen voor tabel `hourly_data`
--
ALTER TABLE `hourly_data`
  ADD CONSTRAINT `hourly_data_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);

--
-- Beperkingen voor tabel `yearly_data`
--
ALTER TABLE `yearly_data`
  ADD CONSTRAINT `yearly_data_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);

--
-- Triggers `recent_data`
--
DELIMITER $$
CREATE TRIGGER `recent_data_aggregation` AFTER INSERT ON `recent_data`
 FOR EACH ROW BEGIN
INSERT INTO `hourly_data` (`sensor_id`, `timestamp`, `usage`, `n_measurements`)
SELECT `sensor_id`, DATE_FORMAT(`timestamp`, "%Y-%m-%d %H:00:00") AS `hour`, AVG(`usage`), SUM(`n_measurements`)
FROM `recent_data`
WHERE `sensor_id` = NEW.sensor_id AND HOUR(`timestamp`) = (SELECT HOUR(MAX(`timestamp`)) FROM `recent_data`)
GROUP BY `sensor_id`, `hour`
ON DUPLICATE KEY UPDATE `id`=`id`;
END;
$$
DELIMITER ;

--
-- Triggers `hourly_data`
--
DELIMITER $$
CREATE TRIGGER `hourly_data_aggregation` AFTER INSERT ON `hourly_data`
 FOR EACH ROW
INSERT INTO `daily_data` (`sensor_id`, `timestamp`, `usage`, `n_measurements`)
SELECT `sensor_id`, DATE_FORMAT(`timestamp`, "%Y-%m-%d 00:00:00") AS `day`, AVG(`usage`), SUM(`n_measurements`)
FROM `hourly_data`
WHERE `sensor_id` = NEW.sensor_id AND DAY(`timestamp`) = (SELECT DAY(MAX(`timestamp`)) FROM `hourly_data`)
GROUP BY `sensor_id`, `day`
ON DUPLICATE KEY UPDATE `id`=`id`
$$
DELIMITER ;

--
-- Triggers `daily_data`
--
DELIMITER $$
CREATE TRIGGER `daily_data_aggregation` AFTER INSERT ON `daily_data`
 FOR EACH ROW
INSERT INTO `monthly_data` (`sensor_id`, `timestamp`, `usage`, `n_measurements`)
SELECT `sensor_id`, DATE_FORMAT(`timestamp`, "%Y-%m-01 00:00:00") AS `month`, AVG(`usage`), SUM(`n_measurements`)
FROM `daily_data`
WHERE `sensor_id` = NEW.sensor_id AND MONTH(`timestamp`) = (SELECT MONTH(MAX(`timestamp`)) FROM `daily_data`)
GROUP BY `sensor_id`, `month`
ON DUPLICATE KEY UPDATE `id`=`id`
$$
DELIMITER ;

--
-- Triggers `monthly_data`
--
DELIMITER $$
CREATE TRIGGER `monthly_data_aggregation` AFTER INSERT ON `monthly_data`
 FOR EACH ROW
INSERT INTO `yearly_data` (`sensor_id`, `timestamp`, `usage`, `n_measurements`)
SELECT `sensor_id`, DATE_FORMAT(`timestamp`, "%Y-01-01 00:00:00") AS `year`, AVG(`usage`), SUM(`n_measurements`)
FROM `monthly_data`
WHERE `sensor_id` = NEW.sensor_id AND YEAR(`timestamp`) = (SELECT YEAR(MAX(`timestamp`)) FROM `monthly_data`)
GROUP BY `sensor_id`, `year`
ON DUPLICATE KEY UPDATE `id`=`id`
$$
DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
