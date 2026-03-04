<?php
  include('connect.php');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Content-Type: application/json; charset=UTF-8');

  $method = $_SERVER['REQUEST_METHOD'];
  session_start();

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
        $password = $data->password;
        $query = "INSERT INTO users (first_name, email, username, password) VALUES ('$name', '$email', '$username', '$password')";
        $mysqli->query($query);
        $_SESSION['logged_in_user'] = $username;
        $_SESSION['logged_in_name'] = $name;
        };
      $response = [
      'status' => 'success',
      'message' => 'user ' . $_SESSION['logged_in_user'] . ' has successfully created a profile'
      ];
      echo json_encode($response); 
      break;
  }

  $mysqli->close(); ?>