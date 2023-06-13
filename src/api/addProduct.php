<?php

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("./database.php");

global $conn;
ConnectDatabase();

// Par défaut, Angular envoie un tableau JSON au serveur. Pour lire ces données, il faut décoder le JSON.
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$response = array("success" => "false");

if ($data) {
    $username = $data->username;
    $title = $data->title;
    $description = $data->description;
    $city = $data->city;
    $road = $data->road;
    $category = $data->category;
    $num_road = $data->num_road;
    $price = $data->price;
    $shippable = $data->shippable;
    $zip_code = $data->zip_code;

    // Sécuriser les champs pour éviter les injections SQL.
    $username = mysqli_real_escape_string($conn, $username);
    $title = mysqli_real_escape_string($conn, $title);
    $description = mysqli_real_escape_string($conn, $description);
    $city = mysqli_real_escape_string($conn, $city);
    $road = mysqli_real_escape_string($conn, $road);
    $zip_code = mysqli_real_escape_string($conn, $zip_code);

    $query = "INSERT INTO `adresse`(`numero`, `nom_rue`, `nom_ville`, `cp`) VALUES ('$num_road', '$road', '$city' , '$zip_code')";
    $result = $conn->query($query);

    if ($result) {
        $lastInsertId = $conn->insert_id;
        $query = "SELECT `id` FROM `utilisateur` WHERE `utilisateur`.`pseudo`= '$username'";
        $result = $conn->query($query);

        if ($result) {
            $rows = $result->fetch_assoc();
            $user_id = $rows["id"];

            $query = "INSERT INTO `offre`(`titre`, `nb_photo`, `prix`, `detail`, `livrable`, `categorie`, `id_utilisateur`, `adresse`) 
            VALUES ('$title','5','$price','$description','$shippable','$category','$user_id','$lastInsertId')";

            $result = $conn->query($query);

            if ($result) {
                $response = array("success" => "true");
            }
        }
    }
    echo json_encode($response);
} else {
    echo json_encode($response);
}

$conn->close();
