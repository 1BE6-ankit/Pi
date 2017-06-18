<?php
    require_once 'login.php';

    // connection with item database
    $connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);
    if($connection->connect_error)
        die($connection->connect_error);

    $query = "SELECT * FROM item_list";
    $result = $connection->query($query);

    if(!$result)
        die($connection->error);

    // result from student table
    $query2 = "SELECT * FROM student_list";
    $result2 = $connection->query($query2);
    if(!$result2)
        die($connection->error);
    
    $main_data = array();
    while($r = mysqli_fetch_assoc($result)){

        $r = array_merge($r, array("item_remaining"=>$r["quantity"]) );
        $current_item_name = $r["item_name"];
        
        // fetch from the student database to check which items are borrowed and hence find the items remaining
        while($student_record = mysqli_fetch_assoc($result2)){
            $item_borrowed = $student_record["item_taken"];
            $quantity_taken = $student_record["quantity_taken"];

            if($item_borrowed==$current_item_name){
                $r["item_remaining"] -= $quantity_taken;
            }   
        }
        mysqli_data_seek($result2, 0);
        $main_data[] = $r;
    }

    echo json_encode($main_data);
?>