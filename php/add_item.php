<?php
    require_once 'login.php';

    // connection with item database
    $connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);
    if($connection->connect_error)
        die($connection->connect_error);

    $item_name = $_POST["item_name"];
    $item_quantity = $_POST["item_quantity"];

    $query = "INSERT INTO item_list(item_name, quantity) 
        VALUES('".$item_name."',".$item_quantity.")";

    if($connection->query($query)){
        echo "New Item Added Successfully";
    }else{
        echo "ERROR: " . $echo . "<br>".$connection->error;  
    }
?>