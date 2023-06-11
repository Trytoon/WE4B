<?php

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("./database.php");

global $conn;
ConnectDatabase();


//Par defaut, Angular envoie un array json au serveur. Pour lire ces données, il faut décoder le json
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);


if ($data) {
	$id = $data->id;
	$query = "SELECT OFR.*, USR.*, ADR.*, CAT.id, CAT.nom as `category_name` FROM `offre` OFR 
			  INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id 
			  INNER JOIN adresse ADR ON OFR.adresse = ADR.id 
			  INNER JOIN categorie CAT on CAT.id = OFR.categorie 
			  WHERE OFR.ID = " . $id;
			  
	$result = $conn->query($query);
	
	if ($result) {
		$row = $result->fetch_assoc();
		
		$offerdetail = array(
			"offerTitle" => $row['titre'],
			"nb_photo" => $row['nb_photo'],
			"price" => $row['prix'],
			"description" => $row['detail'],
            "offerDate" => $row['date'],
			"livrable" => $row['livrable'],
			"categorie" => $row['category_name'],
			"sellerPseudo" => $row['pseudo'],
			"sellerLastName" => $row['nom'],
			"sellerFirstName" => $row['prenom'],
			"sellerEmail" => $row['email'],
			"addressNumber" => $row['numero'],
			"addressStreet" => $row['nom_rue'],
			"addressCity" => $row['nom_ville'],
			"addressZipCode" => $row['cp'],
		);
		$response = array("success" => true, "offerdetail" => $offerdetail);
	} else {
		$response = array("success" => false);	
	}
			  
} else {
	$response = array("success" => false);	
}




echo json_encode($response, JSON_UNESCAPED_UNICODE);

$conn->close();
