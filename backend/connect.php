<?php
$mysqli = new mysqli("127.0.0.1", "syWCdQdRwM", "wsacrLpDPg", "dbsyWCdQdRwM");
  if ($mysqli->error) {
    print "Error connecting! Message:" . $mysqli->error;
  }