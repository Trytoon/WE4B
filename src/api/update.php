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

if ($data) {
    //les champs de l'addresse
    $streetnumber=$data->streetnumber;
    $street=$data->street;
    $city=$data->city;
    $zip=$data->zip;
    $adresseid=$data->adressid;
    
    
    
    //les champs pour la table utilisateur
    $id =$data->id;
    $username=$data->username;
    $lastname=$data->lastname;
    $firstname=$data->firstname;
    $email=$data->email;
    $password=$data->password;
    $picture=$data->picture;
    
    
    
    // L'utilisateur n'a pas d'adresse, il en fournit une, alors il faut l'ajouter
    if ($adresseid == -1 && isset($streetnumber) && $streetnumber != "") {
        $query = "INSERT INTO `adresse`(`numero`, `nom_rue`, `nom_ville`, `cp`) VALUES ('$streetnumber','$street', '$city','$zip')";
        $result = $conn->query($query);
    
        if ($result) {
            $adressID = $conn->insert_id;
            $newAddresseID = $conn->insert_id;
            //$query = "UPDATE `utilisateur` SET (`adresse`)='$adressID' WHERE utilisateur.id = '$id'";
            $query = "UPDATE `utilisateur` SET `pseudo`='$username', `password`='$password', `email`='$email', `adresse`='$adressID', `nom`='$lastname', `prenom`='$firstname', `picture`='$picture' WHERE utilisateur.id = '$id'";
            $result = $conn->query($query);
            
            if ($result) {
                $response = array("success" => "true", "id" => $newAddresseID);
                echo json_encode($response);
            } else {
                $response = array("success" => "false");
                echo json_encode($response);
            }
        } else {
            $response = array("success" => "false");
            echo json_encode($response);
        }
    } else {
       
        //L'utilisateur supprime son addresse

        if (!isset($streetnumber)) {
            $query = "DELETE FROM `adresse` WHERE `adresse`.`id` = '$adresseid'";
            $result = $conn->query($query);
            $newAddresseID = -1;
            $query = "UPDATE `utilisateur` SET `pseudo`='$username', `password`='$password', `email`='$email', `nom`='$lastname', `prenom`='$firstname', `picture`='$picture' WHERE utilisateur.id = '$id'";
            $result = $conn->query($query);

            if ($result) {
                $response = array("success" => "true", "id" => $newAddresseID);
                echo json_encode($response);
            } else {
                $response = array("success" => "false");
                echo json_encode($response);
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
                echo json_encode($response);
            } else {
                $response = array("success" => "false");
                echo json_encode($response);
            }
        }
        
    } 
 } else {
    $response = array("success" => "false");
    echo json_encode($response);
 }

