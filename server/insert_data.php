<?php
session_start();
require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

// $userId = $_SESSION['user_id'];
$userId = 1;

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
        $query = "INSERT INTO `projects` (`id`, `project_name`, `user_id`) VALUES ( '', '{$data['project_name']}', '{$userId}')";
        // $query = "UPDATE `projects` SET `project_name` = '{$data['project_name']}' WHERE `id` = '{$data['project_id']}'";
        update_data($query, $mysqli);
    }
    
    if($data['element_name'] == 'task'){
        $query = "INSERT INTO `tasks` (`id`, `task_name`, `status`, `project_id`) VALUES ( '', '{$data['task_name']}', '{$data['task_status']}', '{$data['task_project_id']}')";
        update_data($query, $mysqli);
    }
    

}