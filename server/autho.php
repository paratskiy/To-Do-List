<?php
    
    require_once 'connection.php'; // подключаем скрипт

   // подключаемся к серверу
   $mysqli = new mysqli($host, $user, $password, $database);

   $mysqli->query('SET character_set_database = utf8'); 
   $mysqli->query("SET NAMES 'utf8'");
	error_reporting(E_ALL); 
	ini_set("display_errors", 1);
	session_start();//не забываем во всех файлах писать session_start
   if (isset($_POST['login']) && isset($_POST['password'])){
    //немного профильтруем логин
	$login = $mysqli->real_escape_string(htmlspecialchars($_POST['login']));
    //хешируем пароль т.к. в базе именно хеш
	$password = md5(trim($_POST['password']));
     // проверяем введенные данные
    $query = "SELECT `user_id`, `user_name`
            FROM users
            WHERE `user_name`= '$login' AND `password` = '$password'
            LIMIT 1";
    $result = $mysqli->query($query) or die("Ошибка " . $mysqli->error);
    // если такой пользователь есть
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
		//ставим метку в сессии 
		$_SESSION['user_id'] = $row['user_id'];
		$_SESSION['user_name'] = $row['user_name'];
		//ставим куки и время их хранения 10 дней
		setcookie("CookieMy", $row['user_name'], time()+60*60*24*10);
		
   }
    else {
        //если пользователя нет, то пусть пробует еще
		header("Location: index.html"); 
    }
   }
   //проверяем сессию, если она есть, то значит уже авторизовались
   if (isset($_SESSION['user_id'])){
	echo htmlspecialchars($_SESSION['user_name']);
   } else {
	$login = '';
	//проверяем куку, может он уже заходил сюда
	if (isset($_COOKIE['CookieMy'])){
		$login = htmlspecialchars($_COOKIE['CookieMy']);
	}

   }
?>