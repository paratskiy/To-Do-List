<?php
session_start();

require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

$userId = $_SESSION['user_id'];

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

$xml = file_get_contents('php://input');

if ($xml == 'load-todo-list') {
    $query = "SELECT projects.project_name, projects.id 
              FROM `projects` 
              WHERE `user_id` = (SELECT `user_id` 
                                 FROM `users` 
                                 WHERE `user_id = '{$userId}')";

    load_data($query, $mysqli);
}
