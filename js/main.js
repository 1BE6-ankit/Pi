
var item_data = '';
var student_data = '';

$(document).ready(function(){
    setTableHeight();

    // add a delegate event to delete the row from item_list 
    $("#item-table").delegate(".delete-button", "click", function(){
        var requiredIdToDelete = this.id;
        $.confirm({
            title: 'Confirm!',
            content: 'Delete Item?',
            buttons: {
                confirm: function () {
                    sendDeleteOperationToDatabase(getRowId(requiredIdToDelete),"item_list");
                    // $.alert('Data Deleted');
                    getItemInfo();
                },
                cancel: function () {
                }
            }
        });
    });

    // add a delegate event to delete the row from student_list
    $("#student-table").delegate(".delete-button", "click", function(){
        var requiredIdToDelete = this.id;
        $.confirm({
            title: 'Confirm!',
            content: 'Remove the data?',
            buttons: {
                confirm: function () {
                    sendDeleteOperationToDatabase(getRowId(requiredIdToDelete),"student_list"); 
                    getStudentInfo();
                },
                cancel: function () {
                }
            }
        });
    });

    // Student form submit
    $("#student-form").submit(function(e){
        if(!sendStudentInfo()){
            e.preventDefault();
        }
    });

    // for search query
    $("#search-form").submit(function(e){
        e.preventDefault();
        var searchQuery = $("#search-input").val();
        getStudentInfo(searchQuery);        
    });

    $("#date-taken").datepicker({ dateFormat: 'DD, d MM , yy' });
    $("#date-taken").val(new Date().toDateString()); // populate with defalut date

});

function setTableHeight(){
    //Set the height of the div containing the inner table(main content) by first finding the height of the screen
    var x =window.innerHeight; 
    var offsetHeightofScrollable = $(".scrollable").offset().top;
    var footerHeight = $("footer").height();

    // so the maximum height of the scrollable div will be:
    var maxHeightOfScrollable = x - (offsetHeightofScrollable + footerHeight);
    var requiredHeight = maxHeightOfScrollable - 20; // for safety reasons deduct 10


    $(".scrollable").css("height", requiredHeight);
    // $(".scrollable").css("height", );
}

function sendItemInfo(){

    var itemName = $("#item-name").val();
    var itemQuantity = $("#item-quantity").val() || 0;

    if(itemName==""){
        $("#item-name").focus();
        return;
    }
    
    $.ajax({
        url : "php/add_item.php",
        type: "post",
        data: {
            "item_name": itemName,
            "item_quantity" : itemQuantity
        },
        async  : true,
        success: function(data){
            console.log("Data Successfully Sent for addition");
            getItemInfo();
        }, error: function(){
            console.log("Error in sending data");
        }
    });
}

function sendStudentInfo(){
    // validation
    var studentName = $("#student-name").val();
    var selectedItem = $("#selected-item").val();
    var quantityTaken = $("#quantity-taken").val() || 0;
    var dateTaken = $("#date-taken").val();

    if(studentName==""){
        $("#student-name").focus();
        return false;
    }
    if(!selectedItem){
        $("#selected-item").focus();
        return false;
    }
    if(!dateTaken){
        $("#date-taken").focus();
        return false;
    }

    $.ajax({
        url: "php/add_student.php",
        type: "post",
        async: "true",
        data: {
            "student_name": studentName,
            "selected_item": selectedItem,
            "quantity_taken": quantityTaken,
            "date_taken": dateTaken
        },success: function(data){
            console.log("Data while adding studens: " + data);
        }, error: function(errorData){
            console.log("Error while adding students: " + errorData);
        }
    });
    

    return true;
    
}

function getItemInfo(){
    $.ajax({
        url : "php/get_items.php",
        type: "post",
        async  : true,
        success: function(data){
            console.log("Data Successfully Sent");
            updateItemTable(JSON.parse(data));
        }, error: function(){
            console.log("Error in sending data");
        }
    });
}

function updateItemTable(jsonData){
    // console.log(jsonData[0]);
    var content = ``;
    for(key in jsonData){
        var deleteButtonId = "del" + jsonData[key]["id"]; // identify the delete button by key since this is needed while deleting the row
        var sn = 1 + parseInt(key);
        content += `
            <tr class="data-row">
                <td>${sn}</td>
                <td>${jsonData[key]["item_name"]}</td>
                <td>${jsonData[key]["quantity"]}</td>
                <td>${jsonData[key]["item_remaining"]}</td>
                <td> <span class="delete-button" id="${deleteButtonId}">X</span> </td> 
            </tr>
        `;
    }
    $("#main-content").html(content);
}

function getStudentInfo(searchString){
    searchString = searchString || "";
    $.ajax({
        url : "php/get_student_list.php",
        type: "post",
        async  : true,
        data: {
            "search_string": searchString
        },
        success: function(data){
            console.log("Data Successfully Received for Students");
            updateStudentTable(JSON.parse(data));
        }, error: function(){
            console.log("Error in sending data");
        }
    });
}

function updateStudentTable(jsonData){
    var content = ``;
    for(key in jsonData){
        var deleteButtonId = "del" + jsonData[key]["id"]; // identify the delete button by key since this is needed while deleting the row
        var sn = 1 + parseInt(key);
        content += `
            <tr class="data-row">
                <td>${sn}</td>
                <td>${jsonData[key]["student_name"]}</td>
                <td>${jsonData[key]["item_taken"]}</td>
                <td>${jsonData[key]["quantity_taken"]}</td>
                <td>${jsonData[key]["date_taken"]}</td>
                <td> <span class="delete-button" id="${deleteButtonId}">X</span> </td> 
            </tr>
        `;
    }
    $("#main-content").html(content);
}



function getRowId(idOfButton){
    /*
        Get the id of the required row
        the id of button is of form: del* 
        we need the * to identify the required row
    */
    var idOfRow = idOfButton.substr(3);
    return idOfRow;
}

function sendDeleteOperationToDatabase(idToDelete, requiredTable){
    $.ajax({
        url:"php/delete_record.php",
        type:"post",
        data: {
            "id_to_delete": idToDelete,
            "table_name": requiredTable
        },
        async: true,
        success: function(data){
            console.log("During Deletion: " + data);
        },
        error: function(error_data){
            alert("Error while deleting: " + error_data);
        }
    });
}

function loadSelectValues(){

    $.ajax({
        url : "php/get_items.php",
        type: "post",
        async  : true,
        success: function(data){
            console.log("Item list data received");

            var jsonData = JSON.parse(data);;
            var content = ``;
            for(key in jsonData){
                content += `
                    <option>${jsonData[key]["item_name"]}</option>
                `;
            }
            $("select").html(content);

        }, error: function(){
            console.log("Error in sending data");
        }
    });
}