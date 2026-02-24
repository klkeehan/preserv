<?php
$server = getenv('DB_SERVER');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$name = getenv('DB_NAME');

$mysqli = new mysqli($server, $username, $password, $name);
  if ($mysqli->error) {
    print 'Error connecting! Message:' . $mysqli->error;
  }