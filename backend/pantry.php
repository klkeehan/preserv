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
      $query = "SELECT * FROM pantry WHERE username='$mainpullUsername' ORDER BY item_status ASC";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);
      break;

    case 'POST':
      //HOUSEHOLD CHECK
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
      $data = json_decode(file_get_contents('php://input'));
      //$username = $_SESSION['logged_in_user'];
      $name = $data->name;
      $quantity = $data->quantity;
      $date_purchase = $data->date_purchase;
      $date_expire = $data->date_expire;
      $image = $data->image;
      $category = ucwords($data->category);
      $query = "INSERT INTO pantry (username, name, quantity, date_purchase, date_expire, image, category) VALUES ('$mainpullUsername', '$name', '$quantity', '$date_purchase', '$date_expire', '$image', '$category')";
      $mysqli->query($query);
      break;

    case 'PUT':
      $data = json_decode(file_get_contents('php://input'));
      $id = $data->id;
      $name = $data->name;
      $quantity = $data->quantity;
      $date_purchase = $data->date_purchase;
      $date_expire = $data->date_expire;
      $image = $data->image;
      $category = ucwords($data->category);
      $query = "UPDATE pantry SET name='$name', quantity='$quantity', date_purchase='$date_purchase', date_expire='$date_expire', image='$image', category='$category' WHERE id='$id'";
      $mysqli->query($query);
      break;

    case 'DELETE':
      $data = json_decode(file_get_contents('php://input'));
      $id = $data->id;
      $query = "DELETE FROM pantry WHERE id='$id'";
      $mysqli->query($query);
      break;

    default:
      break;
  };

$mysqli->close(); ?>