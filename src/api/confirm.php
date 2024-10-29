<?php
require 'db.php'; // Ensure you include your database connection

// Check if the token is set in the URL
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Prepare the SQL statement to update the user's confirmation status
    $sql = "UPDATE users SET is_confirmed = 1 WHERE verification_code = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);

    // Execute the statement
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        // Optionally, you can redirect the user to a success page
        header("Location: confirmation_success.html");
        exit; // Make sure to exit after redirection
    } else {
        // Handle the case where the token is invalid or user is already confirmed
        echo "Invalid or expired token.";
    }

    $stmt->close();
} else {
    echo "Token not provided.";
}

$conn->close();
?>
