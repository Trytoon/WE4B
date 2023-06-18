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


//Par defaut, Angular envoie un array json au serveur. Pour lire ces données, il faut décoder le json
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

if ($data) {
	// Les champs de l'adresse
	$streetnumber = mysqli_real_escape_string($conn, $data->streetnumber);
	$street = mysqli_real_escape_string($conn, $data->street);
	$city = mysqli_real_escape_string($conn, $data->city);
	$zip = mysqli_real_escape_string($conn, $data->zip);
	$adresseid = mysqli_real_escape_string($conn, $data->adressid);

	// Les champs pour la table utilisateur
	$id = mysqli_real_escape_string($conn, $data->id);
	$username = mysqli_real_escape_string($conn, $data->username);
	$lastname = mysqli_real_escape_string($conn, $data->lastname);
	$firstname = mysqli_real_escape_string($conn, $data->firstname);
	$email = mysqli_real_escape_string($conn, $data->email);
	$password = mysqli_real_escape_string($conn, $data->password);
	$picture = mysqli_real_escape_string($conn, $data->picture);

    
    
    
    // L'utilisateur n'a pas d'adresse, il en fournit une, alors il faut l'ajouter
    if ($adresseid == -1 && isset($streetnumber) && $streetnumber != "") {
        $query = "INSERT INTO `adresse`(`numero`, `nom_rue`, `nom_ville`, `cp`) VALUES ('$streetnumber','$street', '$city','$zip')";
        $result = $conn->query($query);
    
        if ($result) {
            $adressID = $conn->insert_id;
            $newAddresseID = $conn->insert_id;
            $query = "UPDATE `utilisateur` SET `pseudo`='$username', `password`='$password', `email`='$email', `adresse`='$adressID', `nom`='$lastname', `prenom`='$firstname', `picture`='$picture' WHERE utilisateur.id = '$id'";
            $result = $conn->query($query);
            
            if ($result) {
                $response = array("success" => "true", "id" => $newAddresseID);
                echo json_encode($response,JSON_UNESCAPED_UNICODE);
            } else {
                $response = array("success" => "false");
                echo json_encode($response,JSON_UNESCAPED_UNICODE);
            }
        } else {
            $response = array("success" => "false");
            echo json_encode($response,JSON_UNESCAPED_UNICODE);
        }
    } else {
       
        //L'utilisateur supprime son addresse --> Un des champs est null (donc pas besoin de verifier si tous les champs sont null car le backend le fait deja)
        if (!isset($street)) {
            $query = "DELETE FROM `adresse` WHERE `adresse`.`id` = '$adresseid'";
            $result = $conn->query($query);
            $newAddresseID = -1;
            $query = "UPDATE `utilisateur` SET `pseudo`='$username', `password`='$password', `email`='$email', `nom`='$lastname', `prenom`='$firstname', `picture`='$picture' WHERE utilisateur.id = '$id'";
            $result = $conn->query($query);

            if ($result) {
                $response = array("success" => "true", "id" => $newAddresseID);
                echo json_encode($response,JSON_UNESCAPED_UNICODE);
            } else {
                $response = array("success" => "false");
                echo json_encode($response,JSON_UNESCAPED_UNICODE);
            }
        } 
        //L'utilisateur met à jour son addresse
        else {
            $query = "UPDATE `adresse` SET `numero`='$streetnumber', `nom_rue`='$street', `nom_ville`='$city', `cp`='$zip' WHERE `id`='$adresseid'";
            $result = $conn->query($query);

            $query2 = "UPDATE `utilisateur` SET `pseudo`='$username', `password`='$password', `email`='$email', `nom`='$lastname', `prenom`='$firstname', `picture`='$picture' WHERE `utilisateur`.`id` = '$id'";
            $result2 = $conn->query($query2);
            if ($result) {
                $response = array("success" => "true");
                echo json_encode($response,JSON_UNESCAPED_UNICODE);
            } else {
                $response = array("success" => "false");
                echo json_encode($response,JSON_UNESCAPED_UNICODE);
            }
        }
        
    } 
 } else {
    $response = array("success" => "false");
    echo json_encode($response,JSON_UNESCAPED_UNICODE);
 }