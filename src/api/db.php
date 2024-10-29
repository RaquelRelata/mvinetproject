<?php
// Database credentials
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'mvinetproject';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}
?>