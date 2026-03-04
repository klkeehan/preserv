<?php
  include('connect.php');
  header('Access-Control-Allow-Origin:*');

  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
      // TODO: Add WHERE username = '$username' once sessions are implemented
      $query = 'SELECT * FROM recipe';
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'POST') {
      $recipeData = json_decode(file_get_contents('php://input'), true);
      $username = ($recipeData['username']);
      $name = ($recipeData['name']);
      $ingredients = ($recipeData['ingredients']);
      $instructions = ($recipeData['instructions']);
      $image = ($recipeData['image']);
      // TODO: ingredients need to be parsed/cleaned before insert
      //But this portion of the API is done
      // read into these: preg_split, array_map trim, array_filter, implode
      $query = "INSERT INTO recipe (username, name, ingredients, instructions, image) VALUES ('$username', '$name', '$ingredients', '$instructions', '$image')";
      $mysqli->query($query);
      $query = 'SELECT * FROM recipe';
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'PUT') {
      $recipeData = json_decode(file_get_contents('php://input'), true);
      // TODO: extract $id = intval($recipeData['id']); needed to identify which recipe to update... should be easy enough right?
      $username = ($recipeData['username']);
      $name = ($recipeData['name']);
      $ingredients = ($recipeData['ingredients']);
      $instructions = ($recipeData['instructions']);
      $image = ($recipeData['image']);
      // TODO: UPDATE query syntax is wrong - currently looks like INSERT
      // correct syntax to note for this from lecture notes: UPDATE recipe SET column1='value1', column2='value2' WHERE id = $id
      $query = "UPDATE INTO recipe (username, name, ingredients, instructions, image) VALUES ('$username', '$name', '$ingredients', '$instructions', '$image')";
      $mysqli->query($query);
      $query = 'SELECT * FROM recipe';
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);

  } elseif ($method === 'DELETE') {
      $recipeData = json_decode(file_get_contents('php://input'), true);
      $recipeId = intval($recipeData['id']);
      $query = 'DELETE FROM recipe WHERE id = ' . $recipeId;
      $mysqli->query($query);
      $query = 'SELECT * FROM recipe';
      $result = $mysqli->query($query);
      $rows = array();
      while ($row = $result->fetch_assoc()) {$rows[] = $row;}
      echo json_encode($rows);
  }

$mysqli->close(); ?>