<?php
include 'db.php';

$token = $_GET['verification_token'] ?? null;

if ($token) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE verification_token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Update user as verified
        $stmt = $conn->prepare("UPDATE users SET verified = 1, verification_token = NULL WHERE verification_token = ?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        echo 'Email verified successfully!';
    } else {
        echo 'Invalid Token';
    }
} else {
    echo 'No token provided';
}

$conn->close();
?>