<?php
session_start();

require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

$xml = file_get_contents('php://input');

$data = json_decode($xml, true);

if ($xml) {

    if ($data['element_name'] == 'project') {
        $query = "UPDATE `projects` SET `project_name` = '{$data['project_name']}' WHERE `id` = '{$data['project_id']}'";
        update_data($query, $mysqli);
    }

    if ($data['element_name'] == 'task') {
        $query = "UPDATE `tasks` SET `task_name`= '{$data['task_name']}', `status` = '{$data['task_status']}' WHERE `id` = '{$data['task_id']}'";
        update_data($query, $mysqli);
    }
}
