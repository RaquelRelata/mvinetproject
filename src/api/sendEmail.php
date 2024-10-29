<?php
require '../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Email function
function sendVerificationEmail($email, $username, $token) {
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 2; // Increased debugging level
        $mail->Username = 'callmedaddymarie@gmail.com'; 
        $mail->Password = 'mvnrntzaoumhbtmx'; 
        $mail->SMTPSecure = 'tls'; // Changed to string
        $mail->Port = 587;
        $mail->setFrom('callmedaddymarie@gmail.com', 'MVINET');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification';
        $verificationLink = "http://localhost/mvinetproject/src/api/verify.php?verification_token=$token";

        // Email body
        $mail->Body = "Hello $username,<br><br>Click the link to verify your email: <a href='$verificationLink'>Verify Email</a><br><br>Thank you!";
        
        // Send the email
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email could not be sent. Error: {$mail->ErrorInfo}");
        return false;
    }
}
?>
