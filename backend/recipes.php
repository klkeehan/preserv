<?php
    session_start();
    include('connect.php');
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080") {
        header("Access-Control-Allow-Origin: $http_origin");
        header("Access-Control-Allow-Credentials: true");
    }
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-Type: application/json; charset=UTF-8');

  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
      // TODO: Add WHERE username = '$username' once sessions are implemented - is it resolved? Almost, need the login page to work and begin using sessions for this to work as intended...
      $username = $_SESSION['logged_in_user'];
      $query = "SELECT * FROM recipe WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'POST') {
      $recipeData = json_decode(file_get_contents('php://input'), true);
      $name = ($recipeData['name']);
      $ingredients = ($recipeData['ingredients']);
      $instructions = ($recipeData['instructions']);
      $image = ($recipeData['image']);
      // TODO: ingredients need to be parsed/cleaned before insert
      //But this portion of the API is done
      // read into these: preg_split, array_map trim, array_filter, implode
      $query = "INSERT INTO recipe (username, name, ingredients, instructions, image) VALUES ('$username', '$name', '$ingredients', '$instructions', '$image')";
      $mysqli->query($query);
      $query = "SELECT * FROM recipe WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'PUT') {
      $recipeData = json_decode(file_get_contents('php://input'), true);
      $name = ($recipeData['name']);
      $ingredients = ($recipeData['ingredients']);
      $instructions = ($recipeData['instructions']);
      $image = ($recipeData['image']);
      $id = intval($recipeData['id']);
      $query = "UPDATE recipe SET name='$name',ingredients='$ingredients', instructions='$instructions', image='$image' WHERE id=$id";
      $mysqli->query($query);
      $query = "SELECT * FROM recipe WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'DELETE') {
      $recipeData = json_decode(file_get_contents('php://input'), true);
      $recipeId = intval($recipeData['id']);
      $query = 'DELETE FROM recipe WHERE id = ' . $recipeId;
      $mysqli->query($query);
      $query = "SELECT * FROM recipe WHERE username = '$username'";
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);
  }

$mysqli->close(); ?>