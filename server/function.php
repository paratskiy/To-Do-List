<?php

function get_databse_data($query, $mysqli){

    $myArray = array();

    $result = $mysqli->query($query) or die("Ошибка " . $mysqli->error);

    if ($result) {

        while ($row = $result->fetch_assoc()) {

            $myArray[] = $row;
        }

        echo json_encode($myArray);
    }

    $result->close();
    $mysqli->close();

}
