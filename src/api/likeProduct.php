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
    $id_product = $data->id_product;
    $username = $data->username;

	$query = "SELECT `id` FROM `utilisateur` WHERE `utilisateur`.`pseudo`= '$username'";
    $result = $conn->query($query);

	if ($result) {
		$row = $result->fetch_assoc();
		$id = $row["id"];

		$query = "INSERT INTO `interet`(`id_utilisateur`, `id_offre`) VALUES ('$id','$id_product')";

		$result = $conn->query($query);

		if ($result) {
			$response = array("success" => "true");
		}
	}
    echo json_encode($response);
} else {
    echo json_encode($response);
}

$conn->close();
