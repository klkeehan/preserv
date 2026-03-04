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

    //login
    case 'POST':
      if (!isset($_SESSION['username'])) {
        $data = json_decode(file_get_contents('php://input'));
        $username = strtolower($data->username);
        $password = md5($data->password);
        $query = 'SELECT * FROM users';
        $result = $mysqli->query($query);
        $rows = array();
        while ($row = $result->fetch_object()) {
          if (($username == ($row->username)) && (($password == $row->password))) {
            $_SESSION['logged_in_user'] = $row->username;
            $_SESSION['logged_in_name'] = $row->first_name;
            $_SESSION['logged_in_household'] = $row->household;
            echo json_encode('logging in...');
          };
        }; 
      };
      $response = [
      'status' => 'success',
      'message' => 'user ' . $_SESSION['logged_in_user'] . ' has successfully logged in'
      ];
      echo json_encode($response); 
      break;
  }

  $mysqli->close(); ?>