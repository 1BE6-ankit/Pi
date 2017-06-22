<?php
    class get_data{
        public $connection;

        function __construct(){
            require_once 'login.php';
            $this->connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);

            if($this->connection->connect_error)
                die($this->connection->connect_error);
        }

        function get_item_list($search_string){
            
            $query = "SELECT * FROM item_list ";
            if($search_string!="")
                $query .= "WHERE item_name LIKE '%{$search_string}%'";

            $result = ($this->connection)->query($query);
            if(!$result)
                die($this->connection->connect_error);

            // result from student table
            $query2 = "SELECT * FROM student_list";
            $result2 = $this->connection->query($query2);
            if(!$result2)
                die($this->connection->error);
            
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
            return json_encode($main_data);
        }

        function get_student_list($search_string){

            $query = "SELECT * FROM student_list ";
            if($search_string!="")
                $query .= "WHERE student_name LIKE '%{$search_string}%'";

            $result = ($this->connection)->query($query);
            if(!$result)
                die($this->connection->connect_error);

            $student_list = array();
            while($r = mysqli_fetch_assoc($result)){
                $student_list[] = $r;
            }

            return json_encode($student_list);
        }
    }
?>