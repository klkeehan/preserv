<?php
  $mysqli = new mysqli("127.0.0.1", "syWCdQdRwM", "wsacrLpDPg", "dbsyWCdQdRwM");
    if ($mysqli->error) {
      print "Error connecting! Message:" . $mysqli->error;
    }

  $query = 'SELECT * FROM users';
  $result = $mysqli->query($query);
  if ($mysqli->error) {print 'Query failed: ' . $mysqli->error;}
  echo json_encode($result);

  /*
  $method = $_SERVER['REQUEST_METHOD'];
  $input = json_decode(file_get_contents('php://input'), true);

  switch ($method) {
    case 'GET':
      if (isset($_GET['username'])) {
        $username = $_GET['username'];
        $result = $mysqli->query('SELECT * FROM users WHERE username=$username');
        $data = $result->fetch_assoc();
        echo json_encode($data);
      } 
      else {
        $result = $mysqli->query('SELECT * FROM users WHERE username=$username');
        $users = [];
        while ($row = $result->fetch_assoc()) {$users[] = $row;}
        echo json_encode($users);
      }
      break;
  }
  */
?>

<!DOCTYPE html>
<html lang='en'>
  <body>
    <h1>hello</h1>
  </body>
</html>

<?php $mysqli->close(); ?>