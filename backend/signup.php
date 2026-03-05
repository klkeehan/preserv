<?php
  session_start();

  include('connect.php');
  header('Cache-Control: public');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Access-Control-Allow-Credentials: true');
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