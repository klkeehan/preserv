<?php
  header('Access-Control-Allow-Origin : *');
  $mysqli = new mysqli("127.0.0.1", "syWCdQdRwM", "wsacrLpDPg", "dbsyWCdQdRwM");
    if ($mysqli->error) {
      print 'Error connecting! Message:' . $mysqli->error;
    }
  
  $query = "SELECT * FROM pantry";
  $result = $mysqli->query($query);
  $rows = array();
  while ($row = $result->fetch_assoc()) {$rows[] = $row;}
  echo $rows;
  echo json_encode($rows);

$mysqli->close(); ?>