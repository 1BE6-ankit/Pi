<?php
    include_once 'login.php';
    
    $connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);

    if($connection->connect_error)
        die($connectin->connect_error);

    $student_name = $_POST["student_name"];
    $selected_item = $_POST["selected_item"];
    $quantity_taken = $_POST["quantity_taken"];
    $date_taken = $_POST["date_taken"];

    echo("HELLO form the STUDENT PHP ");
    
    $query = "INSERT INTO student_list(student_name, item_taken, quantity_taken, date_taken)
        VALUES('{$student_name}', '{$selected_item}', {$quantity_taken}, '{$date_taken}')";

    echo "QUERY: ". $query;

    $result = $connection->query($query);
    if($result)
        die($connectin->connect_error);
?>