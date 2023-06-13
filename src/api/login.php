<?php

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("./database.php");

global $conn;
ConnectDatabase();

// Par défaut, Angular envoie un tableau JSON au serveur. Pour lire ces données, il faut décoder le JSON
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

if ($data) {
    // On accède et on traite les données envoyées par Angular au PHP
    $username = $data->username;
    $password = $data->password;

    $username = mysqli_real_escape_string($conn, $username);

    $query = "SELECT * FROM utilisateur WHERE pseudo='" . $username . "'";
    $result = $conn->query($query);

    // On vérifie qu'il y a bien un utilisateur qui correspond au pseudo
    if ($result && $result->num_rows == 1) {
        $user = $result->fetch_assoc();

        // On utilise password_verify pour vérifier si le mot de passe correspond
        if (password_verify($password, $user['password'])) {
            $response = array("success" => "true", "user" => $user);
        } else {
            $response = array("success" => "false");
        }
    } else {
        $response = array("success" => "false");
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    $response = array("success" => "false");
    echo json_encode($response);
}

$conn->close();
