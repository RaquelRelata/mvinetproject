<?php
error_log(print_r($_POST, true));
error_log(print_r($_FILES, true));
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173"); // Adjust this to your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

include_once 'db.php';
include 'sendEmail.php';


 // Ensure this file is correctly setting up your DB connection

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Determine required fields based on role
    if ($_POST['role'] === 'Incubatee') {
        $required_fields = ['first_name', 'last_name', 'gender', 'business_name', 'description', 'email', 'password', 'username', 'role'];
    } else if ($_POST['role'] === 'Investor') {
        $required_fields = ['organization_name', 'investment_focus', 'contact_info', 'email', 'password', 'username', 'role'];
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid role selected."]);
        exit();
    }

    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            echo json_encode(["status" => "error", "message" => "Missing required field: " . $field]);
            exit();
        }
    }

    try {
        // Collect form data
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $gender = $_POST['gender'];
        $business_name = $_POST['business_name'] ?? null; 
        $description = $_POST['description'] ?? null; // Required for Incubatee
        $organization_name = $_POST['organization_name'] ?? null; // Required for Investor
        $investment_focus = $_POST['investment_focus'] ?? null; // Required for Investor
        $contact_info = $_POST['contact_info'] ?? null; // Required for Investor
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $username = $_POST['username'];
        $role = $_POST['role'];
        $verified = 0; 
        

        // File paths
        $valid_id_file_path = null;
        $proposal_file_path = null;

        // Handle file uploads based on role
        if ($role === 'Investor' && isset($_FILES['valid_id_file']) && $_FILES['valid_id_file']['error'] == UPLOAD_ERR_OK) {
            $valid_id_file_tmp_path = $_FILES['valid_id_file']['tmp_name'];
            $valid_id_file_name = basename($_FILES['valid_id_file']['name']);
            $valid_id_file_path = 'uploads/' . uniqid() . '_' . $valid_id_file_name;

            if (!move_uploaded_file($valid_id_file_tmp_path, $valid_id_file_path)) {
                throw new Exception("Failed to upload valid ID.");
            }
        } elseif ($role === 'Incubatee' && isset($_FILES['proposal_file']) && $_FILES['proposal_file']['error'] == UPLOAD_ERR_OK) {
            $proposal_file_tmp_path = $_FILES['proposal_file']['tmp_name'];
            $proposal_file_name = basename($_FILES['proposal_file']['name']);
            $proposal_file_path = 'uploads/' . uniqid() . '_' . $proposal_file_name;

            if (!move_uploaded_file($proposal_file_tmp_path, $proposal_file_path)) {
                throw new Exception("Failed to upload proposal file.");
            }
        } else {
            echo json_encode(["status" => "error", "message" => "No valid file uploaded for your role."]);
            exit();
        }
        $verification_token = bin2hex(random_bytes(16));
        // Insert into Users table
        $stmt = $conn->prepare("INSERT INTO Users (username, email, password_hash, role,verification_token,verified) VALUES (?, ?, ?,?,?,?)");
        $stmt->bind_param("sssssi", $username, $email, $password, $role,$verification_token,$verified);
        sendVerificationEmail($email,$username,$verification_token);
        
        if ($stmt->execute()) {
            // Get the inserted user ID
            $userId = $stmt->insert_id;

            // Insert into the relevant table based on role
            if ($role === 'Investor' && $valid_id_file_path) {
                $stmtInvest = $conn->prepare("INSERT INTO Investors (user_id, organization_name, investment_focus, contact_info, status, valid_id_file_url) VALUES (?, ?, ?, ?, 'pending', ?)");
                $stmtInvest->bind_param("issss", $userId, $organization_name, $investment_focus, $contact_info, $valid_id_file_path);
                if (!$stmtInvest->execute()) {
                    echo json_encode(["status" => "error", "message" => "Error inserting into Investors: " . $stmtInvest->error]);
                    exit();
                }
                $stmtInvest->close();
            } elseif ($role === 'Incubatee' && $proposal_file_path) {
                $stmtIncub = $conn->prepare("INSERT INTO Incubatees (user_id, first_name, last_name, gender, business_name, description, status, proposal_file_url) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)");
                $stmtIncub->bind_param("issssss", $userId, $first_name, $last_name, $gender, $business_name, $description, $proposal_file_path);
                if (!$stmtIncub->execute()) {
                    echo json_encode(["status" => "error", "message" => "Error inserting into Incubatees: " . $stmtIncub->error]);
                    exit();
                }
                $stmtIncub->close();
            }
            
            echo json_encode(["status" => "success", "message" => "Registration successful!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error inserting into Users: " . $stmt->error]);
        }

        // Close statement
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Exception: " . htmlspecialchars($e->getMessage())]);
    }
}

// Close database connection
$conn->close();
?>