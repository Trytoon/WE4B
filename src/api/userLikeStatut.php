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
$offers = array();

if ($data) {
    $username = $data->username;

    $query = "SELECT `id` FROM `utilisateur` WHERE `pseudo`= '$username'";
    $result = $conn->query($query);

    if ($result && $result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $id = $row["id"];

        $query = "SELECT `id_offre` FROM `interet` WHERE `id_utilisateur`='$id'";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            $offreIds = array();
            while ($row = $result->fetch_assoc()) {
                $offreIds[] = $row['id_offre'];
            }
            $response = array("success" => "true", "offreIds" => $offreIds);
        } else {
            $response = array("success" => "true", "offreIds" => []);
        }
    } else {
        $response = array("success" => "false");
    }

    echo json_encode($response);
} else {
    echo json_encode($response);
}


$conn->close();
