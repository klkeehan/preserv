<?php
    session_start();
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080") {
        header("Access-Control-Allow-Origin: $http_origin");
        header("Access-Control-Allow-Credentials: true");
    }
    header('Content-Type: application/json; charset=UTF-8');
    
    if (isset($_SESSION['logged_in_user_id'])) {
        echo json_encode([
            "user_id" => $_SESSION['logged_in_user_id'],
            "username" => $_SESSION['logged_in_user'],
            "in_household" => $_SESSION['logged_in_household']
        ]);
    } else {
        echo json_encode(["user_id" => null]);
    }
?>