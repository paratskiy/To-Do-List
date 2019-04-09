<?php

require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

$xml = file_get_contents('php://input');

if($xml == 'load-todo-list'){
    $query = "SELECT projects.project_name FROM `projects` WHERE `user_id` = (SELECT `user_id` FROM `users` WHERE `user_name` = 'paratskiy')";
    get_databse_data($query, $mysqli);
}

if($xml == 'load-todo-items'){
    $query = "SELECT projects.project_name, tasks.task_name, tasks.status FROM `projects`, `tasks` WHERE `user_id` = (SELECT `user_id` FROM `users` WHERE `user_name` = 'paratskiy') AND projects.id = tasks.project_id";
    get_databse_data($query, $mysqli);
}



// // выполняем операции с базой данных
// $myArray = array();



// $result = $mysqli->query($query) or die("Ошибка " . $mysqli->error);//?????????????

// if ($result) {

//     while ($row = $result->fetch_assoc()) {

//         $myArray[] = $row;
//     }

//     echo json_encode($myArray);
// }

// // закрываем подключение
// $result->close();
// $mysqli->close();
