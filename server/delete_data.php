<?php
session_start();
require_once 'function.php';
require_once 'connection.php'; // подключаем скрипт

// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

$userId = 1;

$xml = file_get_contents('php://input');

$data = json_decode($xml, true);

if($xml){

    if($data['element_name'] == 'project'){
        $query = "DELETE FROM `projects` WHERE `projects`.`id` = {$data['project_id']}";
        update_data($query, $mysqli);
    }
    
    if($data['element_name'] == 'task'){
        $query = "DELETE FROM `tasks` WHERE `tasks`.`id` = {$data['task_id']}";
        update_data($query, $mysqli);
    }
    

}