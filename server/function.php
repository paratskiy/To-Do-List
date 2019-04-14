<?php

function load_data($query, $mysqli)
{

    $myArray = array();

    $result = $mysqli->query($query) or die("Ошибка " . $mysqli->error);

    if ($result) {

        while ($row = $result->fetch_assoc()) {

            $myArray[$row['project_name']] = array();
            $myArray[$row['project_name']]['project_id'] = $row['id'];

            $subResult = $mysqli->query("SELECT tasks.task_name, tasks.status, tasks.id 
                                         FROM `tasks` 
                                         WHERE tasks.project_id = (SELECT projects.id 
                                                                   FROM `projects` 
                                                                   WHERE projects.id = {$row['id']})")
                or die("Ошибка " . $mysqli->error);

            while ($subRow = $subResult->fetch_assoc()) {

                $myArray[$row['project_name']][] = $subRow;
            }
        }

        echo json_encode($myArray);
    }

    $result->close();
    $mysqli->close();
}


function update_data($query, $mysqli){

    $result = $mysqli->query($query) or die("Ошибка " . $mysqli->error);

    if($result){
        if($mysqli->insert_id){
            echo $mysqli->insert_id;
        } else {
            echo $result;
        }
        
    

    // $result->close();
    // $mysqli->close();
    }

}
