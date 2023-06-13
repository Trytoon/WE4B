<?php 

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$request = file_get_contents('php://input');
$data = json_decode($request);

 $servername = "localhost";
 $username   = "root";
 $password   = "root";
 $dbname     = "leboncoin";



 
 // Create connection
 $conn = new mysqli($servername, $username, $password, $dbname);
 
 // Check connection
 if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
 } 



$streetnumber=$data->streetnumber;
$street=$data->street;
$city=$data->city;
$zip=$data->zip;
$adresseid=$data->adressid;



//les champs pour la table utilisateur
$username=$data->username;
$lastname=$data->lastname;
$firstname=$data->firstname;
$email=$data->email;
$password=$data->password;





$requestadress = "UPDATE adresse SET numero='".$streetnumber."',nom_rue='".$street."',nom_ville='".$city."',cp='".$zip."'WHERE id='".$adresseid."'";
$resultadress=mysqli_query($conn,$requestadress); 

 
 $requestuser = "UPDATE utilisateur SET pseudo='".$username."',password='".$password."',email='".$email."',nom='".$lastname."',prenom='".$firstname."'WHERE id=3" ;
 $result = mysqli_query($conn,$requestuser); 
 $myArray = array();
 if ($result->num_rows > 0) {
 // output data of each row
     while($row = $result->fetch_assoc()) {
         $myArray[] = array_map("utf8_encode", $row);
     }
     print json_encode($myArray);
 } 
 else 
 {
     echo "0 results";
 }