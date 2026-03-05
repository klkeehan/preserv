<?php
  session_start();
  include('connect.php');
  header('Access-Control-Allow-Origin:*');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Content-Type: application/json; charset=UTF-8');
  $username = $_SESSION['logged_in_user'];
  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
      $query = "SELECT * FROM shopping WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'POST') {
      $shoppingData = json_decode(file_get_contents('php://input'), true);
      $name = ($shoppingData['name']);
      $quantity = intval($shoppingData['quantity']);
      $query = "INSERT INTO shopping (username, name, quantity) VALUES ('$username', '$name', '$quantity')";
      $mysqli->query($query);
      $query = "SELECT * FROM shopping WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'DELETE') {
      $shoppingData = json_decode(file_get_contents('php://input'), true);
      //$shoppingId = intval($shoppingData['id']);
      $query = "DELETE FROM shopping WHERE username = '$username' AND checked = 1";
      $mysqli->query($query);
      $query = "SELECT * FROM shopping WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);
  } elseif ($method === 'PUT') {
        $shoppingData = json_decode(file_get_contents('php://input'), true);
        $shoppingStatus = intval($shoppingData['checked']);
        $shoppingId = intval($shoppingData['id']);
        $query = "UPDATE shopping SET checked=$shoppingStatus WHERE id=$shoppingId";
        $mysqli->query($query);
        $query = "SELECT * FROM shopping WHERE username = '$username'";
        $result = $mysqli->query($query);
        $rows = array();
        while ($row = $result->fetch_assoc()) {$rows[] = $row;}
        echo json_encode($rows);
  }

$mysqli->close(); ?>