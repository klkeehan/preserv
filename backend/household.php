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
    
    
?>
<?php 
    $userId = $_SESSION['logged_in_user_id'];
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        case 'GET':
            $gethouseholdidquery = "SELECT household_id FROM members WHERE user_id = $userId";
            $householdidgot = $mysqli->query($gethouseholdidquery);

            if ($householdidgot->num_rows === 0) {
            echo json_encode(["owner" => null, "members" => []]);
            break;
            }
            
            $householdId = $householdidgot->fetch_object()->household_id;

            $displaystuffquery = "SELECT users.id AS user_id, users.username AS name, users.profile_photo AS image, members.role 
            FROM members 
            JOIN users ON members.user_id = users.id 
            WHERE members.household_id = $householdId";

            $displaystuffresult = $mysqli->query($displaystuffquery);
            $owner = null;
            $members = [];

            while ($row = $displaystuffresult->fetch_object()) {
                if ($row->role === 'owner') {
                    $owner = $row;
                } else {
                    $members[] = $row;
                }
            }
            echo json_encode([
                "owner" => $owner,
                "members" => $members
            ]);
            break;

        case 'DELETE':
            $data = json_decode(file_get_contents('php://input'));

            if (!isset($data->user_id)) {
                echo json_encode(["success" => false, "error" => "No user_id received"]);
                exit;
            }
            $deleteUserId = $data->user_id;

            $deletequery = "DELETE FROM members WHERE user_id = $deleteUserId";
            $changehouseholdquery = "UPDATE users SET household = 0 WHERE id = $deleteUserId";

            if ($mysqli->query($deletequery) && $mysqli->query($changehouseholdquery)) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "error" => $mysqli->error]);
            }
            break;
        
        case 'POST':
            $inviteCode="";
            $codeflag = true;

            while($codeflag === true) {
                //Generate Code
                $inviteCode = rand(100000000, 999999999);
                $checkcodequery = "SELECT id FROM household WHERE invite_code ='$inviteCode'";
                $checkcoderesult = $mysqli->query($checkcodequery);

                if ($checkcoderesult->num_rows === 0) {
                    $codeflag = false;
                }
            }
            // Create Household
            $createhouseholdquery = "INSERT INTO household (id, invite_code) VALUES (NULL, '$inviteCode')";
            $mysqli->query($createhouseholdquery);
            // Grab new Id
            $gethouseholdidquery = "SELECT id FROM household WHERE invite_code = '$inviteCode'";
            $gethouseholdidresult = $mysqli->query($gethouseholdidquery);
            $householdId = $gethouseholdidresult->fetch_object()->id;
            // Insert into members table ALSO REPLACE WITH SESSION -----------------------------------------------------------------------
            $insertownerquery = "INSERT INTO members (id, household_id, user_id, role, pantry_access, shopping_access) VALUES (NULL, $householdId, $userId, 'owner', 'edit', 'edit')";
            $mysqli->query($insertownerquery);
            //REPLACE WITH SESSION -------------------------------------------------------------------------------------------------------
            $updatehouseholdflag = "UPDATE users SET household = 1 WHERE id = $userId";
            $mysqli->query($updatehouseholdflag);

            echo json_encode(["success" => true, "invite_code" => $inviteCode]);

            break;

        case 'PUT':
            $data = json_decode(file_get_contents('php://input'));
            $inviteCode = $data->invite_code;

            $checkcodequery = "SELECT id FROM household WHERE invite_code= '$inviteCode'";
            $checkcoderesult = $mysqli->query($checkcodequery);

            if ($checkcoderesult->num_rows === 0) {
                echo json_encode(["success" => false, "error" => "Invalid invite code"]);
                exit;
            }
            $gethouseholdidquery = "SELECT id FROM household WHERE invite_code = '$inviteCode'";
            $gethouseholdidresult = $mysqli->query($gethouseholdidquery);
            $householdId = $gethouseholdidresult->fetch_object()->id;

            //Update MEMBER
            $insertmemberquery = "INSERT INTO members (id, household_id, user_id, role, pantry_access, shopping_access) VALUES (NULL, $householdId, $userId, 'member', 'edit', 'edit')";
            $mysqli->query($insertmemberquery);
            // Update household status
            $updatehouseholdflag = "UPDATE users SET household = 1 WHERE id = $userId";
            $mysqli->query($updatehouseholdflag);

            echo json_encode(["success" => true]);
            break;

        default:
            break;
    }   
?>
<?php $mysqli->close(); ?>