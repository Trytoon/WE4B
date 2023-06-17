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

// Par défaut, Angular envoie un tableau JSON au serveur. Pour lire ces données, il faut décoder le JSON
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

if ($data) {
    // On accède et on traite les données envoyées par Angular au PHP
    $username = $data->username;
    $password = $data->password;
    //on s'assure de recuperer des valeurs quel'on peut utiliser pour comparer dans la base de données en enlevant les caractères spéciaux.


	$username = mysqli_real_escape_string($conn, $username);
	$password = mysqli_real_escape_string($conn, $password);
    //on récupère  toutes les informations de la base de données grâce au pseudo et au mot de passe que l'on vient de recupérer.

	$query = "SELECT * FROM utilisateur WHERE pseudo='" . $username . "' AND password = '" . $password . "'";

    $result = $conn->query($query);

    // On vérifie qu'il y a bien un et un seul utilisateur qui correspond au pseudo
    if ($result && $result->num_rows == 1) {
        $user = $result->fetch_assoc();
    //on recupere l'adresse de l'utilisateur en fonction du champ adresse de la précédente requete.

    if (isset($user) && isset($user['adresse'])) {
      $query = "SELECT * FROM adresse WHERE id='" . $user["adresse"] . "'";
      $result = $conn->query($query);
    //si il y a un resultat, alors cela veut dire que l'utilisateur a bien rempli une adresse.Dans ce cas on retourne à Angular l'adresse en question qui sera initialisée dans le user_logged.

  
      if ($result && $result->num_rows == 1) {
          $adresse = $result->fetch_assoc();
          $response = array("success" => "true", "user" => $user, "adresse" => $adresse);
      } else {
            //sinon on ne renvoie que le user, et l'adresse sera définie plus tard comme vide avec comme id d'adresse -1
          $response = array("success" => "true", "user" => $user);
      }
  } else {
    
      $response = array("success" => "true", "user" => $user);
  }
  
  } else {
    $response = array("success" => "false");
  }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    $response = array("success" => "false");
    echo json_encode($response,JSON_UNESCAPED_UNICODE);
}

$conn->close();
