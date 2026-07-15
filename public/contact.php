<?php
// Prevent PHP from outputting errors as HTML
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/contact-form-errors.log');

// Set JSON content type and CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://finovasolutions.tech');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to send JSON response
function sendJsonResponse($success, $message, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

try {
    // Log the request
    error_log("Request received at: " . date('Y-m-d H:i:s'));
    error_log("Request method: " . $_SERVER['REQUEST_METHOD']);

    // Check request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(false, 'Method not allowed', 405);
    }

    // Get and validate JSON input
    $raw_input = file_get_contents('php://input');
    error_log("Raw input received: " . $raw_input);
    
    $data = json_decode($raw_input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendJsonResponse(false, 'Invalid JSON data: ' . json_last_error_msg(), 400);
    }

    // Validate required fields
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $subject = trim($data['subject'] ?? 'New Contact Form Submission');
    $message = trim($data['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        sendJsonResponse(false, 'Name, email, and message are required', 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(false, 'Invalid email format', 400);
    }

    // Set up email parameters
    $to = 'info@finovasolutions.tech';
    $email_subject = "Contact Form: $subject";
    
    // Create email body
    $email_body = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
    </body>
    </html>";

    // Set up email headers
    $headers = array(
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Finova Solutions <info@finovasolutions.tech>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion()
    );

    // Send the email
    $mail_result = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

    if ($mail_result) {
        error_log("Email sent successfully");
        sendJsonResponse(true, 'Thank you for your message! We will get back to you soon.');
    } else {
        error_log("Failed to send email");
        $error = error_get_last();
        if ($error) {
            error_log("Mail error: " . print_r($error, true));
        }
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    sendJsonResponse(false, 'Sorry, we could not send your message. Please try again later.', 500);
}
?> 