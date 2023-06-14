-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 14 juin 2023 à 15:46
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `leboncoin`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

CREATE TABLE `adresse` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `nom_rue` varchar(255) CHARACTER SET latin1 NOT NULL,
  `nom_ville` varchar(255) CHARACTER SET latin1 NOT NULL,
  `cp` varchar(5) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`id`, `numero`, `nom_rue`, `nom_ville`, `cp`) VALUES
(1, 15, 'Rue de la Montagne', 'Strasbourg', '67000'),
(5, 15, 'Rue de la Mer', 'Quimper', '22000'),
(6, 12, 'Rue de la maison bleue', 'Belfort', '90000'),
(7, 15, 'Rue de la Cité', 'Paris', '75000'),
(8, 545, 'Rue', 'Str', '46448'),
(9, 15, 'Rue de la Marmotte Seche', 'Sevenans', '90400'),
(10, 15, 'Rue de la cheminée', 'Strasbourg', '90000'),
(11, 20, 'dsd', 'sd', '54545'),
(17, 15, 'Rue de la marmotte', 'Paris', '75000'),
(18, 18, 'Rue de la marmotte', 'Lyon', '69000');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`) VALUES
(1, 'Sport'),
(2, 'Informatique'),
(3, 'Automobile'),
(4, 'Electroménager'),
(5, 'Entretien'),
(6, 'Divers');

-- --------------------------------------------------------

--
-- Structure de la table `interet`
--

CREATE TABLE `interet` (
  `id_utilisateur` int(11) NOT NULL,
  `id_offre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `interet`
--

INSERT INTO `interet` (`id_utilisateur`, `id_offre`) VALUES
(15, 8),
(18, 2),
(18, 9);

-- --------------------------------------------------------

--
-- Structure de la table `offre`
--

CREATE TABLE `offre` (
  `id` int(11) NOT NULL,
  `titre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `nb_photo` int(11) NOT NULL,
  `prix` int(11) NOT NULL,
  `detail` varchar(1000) CHARACTER SET latin1 NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `livrable` tinyint(4) NOT NULL DEFAULT 0,
  `categorie` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `adresse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `offre`
--

INSERT INTO `offre` (`id`, `titre`, `nb_photo`, `prix`, `detail`, `date`, `livrable`, `categorie`, `id_utilisateur`, `adresse`) VALUES
(1, 'Tele', 5, 200, 'Une Belle Tele', '2023-06-06 16:46:34', 1, 2, 1, 1),
(2, 'Machine à Laver', 5, 154, 'Une Belle Machine à Laver le linge', '2023-06-06 16:48:04', 0, 4, 1, 1),
(3, 'Ordi', 5, 587, 'Une Belle Tele', '2023-06-06 16:48:04', 1, 2, 1, 1),
(4, 'Pc', 5, 100, 'Une Belle Tele', '2023-06-06 16:48:04', 1, 2, 1, 1),
(5, 'Velo', 5, 500, 'Un beau vélo', '2023-06-06 16:48:04', 0, 1, 1, 1),
(6, 'Moto', 5, 5000, 'Une Belle moto', '2023-06-06 16:48:04', 0, 1, 1, 1),
(8, 'Ventilateur', 5, 12, 'Pour vous dépanner quand il fait chaud.... bouillant -_-', '2023-06-11 17:21:07', 0, 4, 1, 6),
(9, 'Arrosoir', 5, 2, 'Pour arroser ses plantes !', '2023-06-12 15:45:20', 1, 5, 1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `creation_compte` datetime NOT NULL DEFAULT current_timestamp(),
  `adresse` int(11) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `est_theme_clair` tinyint(1) NOT NULL DEFAULT 1,
  `picture` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `pseudo`, `password`, `email`, `creation_compte`, `adresse`, `nom`, `prenom`, `est_theme_clair`, `picture`) VALUES
(1, 'Trytoon', '123456789', 'jkimenau123@gmail.com', '2023-05-26 10:36:53', 18, 'Jean', 'Némarre', 1, 'assets/profilpictures/sonic.jpeg'),
(15, 'Sigmind', '12345678', 'sigmind@gmail.com', '2023-06-12 15:40:33', NULL, NULL, NULL, 1, NULL),
(16, 'Tatsuya', '12345678', 'tatsuya28@gmail.com', '2023-06-13 13:27:06', NULL, NULL, NULL, 1, NULL),
(18, 'Nicolas', '12345678', 'ssqsqd@fdsf.com', '2023-06-14 11:07:21', NULL, NULL, NULL, 1, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `adresse`
--
ALTER TABLE `adresse`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `interet`
--
ALTER TABLE `interet`
  ADD PRIMARY KEY (`id_utilisateur`,`id_offre`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_offre` (`id_offre`);

--
-- Index pour la table `offre`
--
ALTER TABLE `offre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categorie` (`categorie`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `adresse` (`adresse`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adresse` (`adresse`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `adresse`
--
ALTER TABLE `adresse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `offre`
--
ALTER TABLE `offre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `interet`
--
ALTER TABLE `interet`
  ADD CONSTRAINT `interet_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `interet_ibfk_2` FOREIGN KEY (`id_offre`) REFERENCES `offre` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `offre`
--
ALTER TABLE `offre`
  ADD CONSTRAINT `offre_ibfk_1` FOREIGN KEY (`categorie`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `offre_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `offre_ibfk_3` FOREIGN KEY (`adresse`) REFERENCES `adresse` (`id`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`adresse`) REFERENCES `adresse` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
