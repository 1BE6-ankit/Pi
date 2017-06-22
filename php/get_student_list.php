<?php
    include "get_data.php";

    $item_var = new get_data();
    echo $item_var->get_student_list($_POST["search_string"]);    
?>