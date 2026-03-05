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
    //done
    case 'GET':
      $query = 'SELECT * FROM pantry ORDER BY item_status ASC';
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);
      break;

    //wip  
    case 'POST':
      $data = json_decode(file_get_contents('php://input'));
      //placeholder
      $username = $_SESSION['logged_in_user'];
      $name = $data->name;
      $quantity = $data->quantity;
      $date_purchase = $data->date_purchase;
      $date_expire = $data->date_expire;
      $image = $data->image;
      $category = ucwords($data->category);
      $response = [
        'status' => 'success',
        'message' => 'the item is ' . $name . ' from pantry added by user ' . $username
      ];
      echo json_encode($response);
      $query = "INSERT INTO pantry (username, name, quantity, date_purchase, date_expire, category) VALUES ('$username', '$name', '$quantity', '$date_purchase', '$date_expire', '$category')";
      $mysqli->query($query);
      break;

    //wip - image not done
    case 'PUT':
      $data = json_decode(file_get_contents('php://input'));
      $id = $data->id;
      $name = $data->name;
      $quantity = $data->quantity;
      $date_purchase = $data->date_purchase;
      $date_expire = $data->date_expire;
      $image = $data->image;
      $category = ucwords($data->category);
      $response = [
        'status' => 'success',
        'message' => 'the item is ' . $name . ' at id ' . $id . ' from pantry. Info: ' . $category
      ];
      echo json_encode($response);
      $query = "UPDATE pantry SET name='$name', quantity='$quantity', date_purchase='$date_purchase', date_expire='$date_expire', category='$category' WHERE id='$id'";
      $mysqli->query($query);
      break;

    //wip
    case 'DELETE':
      $data = json_decode(file_get_contents('php://input'));
      $id = $data->id;
      $response = [
        'status' => 'success',
        'message' => 'the item at id ' . $id . ' has been deleted'
      ];
      echo json_encode($response);
      $query = "DELETE FROM pantry WHERE id='$id'";
      $mysqli->query($query);
      break;

    default:
      break;
  }

$mysqli->close(); ?>