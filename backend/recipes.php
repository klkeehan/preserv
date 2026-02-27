<?php
  include('connect.php');
  header('Access-Control-Allow-Origin:*');

  $query = 'SELECT * FROM recipe';
  $result = $mysqli->query($query);
  $rows = array();
  while ($row = $result->fetch_assoc()) {$rows[] = $row;}
  echo json_encode($rows);

$mysqli->close(); ?>