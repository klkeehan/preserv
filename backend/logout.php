<?php
  session_set_cookie_params([
      'lifetime' => 0,
      'path' => '/',
      'secure' => true,
      'httponly' => true,
      'samesite' => 'None'
  ]);
  $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080" || $http_origin == "https://preserv-one.vercel.app") {
        header("Access-Control-Allow-Origin: $http_origin");
        header("Access-Control-Allow-Credentials: true");
    }
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-Type: application/json; charset=UTF-8');
    
  session_start();

  if(isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
  };

  if(isset($_SESSION['logged_in_name'])) {
    unset($_SESSION['logged_in_name']);
  };

  if(isset($_SESSION['logged_in_household'])) {
    unset($_SESSION['logged_in_household']);
  };

  if(isset($_SESSION['logged_in_user_id'])) {
    unset($_SESSION['logged_in_user_id']);
  };

  $response = [
    'status' => 'success',
    'message' => 'user has logged out'
  ];
  echo json_encode($response);