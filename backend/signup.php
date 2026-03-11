<?php
  session_set_cookie_params([
      'lifetime' => 0,
      'path' => '/',
      'secure' => true,
      'httponly' => true,
      'samesite' => 'None'
  ]);
  session_start();
  include('connect.php');
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080" || $http_origin == "https://preserv-one.vercel.app") {
      header("Access-Control-Allow-Origin: $http_origin");
      header("Access-Control-Allow-Credentials: true");
    } else {
      header("Access-Control-Allow-Origin: $http_origin");
      header("Access-Control-Allow-Credentials: true");
    }
  }
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
  header('Content-Type: application/json; charset=UTF-8');

  $method = $_SERVER['REQUEST_METHOD'];

  switch ($method) {
    case 'GET':
      $query = 'SELECT * FROM users';
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);
      break;

    //signup
    case 'POST':
      if (!isset($_SESSION['username'])) {
        $data = json_decode(file_get_contents('php://input'));
        $name = ucwords($data->name);
        $email = $data->email;
        $username = strtolower($data->username);
        $password = md5($data->password);
        $query = "INSERT INTO users (first_name, email, username, password) VALUES ('$name', '$email', '$username', '$password')";
        $mysqli->query($query);

        //grab new user Id and household status
        $grabnewuserquery = "SELECT id, household FROM users WHERE username ='$username'";
        $grabnewuserresult = $mysqli->query($grabnewuserquery);
        $newuser = $grabnewuserresult->fetch_object();

        $_SESSION['logged_in_user'] = $username;
        $_SESSION['logged_in_name'] = $name;
        $_SESSION['logged_in_user_id'] = $newuser->id;
        $_SESSION['logged_in_household'] = $newuser->household;
        };
      $response = [
      'status' => 'success',
      'message' => 'user ' . $_SESSION['logged_in_user'] . ' has successfully created a profile'
      ];
      echo json_encode($response); 
      break;
  }

  $mysqli->close(); ?>