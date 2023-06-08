<?php

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("./database.php");

global $conn;
ConnectDatabase();


//Par defaut, Angular envoie un array json au serveur. Pour lire ces données, il faut décoder le json
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

if ($data) {
    //On accède et on traite les données envoyées par angular au php
    $username = $data->username;
    $password = $data->password;

    $username = mysqli_real_escape_string($conn, $username);
    $password = mysqli_real_escape_string($conn, $password);

    $query = "SELECT * FROM utilisateur WHERE pseudo='" .$username. "' AND password='" .$password. "'";
    $result = $conn->query($query);

    //On vérifie qu'il n'y a bien qu'un seul utilisateur qui correspond aux valeurs entrées
    if ($result and $result->num_rows == 1) {
        $user = $result->fetch_assoc();
	
        $response = array("success" => "true", "user" => $user); //response http lue par le composant
    } else {
        $response = array("success" => "false");
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    $response = array("success" => "false");
    echo json_encode($response);
}

$conn->close();
