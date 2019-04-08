<?php

require_once 'connection.php'; // подключаем скрипт
 
// подключаемся к серверу
$mysqli = new mysqli($host, $user, $password, $database);

// выполняем операции с базой данных
$myArray = array();

$query ="SELECT * FROM users";

$result = $mysqli->query($query) or die("Ошибка " . mysqli_error($link));

if ($result) {

    while($row = $result->fetch_assoc()) {

            $myArray[] = $row;

    }

    echo json_encode($myArray);

}

// закрываем подключение
$result->close();
$mysqli->close();

?>