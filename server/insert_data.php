<?php

require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

$xml = file_get_contents('php://input');

// if ($xml == 'load-todo-list') {
//     $query = "SELECT projects.project_name, projects.id 
//               FROM `projects` 
//               WHERE `user_id` = (SELECT `user_id` 
//                                  FROM `users` 
//                                  WHERE `user_name` = 'paratskiy')";

//     load_data($query, $mysqli);
// }
$data = json_decode($xml, true);

if($xml){

    if($data['element_name'] == 'project'){
        $query = "UPDATE `projects` SET `project_name` = '{$data['project_name']}' WHERE `id` = '{$data['project_id']}'";
        update_data($query, $mysqli);
    }
    
    if($data['element_name'] == 'task'){
        $query = "UPDATE `tasks` SET `task_name`= '{$data['task_name']}', `status` = '{$data['task_status']}' WHERE `id` = '{$data['task_id']}'";
        update_data($query, $mysqli);
    }
    

}