<?php

require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

$xml = file_get_contents('php://input');

if ($xml == 'load-todo-list') {
    $query = "SELECT projects.project_name, projects.id 
              FROM `projects` 
              WHERE `user_id` = (SELECT `user_id` 
                                 FROM `users` 
                                 WHERE `user_name` = 'paratskiy')";

    get_databse_data($query, $mysqli);
}
