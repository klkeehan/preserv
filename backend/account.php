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
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080") {
        header("Access-Control-Allow-Origin: $http_origin");
        header("Access-Control-Allow-Credentials: true");
    }
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-Type: application/json; charset=UTF-8');
    
    $userId = $_SESSION['logged_in_user_id'];
    $method = $_SERVER['REQUEST_METHOD'];
?>
<?php 
    switch ($method) {

        case 'GET':
            $infoquery = "SELECT first_name, profile_photo, push_notifs, date_notifs, stock_notifs, add_notifs, remove_notifs, high_contrast FROM users WHERE id = $userId";
            $inforesult = $mysqli->query($infoquery);
            $userinfo = $inforesult->fetch_object();
            echo json_encode($userinfo);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents('php://input'));
            $field = $data->field;
            $value = $data->value;

            if (isset($data->isPassword) && $data->isPassword === true) {
                $value = md5($value);
            }

            $updatequery = "UPDATE users SET $field = '$value' WHERE id = $userId";

            $mysqli->query($updatequery);
            echo json_encode(["success" => true, "message" => "Notifcation updated"]);
        
        default:
            break;
    }
?>
<?php $mysqli->close(); ?>