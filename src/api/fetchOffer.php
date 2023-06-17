<?php
//ces headers permettent d'éviter tout erreur CORS à cause de la liaison Angular PHP
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
    //on recupere toutes les données importantes dont l'on peut avoir besoin des différentes tables.
	$query = "SELECT OFR.*, OFR.ID as `offer_id`, USR.*, ADR.*, CAT.id, CAT.nom as `category_name` FROM `offre` OFR 
			  INNER JOIN utilisateur USR ON OFR.id_utilisateur = USR.id 
			  INNER JOIN adresse ADR ON OFR.adresse = ADR.id 
			  INNER JOIN categorie CAT on CAT.id = OFR.categorie 
			  WHERE OFR.ID = " . $id;
			  
	$result = $conn->query($query);
	
	if ($result) {
		$row = $result->fetch_assoc();
        //on vient stocker  les données de l'adresse de l'offre dans $adress

        $address = array(
            "id" => $row['adresse'],
            "number" => $row['numero'],
			"street" => $row['nom_rue'],
			"city" => $row['nom_ville'],
			"zip_code" => $row['cp']
            //on vient stocker  les données du détail de l'offre dans $adress (à la fois les détails de l'offre mais aussi ceux du vendeur)
        );
		
		$offerdetail = array(
            "offer" => array(
                "id" => $row['offer_id'],
                "title" => $row['titre'],
                "nb_pictures" => $row['nb_photo'],
                "price" => $row['prix'],
                "description" => $row['detail'],
                "categorie" => $row['category_name'],
                "seller" => $row['pseudo'],
                "post_date" => $row['date'],
                "shippable" => $row['livrable'],
                "address" => $address
            ),
            "seller" => array(
                "nickname" => $row['pseudo'],
                "first_name" => $row['prenom'],
                "last_name" => $row['nom'],
                "email" => $row['email'],
                "reg_date" => $row['creation_compte'],
                "address" => $address,
                "picture" => $row['picture']
            )
			
		);
        //si la requête à réussi, alors on renvoie succes => true vers Angular. On renvoie également en données toutes les détails de l'offre.
		$response = array("success" => true, "offerdetail" => $offerdetail);
	} else {
		$response = array("success" => false);	
	}
			  
} else {
	$response = array("success" => false);	
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

$conn->close();
