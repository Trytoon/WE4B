<?php

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include("./database.php");

global $conn;
ConnectDatabase();

//$query = "SELECT DISTINCT categorie.id, categorie.nom FROM categorie LEFT JOIN offre ON offre.categorie = categorie.id WHERE offre.categorie IS NOT NULL";
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

	$response = array("success" => true, "categories" => $categories);
} else {
	$response = array("success" => false);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

$conn->close();
