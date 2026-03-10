<?php
  session_start();
  include('connect.php');
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080" || $http_origin == "https://preserv-one.vercel.app") {
      header("Access-Control-Allow-Origin: $http_origin");
      header("Access-Control-Allow-Credentials: true");
    } else {
      echo 'something went wrong :(';
    }
  };
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
  header('Content-Type: application/json; charset=UTF-8');

  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
    $username = $_SESSION['logged_in_user'];
    $query = "SELECT * FROM shopping WHERE username = '$username'";
    $result = $mysqli->query($query);
    $rows = array();
    while ($row = $result->fetch_assoc()) {$rows[] = $row;}
    echo json_encode($rows);

  } elseif ($method === 'POST') {
    $shoppingData = json_decode(file_get_contents('php://input'), true);
    $username = $_SESSION['logged_in_user'];
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
    $data = json_decode(file_get_contents('php://input'), true);
    $ids = $data['ids'];
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $query = "DELETE FROM shopping WHERE id IN ($placeholders)";
    $query2 = $mysqli->prepare($query);
    $types = str_repeat('i', count($ids));
    $query2->bind_param($types, ...$ids);
    $query2->execute();
    $response = [
      'status' => 'success'
    ];
    echo json_encode($response);
  }

$mysqli->close(); ?>