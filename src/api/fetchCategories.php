<?php
//ces headers permettent d'éviter tout erreur CORS à cause de la liaison Angular PHP

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include("./database.php");

global $conn;
ConnectDatabase();

// on recupere toutes les differentes catégories existant dans la table catégorie
$query = "SELECT DISTINCT categorie.id, categorie.nom FROM categorie";
$result = $conn->query($query);
if ($result) {
	$categories = array();

	// Parcourir les résultats de la requête et ajouter chaque catégorie à la liste
	while ($row = $result->fetch_assoc()) {
		$category = array(
			"id" => $row['id'],
			"nom" => $row['nom'],
		);
		$categories[] = $category;
	}
	//si la requête à réussi, alors on renvoie succes => true vers Angular. On renvoie également en données les catégories.


	$response = array("success" => true, "categories" => $categories);
} else {
	$response = array("success" => false);
}
//on recode en JSON pour le renvoyer à Angular


echo json_encode($response, JSON_UNESCAPED_UNICODE);

$conn->close();
