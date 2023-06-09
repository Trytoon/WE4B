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


//Par defaut, Angular envoie un array json au serveur. Pour lire ces données, il faut décoder le json
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

if ($data && property_exists($data, 'productName')) {
  $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name` FROM `offre` OFR
              INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
              INNER JOIN adresse ADR ON OFR.adresse = ADR.id
              INNER JOIN categorie CAT on CAT.id = OFR.categorie
              WHERE ";

  if (property_exists($data, 'productName')) {
    $productName = $data->productName;
    if ($productName !== null) {
      $productName = mysqli_real_escape_string($conn, $productName);
      if ($productName != "") {
        $productName = mysqli_real_escape_string($conn, $productName);
        $productNameUpper = strtoupper($productName);
        $query .= "UPPER(OFR.titre) LIKE '%" . $productNameUpper . "%' AND ";
      }
    }
  }

  if (property_exists($data, 'minPrice')) {
    $minPrice = $data->minPrice;
    if ($minPrice !== null) {
      $query .= "OFR.prix>='" . $minPrice . "' AND ";
    }
  }

  if (property_exists($data, 'maxPrice')) {
    $maxPrice = $data->maxPrice;
    if ($maxPrice !== null) {
      $query .= "OFR.prix<='" . $maxPrice . "' AND ";
    }
  }

  if (property_exists($data, 'categorie')) {

    $categorie = $data->categorie;
    if ($categorie !== null && $categorie !== "") {
      $categorie = mysqli_real_escape_string($conn, $categorie);
      $query .= "CAT.`id` = '" . $categorie . "' AND ";
    }
  }


  // Supprimer le dernier "AND" de la requête
  $query = rtrim($query, ' AND ');

} else {
  $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name` FROM `offre` OFR
              INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
              INNER JOIN adresse ADR ON OFR.adresse = ADR.id
              INNER JOIN categorie CAT on CAT.id = OFR.categorie
              LIMIT 100";
}


// echo '<script>console.log("' . $query . '");</script>';


$result = $conn->query($query);
if ($result) {
  $offers = array();

  // Parcourir les résultats de la requête et ajouter chaque offre à la liste
  while ($row = $result->fetch_assoc()) {
    $offer = array(
      "id" => $row['offer_id'],
      "titre" => $row['titre'],
      "nb_photo" => $row['nb_photo'],
      "prix" => $row['prix'],
      "detail" => $row['detail'],
      "livrable" => $row['livrable'],
      "categorie" => $row['category_name'],
      "pseudo" => $row['pseudo'],
      "addressNumber" => $row['numero'],
      "addressStreet" => $row['nom_rue'],
      "addressCity" => $row['nom_ville'],
      "addressZipCode" => $row['cp'],
    );
    $offers[] = $offer;
  }

  $response = array("success" => true, "offers" => $offers);
} else {
  $response = array("success" => false);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

$conn->close();
