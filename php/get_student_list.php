<?php
    require_once 'login.php';

    $connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);   
    if($connection->connect_error)
        die($connection->connect_error);

    $search_string = $_POST["search_string"];

    $query = "SELECT * FROM student_list ";

    if($search_string!="")
        $query .= "WHERE student_name LIKE '{$search_string}%'";

    $result = $connection->query($query);

    if(!$result)
        die($connection->connect_error);

    $main_data = array();
    while($r = mysqli_fetch_assoc($result)){
        $main_data[] = $r;
    }

    echo json_encode($main_data);

?>