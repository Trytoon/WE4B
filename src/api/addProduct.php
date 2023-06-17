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
    $username = $data->username;
    $title = $data->title;
    $description = $data->description;
    $city = $data->city;
    $road = $data->road;
    $category = $data->category;
    $nb_photo = $data->nb_photo;
    $num_road = $data->num_road;
    $price = $data->price;
    $shippable = $data->shippable;
    $zip_code = $data->zip_code;

    // Sécuriser les champs pour éviter les injections SQL.
    $username = mysqli_real_escape_string($conn, $username);
    $title = mysqli_real_escape_string($conn, $title);
    $description = mysqli_real_escape_string($conn, $description);
    $city = mysqli_real_escape_string($conn, $city);
    $road = mysqli_real_escape_string($conn, $road);
    $zip_code = mysqli_real_escape_string($conn, $zip_code);

    //on effectue la requete pour l'adresse de l'offre
    $query = "INSERT INTO `adresse`(`numero`, `nom_rue`, `nom_ville`, `cp`) VALUES ('$num_road', '$road', '$city' , '$zip_code')";
    $result = $conn->query($query);

    if ($result) {
    //si la requete à correctement été effectuée, on recupère l'id de cette adresse venant d'être crée.
        $lastInsertId = $conn->insert_id;
        //on recupère l'id de l'utilisateur qui vient ajouter une nouvelle offre.
        $query = "SELECT `id` FROM `utilisateur` WHERE `utilisateur`.`pseudo`= '$username'";
        $result = $conn->query($query);

        if ($result) {
            $rows = $result->fetch_assoc();
            $user_id = $rows["id"];
            //on vient inserer une nouvelle offre dans la table offre qui a en paramètre tous les paramètres d'une offre, dont l'id de l'adresse que nous venons de récupérer.
            $query = "INSERT INTO `offre`(`titre`, `nb_photo`, `prix`, `detail`, `livrable`, `categorie`, `id_utilisateur`, `adresse`) 
            VALUES ('$title','$nb_photo','$price','$description','$shippable','$category','$user_id','$lastInsertId')";

            $result = $conn->query($query);

            //si la requête à réussi, alors on renvoie succes => true vers Angular.
            if ($result) {
                $response = array("success" => "true");
            }
        }
    }
    //on recode en JSON pour le renvoyer à Angular
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

$conn->close();
