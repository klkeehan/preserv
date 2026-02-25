<?php
  $server = getenv('DB_SERVER');
  $username = getenv('DB_USERNAME');
  $password = getenv('DB_PASSWORD');
  $name = getenv('DB_NAME');

  $mysqli = new mysqli("127.0.0.1", "syWCdQdRwM", "wsacrLpDPg", "dbsyWCdQdRwM");
    if ($mysqli->error) {
      print 'Error connecting! Message:' . $mysqli->error;
    }