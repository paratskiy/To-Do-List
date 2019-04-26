<?php
    
    require_once 'connection.php'; // подключаем скрипт

   // подключаемся к серверу
   $mysqli = new mysqli($host, $user, $password, $database);

   $mysqli->query('SET character_set_database = utf8'); 
   $mysqli->query("SET NAMES 'utf8'");

    error_reporting(E_ALL); 
    
    ini_set("display_errors", 1);
    
    session_start();//не забываем во всех файлах писать session_start

    $xml = file_get_contents('php://input');

    $data = json_decode($xml, true);
    
    if (isset($data['login']) && isset($data['password'])){

        //немного профильтруем логин
        $login = $mysqli->real_escape_string(htmlspecialchars($data['login']));
        
        //хешируем пароль т.к. в базе именно хеш
        $password = md5(trim($data['password']));
        
        // проверяем введенные данные
        $query = "SELECT `user_id`, `user_name`
                  FROM `users`
                  WHERE `user_name` = '$login' AND `password` = '$password'
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
            $response = ['user' => $_SESSION['user_name']];
            echo json_encode($response);
            exit(); 
        }
        else {
            //если пользователя нет, то пусть пробует еще
            $response = ['user' => false];
            echo json_encode($response);
            exit(); 
        }
    }
   
    // проверяем сессию, если она есть, то значит уже авторизовались
    if (isset($_SESSION['user_id'])){

        $response = ['user' => $_SESSION['user_name']];
        echo json_encode($response);
        // echo json_encode(htmlspecialchars($_SESSION['user_name']));
        
    } else {

        $login = '';
        
	    //проверяем куку, может он уже заходил сюда
	    if (isset($_COOKIE['CookieMy'])){
	    	$login = htmlspecialchars($_COOKIE['CookieMy']);
        }
        
    }
