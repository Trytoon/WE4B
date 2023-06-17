<?php
function ConnectDatabase() {
// Create connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "leboncoin";

    global $conn;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4"); //Pour assurer que la communication entre php et le sql se fasse en utf8

// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
}