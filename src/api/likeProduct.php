<?php
//ces headers permettent d'éviter tout erreur CORS à cause de la liaison Angular PHP
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
	//on initialise des données avec ce que l'on a reçu d'Angular
    $id_product = $data->id_product;
    $username = $data->username;

	//on vient récuperer l'id de l'utilisateur actuellement connecté
	$query = "SELECT `id` FROM `utilisateur` WHERE `utilisateur`.`pseudo`= '$username'";
    $result = $conn->query($query);

	if ($result) {
		$row = $result->fetch_assoc();
		$id = $row["id"];
		//on vient ajouter à la table interet une ligne où on trouve à la fois l'id de l'utilisateur et l'id de l'offre

		$query = "INSERT INTO `interet`(`id_utilisateur`, `id_offre`) VALUES ('$id','$id_product')";

		$result = $conn->query($query);

		if ($result) {
		//si la requête à réussi, alors on renvoie succes => true vers Angular.
			$response = array("success" => "true");
		}
	}
	//on recode en JSON pour le renvoyer à Angular	
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

$conn->close();
