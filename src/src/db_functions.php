<?php

//get current url
function getURL() {
    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
        $url = "https://";
    else
        $url = "http://";
    // Append the host(domain name, ip) to the URL.
    $url.= $_SERVER['HTTP_HOST'];

    // Append the requested resource location to the URL
    $url.= $_SERVER['REQUEST_URI'];

    return $url;
}


//Méthode pour créer/mettre à jour le cookie de Login
//--------------------------------------------------------------------------------
function CreateLoginCookie($username, $encryptedPasswd, $userid)
{
    setcookie("username", $username, time() + 24 * 3600);
    setcookie("password", $encryptedPasswd, time() + 24 * 3600);
    setcookie("userid", $userid, time() + 24 * 3600);
}

//Méthode appelée sur chaque page php
//--------------------------------------------------------------------------------
function ConnectDatabase()
{
// Create connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "forum";

    global $conn;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8mb4"); //Pour assurer que la communication entre php et le sql se fasse en utf8

// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
}

//Fonctions pour intéragir avec la base de données MySQL (noms explicites)
//--------------------------------------------------------------------------------

function getAllGroups()
{
    ConnectDatabase();
    global $conn;
    $query = "SELECT * FROM categories_group";
    $result = $conn->query($query);
    return $result->fetch_all();
}

function getAllGCategories($groupID)
{
    global $conn;
    $query = "SELECT * FROM category where group_id =" . $groupID;
    $result = $conn->query($query);
    return $result->fetch_all();
}

function getMessagesCountForCat($catID)
{
    global $conn;
    $query = "SELECT count(*) as total FROM thread INNER JOIN category on category.id = thread.category_id WHERE category.id =" . $catID;
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return $row["total"];
}

function getCount($id, $type) {
    global $conn;
    if ($type == 'post') {
        $query = "SELECT count(*) as total FROM post where post.thread_id =" . $id;
    } else if ($type == 'thread') {
        $query = "SELECT count(*) as total FROM thread where thread.category_id =" . $id;
    }
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return $row["total"];
}


function getLastPostInCategory($catID)
{
    global $conn;
    $query = 'SELECT DATE_FORMAT(POS.creation_date, "%d %b %Y, %h:%i") as date, USR.username FROM post POS'
        . ' INNER JOIN thread THR on THR.id = POS.thread_id'
        . ' INNER JOIN category CAT on CAT.id = THR.category_id'
        . ' INNER JOIN utilisateur USR on USR.id = POS.author_id'
        . ' WHERE CAT.id ='
        . $catID
        . ' ORDER BY POS.creation_date DESC'
        . ' LIMIT 1;';
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

function getLastPostInThread($threadID)
{
    global $conn;
    $query = 'SELECT DATE_FORMAT(POS.creation_date, "%d %b %Y, %h:%i")
    as cdate, utilisateur.username as cuser
    FROM `post` POS INNER JOIN utilisateur on utilisateur.id = POS.author_id
    WHERE `thread_id`=' . $threadID. "
    ORDER BY POS.creation_date
    DESC LIMIT 1";

    $result = $conn->query($query);
    return $result->fetch_assoc();
}

function getThread($threadID)
{
    global $conn;
    $query = 'SELECT * FROM thread WHERE thread.id =' . $threadID;
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

function getCategory($catID)
{
    global $conn;
    $query = 'SELECT * FROM category WHERE category.id =' . $catID;
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

function getUser($userID) {
    global $conn;
    $query = 'SELECT * FROM utilisateur WHERE utilisateur.id =' . $userID;
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

function getUserByName($username) {
    global $conn;
    $query = "SELECT * FROM utilisateur WHERE utilisateur.username = '$username'";
    $result = $conn->query($query);
    return $result->fetch_assoc();
}
function isUserModerator($userID)
{
    global $conn;
    $query = 'SELECT is_moderator FROM utilisateur WHERE utilisateur.id =' . $userID;
    $result = $conn->query($query);
    $val = $result->fetch_assoc();
    return intval($val["is_moderator"], 10);
}

function isUserBanned($userID)
{
    global $conn;
    $query = 'SELECT ban_status FROM utilisateur WHERE utilisateur.id =' . $userID;
    $result = $conn->query($query);
    $val = $result->fetch_assoc();
    return intval($val["ban_status"], 10);
}

function getPostPicture($postID)
{
    global $conn;
    $query = 'SELECT * FROM `post_pictures` WHERE `post_id` =' . $postID;
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

function getUserAvatar($userID)
{
    global $conn;
    $query = 'SELECT * FROM avatar WHERE avatar.user_id =' . $userID;
    $result = $conn->query($query);
    return $result->fetch_assoc();
}


function getElementsForPage($id, $type, $page_number, $to_display) {
    global $conn;
    $search_index = ($page_number - 1) * $to_display;
    if($type == "post") {
        $query = "SELECT * FROM post where post.thread_id =" . $id . " LIMIT " .$search_index . "," .$to_display;
    } elseif($type == "thread") {

        //Utilise une sous-requete.
        // Sous requete : recuperer dans last_message_date la date du dernier message de chaque thread dans la catégorie
        // Requete : recuperer tous les threads en triant par last_message_date et en prenant en compte les paramtres get

        $query = 'SELECT t.*,
           (SELECT DATE_FORMAT(p.creation_date, "%d %b %Y, %h:%i")
            FROM post p WHERE p.thread_id = t.id
            ORDER BY p.creation_date DESC LIMIT 1) as last_message_date
        FROM thread t
        WHERE t.category_id =' . $id .'
        ORDER BY last_message_date DESC';
        $query .= " LIMIT " .$search_index . "," .$to_display;
    } else {
        return array(); //On retourne rien
    }
    $result = $conn->query($query);
    return $result->fetch_all();
}

function getLastPageIndex($id, $type, $to_display)
{
    if ($type === "post") {
        $total = getCount($id, "post");
    } else if ($type === "thread") {
        $total = getCount($id, "thread");
    } else {
        return 1;
    }

    if ($total > 0) {
        return ceil(intval($total) / $to_display); //Arrondi à l'entier supérieur le nombre de pages total
    } else {
        return 1;
    }
}


global $conn;
ConnectDatabase();
