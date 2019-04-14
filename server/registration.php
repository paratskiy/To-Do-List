<?php
    require_once 'connection.php'; // подключаем скрипт

    $mysqli = new mysqli($host, $user, $password, $database);
    
    $mysqli->query('SET character_set_database = utf8'); 
	$mysqli->query("SET NAMES 'utf8'");
	// error_reporting(E_ALL); 
	ini_set("display_errors", 1);
	if(isset($_POST['submit'])) {
	//проверяем, нет ли у нас пользователя с таким логином
	$result = $mysqli->query("SELECT COUNT(user_id) 
		FROM users WHERE 
        `user_name`='".$mysqli->real_escape_string($_POST['login'])."'");
        $row = $result->fetch_array(MYSQLI_NUM);
	if($row[0] > 0)  {
			$error = "Пользователь с таким логином уже есть";
	   }
			// Если нет, то добавляем нового пользователя
	  if(!isset($error) )   {
		$login = $mysqli->real_escape_string(trim(htmlspecialchars($_POST['login'])));
		// Убираем пробелы и хешируем пароль
		$password = md5(trim($_POST['password']));
		$mysqli->query("INSERT INTO users 
		SET `user_name`='".$login."', `password`='".$password."'");
		echo 'Вы успешно зарегистрировались с логином - '.$login;
		exit();
	}  else   {
	// если есть такой логин, то говорим об этом
		 echo $error;
		}
	}
?>