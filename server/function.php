<?php

function get_databse_data($query, $mysqli)
{

    $myArray = array();

    $result = $mysqli->query($query) or die("Ошибка " . $mysqli->error);

    if ($result) {

        while ($row = $result->fetch_assoc()) {

            $myArray[$row['project_name']] = array();

            $subResult = $mysqli->query("SELECT tasks.task_name, tasks.status 
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
