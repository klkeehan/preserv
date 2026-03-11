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
      echo 'something went wrong :(';
    }
  };
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
  header('Content-Type: application/json; charset=UTF-8');

  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
    //Household CHECK
      $username = $_SESSION['logged_in_user'];
      $inHousehold = $_SESSION['logged_in_household'];
      $userId = $_SESSION['logged_in_user_id'];
       if ($inHousehold == 1) {
          $householdIdquery = "SELECT household_id FROM members WHERE user_id = $userId";
          $householdIdresult = $mysqli->query($householdIdquery);
          $householdId = $householdIdresult->fetch_object()->household_id;

          $ownerquery = "SELECT users.username 
              FROM members 
              JOIN users ON members.user_id = users.id 
              WHERE members.household_id = $householdId 
              AND members.role = 'owner'";
          $ownerresult = $mysqli->query($ownerquery);
          $mainpullUsername = $ownerresult->fetch_object()->username;
      } else {
          $mainpullUsername = $username;
      }
    //$username = $_SESSION['logged_in_user'];
    $query = "SELECT * FROM shopping WHERE username = '$mainpullUsername'";
    $result = $mysqli->query($query);
    $rows = array();
    while ($row = $result->fetch_assoc()) {$rows[] = $row;}
    echo json_encode($rows);

  } elseif ($method === 'POST') {
    $shoppingData = json_decode(file_get_contents('php://input'), true);
    //Household CHECK
      $username = $_SESSION['logged_in_user'];
      $inHousehold = $_SESSION['logged_in_household'];
      $userId = $_SESSION['logged_in_user_id'];
       if ($inHousehold == 1) {
          $householdIdquery = "SELECT household_id FROM members WHERE user_id = $userId";
          $householdIdresult = $mysqli->query($householdIdquery);
          $householdId = $householdIdresult->fetch_object()->household_id;

          $ownerquery = "SELECT users.username 
              FROM members 
              JOIN users ON members.user_id = users.id 
              WHERE members.household_id = $householdId 
              AND members.role = 'owner'";
          $ownerresult = $mysqli->query($ownerquery);
          $mainpullUsername = $ownerresult->fetch_object()->username;
      } else {
          $mainpullUsername = $username;
      }
    //$username = $_SESSION['logged_in_user'];
    $name = ($shoppingData['name']);
    $quantity = intval($shoppingData['quantity']);
    $query = "INSERT INTO shopping (username, name, quantity) VALUES ('$mainpullUsername', '$name', '$quantity')";
    $mysqli->query($query);
    $query = "SELECT * FROM shopping WHERE username = '$mainpullUsername'";
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