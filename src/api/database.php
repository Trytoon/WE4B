<?php
function ConnectDatabase() {
// Données pour créer la connexion entre PHP et la Base de données. (A remplacer selon vos données)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "leboncoing";

    global $conn;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4"); //Pour assurer que la communication entre php et le sql se fasse en utf8

    // Vérifie la connexion.
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
}