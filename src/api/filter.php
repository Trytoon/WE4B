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

// Par défaut, Angular envoie un tableau JSON au serveur. Pour lire ces données, il faut décoder le JSON
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$liked = false; // Pour savoir si l'offre a été likée par l'utilisateur. Varie en fonction de s'il est connecté ou pas

// Si on est sur la page de filtrage, alors on applique chaque filtre fourni par l'utilisateur un par un
if ($data && property_exists($data, 'productName')) {
  $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name` FROM `offre` OFR, '0' as `is_liked`
              INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
              INNER JOIN adresse ADR ON OFR.adresse = ADR.id
              INNER JOIN categorie CAT ON CAT.id = OFR.categorie
              WHERE ";

  if (property_exists($data, 'productName')) {
    $productName = $data->productName;
    if ($productName !== null && $productName !== "") {
      $productName = mysqli_real_escape_string($conn, $productName);
      $productNameUpper = strtoupper($productName);
      $query .= "UPPER(OFR.titre) LIKE '%" . $productNameUpper . "%' AND ";
    }
  }

  if (property_exists($data, 'minPrice')) {
    $minPrice = $data->minPrice;
    if ($minPrice !== null) {
      $query .= "OFR.prix >= '" . $minPrice . "' AND ";
    }
  }

  if (property_exists($data, 'maxPrice')) {
    $maxPrice = $data->maxPrice;
    if ($maxPrice !== null) {
      $query .= "OFR.prix <= '" . $maxPrice . "' AND ";
    }
  }

  if (property_exists($data, 'categorie')) {
    $categorie = $data->categorie;
    if ($categorie !== null && $categorie !== "") {
      $categorie = mysqli_real_escape_string($conn, $categorie);
      $query .= "CAT.id = '" . $categorie . "' AND ";
    }
  }

  // Supprimer le dernier "AND" de la requête
  $query = rtrim($query, ' AND ');
  $query .= " ORDER BY OFR.date DESC";

// Si on n'est pas sur la page de filtrage mais sur les listes d'offres dans son profil
} else {

  if (property_exists($data, 'username')) {
    $username = $data->username;

    // Récupérer l'id de l'utilisateur
    $query = "SELECT id FROM utilisateur WHERE pseudo = '" . $username . "'";
    $result = $conn->query($query);

    $row = $result->fetch_assoc();
    $id = $row["id"];

    if (property_exists($data, 'myoffers')) {
      // Pour récupérer la liste des offres publiées par l'utilisateur passé en paramètre
      $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name`, '0' as `is_liked`
              FROM `offre` OFR
              INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
              INNER JOIN adresse ADR ON OFR.adresse = ADR.id
              INNER JOIN categorie CAT ON CAT.id = OFR.categorie
              WHERE USR.pseudo = '$username'
              ORDER BY OFR.date DESC";
    } else if (property_exists($data, 'likes')) {
      // Pour récupérer la liste des offres likées par l'utilisateur passé en paramètre
      $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name`,
                    IF(ITR.id_utilisateur IS NOT NULL, 1, 0) as `is_liked`
                    FROM `offre` OFR
                    INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
                    INNER JOIN adresse ADR ON OFR.adresse = ADR.id
                    INNER JOIN categorie CAT ON CAT.id = OFR.categorie
                    LEFT JOIN interet ITR ON OFR.id = ITR.id_offre AND ITR.id_utilisateur = '$id'
                    WHERE IF(ITR.id_utilisateur IS NOT NULL, 1, 0) = 1
                    ORDER BY OFR.date DESC
                    LIMIT 100;";

      $liked = true;
    } else {
      // Pour récupérer la liste des offres pour un utilisateur spécifique
      $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name`,
                    IF(ITR.id_utilisateur IS NOT NULL, 1, 0) as `is_liked`
                    FROM `offre` OFR
                    INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
                    INNER JOIN adresse ADR ON OFR.adresse = ADR.id
                    INNER JOIN categorie CAT ON CAT.id = OFR.categorie
                    LEFT JOIN interet ITR ON OFR.id = ITR.id_offre AND ITR.id_utilisateur = '$id'
                    ORDER BY OFR.date DESC
                    LIMIT 100;";
    }
  } else {
    // Pour récupérer la liste des offres pour tous les utilisateurs (aucun utilisateur spécifié)
    $query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.pseudo, ADR.*, CAT.id, CAT.nom as `category_name`,
                '0' as `is_liked`
                FROM `offre` OFR
                INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id
                INNER JOIN adresse ADR ON OFR.adresse = ADR.id
                INNER JOIN categorie CAT ON CAT.id = OFR.categorie
                ORDER BY OFR.date DESC
                LIMIT 100;";
  }
}

// echo $query;

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
      "date" => $row['date'],
      "liked" => $row['is_liked'], // Par défaut, on a aucune information sur la personne connectée et donc on ne sait pas si l'offre est likée ou pas !
    );
    $offers[] = $offer;
  }

  $response = array("success" => true, "offers" => $offers);
} else {
  $response = array("success" => false);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

$conn->close();
?>
