<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

include_once 'db.php'; // Ensure this file is correctly setting up your DB connection

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    $required_fields = ['firstName', 'lastName', 'email', 'university', 'password', 'gender'];
    
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) { // added trim to ensure no whitespace
            echo json_encode(["status" => "error", "message" => "Missing required field: " . $field]);
            exit();
        }
    }

    try {
        // Collect form data
        $firstName = trim($data['firstName']);
        $lastName = trim($data['lastName']);
        $gender = trim($data['gender']);
        $email = trim($data['email']);
        $university = trim($data['university']);
        $password = password_hash(trim($data['password']), PASSWORD_BCRYPT);
        $userType = 'TBI Admin'; // Fixed user type for TBI Admin

        // Insert into Users table
        $stmt = $conn->prepare("INSERT INTO Users (first_name, last_name, gender, university, email, password, user_type) VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->bind_param("sssssss", $firstName, $lastName, $gender, $university, $email, $password, $userType);

        if ($stmt->execute()) {
            // Get the last inserted user ID
            $userId = $stmt->insert_id;

            // Now insert into TBI_Admin table
            $permissions = null; // Define permissions if necessary, or set to null
            $role = 'TBI Admin'; // Fixed role for TBI Admin
            
            $stmtTBI = $conn->prepare("INSERT INTO TBI_Admin (user_id, permissions, role) VALUES (?, ?, ?)");
            $stmtTBI->bind_param("iss", $userId, $permissions, $role);

            if ($stmtTBI->execute()) {
                echo json_encode(["status" => "success", "message" => "Registration successful!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Error inserting into TBI_Admin: " . $stmtTBI->error]);
            }

            // Close TBI_Admin statement
            $stmtTBI->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Error inserting into Users: " . $stmt->error]);
        }

        // Close Users statement
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Exception: " . htmlspecialchars($e->getMessage())]);
    }
}

// Close database connection
$conn->close();
?>
