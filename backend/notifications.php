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
if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:8080" || $http_origin == "https://preserv-one.vercel.app") {
    header("Access-Control-Allow-Origin: $http_origin");
    header("Access-Control-Allow-Credentials: true");
}
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

$username = $_SESSION['logged_in_user'];
$inHousehold = $_SESSION['logged_in_household'];

// Grab the notification from quiznos subs
$notificationquery = "SELECT push_notifs, date_notifs, stock_notifs, add_notifs, remove_notifs FROM users WHERE username = '$username'";
$notificationresult = $mysqli->query($notificationquery);
$notifs = $notificationresult->fetch_object();

// NO NOTIS THEN LEAVE!!!!!!!!!
if ($notifs->push_notifs == 0) {
    echo json_encode([]);
    exit;
}

// grab household owner to display one pantry data
if ($inHousehold == 1) {
    $userId = $_SESSION['logged_in_user_id'];
    
    $householdIdquery = "SELECT household_id FROM members WHERE user_id = $userId";
    $householdIdresult = $mysqli->query($householdIdquery);
    $householdId = $householdIdresult->fetch_object()->household_id;

    $ownerquery = "SELECT users.username 
        FROM members 
        JOIN users ON members.user_id = users.id 
        WHERE members.household_id = $householdId 
        AND members.role = 'owner'";
    $ownerresult = $mysqli->query($ownerquery);
    $mainpullUsername = $ownerresult->fetch_object()->username;
} else {
    $mainpullUsername = $username;
}

// Check for expiring items put in da array
$expiringItems = [];
if ($notifs->date_notifs == 1) {
    $today = date('Y-m-d');
    $threeDaysinDaFuture = date('Y-m-d', strtotime('+3 days'));
    $expiringquery = "SELECT name FROM pantry WHERE username = '$mainpullUsername' AND date_expire BETWEEN '$today' AND '$threeDaysinDaFuture'";
    $expiringresult = $mysqli->query($expiringquery);
    while ($row = $expiringresult->fetch_object()) {
        $expiringItems[] = $row->name;
    }
}

// Same as above but for Low stock 
$lowStockItems = [];
if ($notifs->stock_notifs == 1) {
    $lowstockquery = "SELECT name FROM pantry WHERE username = '$mainpullUsername' AND quantity <= 1";
    $lowstockresult = $mysqli->query($lowstockquery);
    while ($row = $lowstockresult->fetch_object()) {
        $lowStockItems[] = $row->name;
    }
}

// Probably need new columns in the DB for this to work better
$shoppingAddItems = [];
if ($notifs->add_notifs == 1) {
    $shoppingaddquery = "SELECT name FROM shopping WHERE username = '$mainpullUsername' AND checked = 0";
    $shoppingaddresult = $mysqli->query($shoppingaddquery);
    while ($row = $shoppingaddresult->fetch_object()) {
        $shoppingAddItems[] = $row->name;
    }
}

// Same as above ^^^^^^^^^^^^^ I paid 3.74 for gas today honestly a tragedy
$shoppingRemoveItems = [];
if ($notifs->remove_notifs == 1) {
    $shoppingremovequery = "SELECT name FROM shopping WHERE username = '$mainpullUsername' AND checked = 1";
    $shoppingremoveresult = $mysqli->query($shoppingremovequery);
    while ($row = $shoppingremoveresult->fetch_object()) {
        $shoppingRemoveItems[] = $row->name;
    }
}

echo json_encode([
    "expiring" => $expiringItems,
    "low_stock" => $lowStockItems,
    "shopping_added" => $shoppingAddItems,
    "shopping_purchased" => $shoppingRemoveItems
]);

$mysqli->close();
?>