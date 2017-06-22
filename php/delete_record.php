<?php
    require_once 'login.php';

    $connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);

    if($connection->connect_error)
        die($connection->connect_error);

    $id_to_delete = $_POST["id_to_delete"];
    $table_to_delete = $_POST["table_name"];

    $query = "DELETE FROM {$table_to_delete} WHERE id={$id_to_delete};";

    $result = $connection->multi_query($query);

    if(!$result)
        die($connection->error);
?>