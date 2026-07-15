<?php
// Prevent PHP from outputting errors as HTML
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/consultation-booking-errors.log');

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
    error_log("Consultation booking request received at: " . date('Y-m-d H:i:s'));
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
    $company = trim($data['company'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $focusArea = trim($data['focusArea'] ?? '');
    $message = trim($data['message'] ?? '');

    if (empty($name) || empty($email) || empty($focusArea)) {
        sendJsonResponse(false, 'Name, email, and focus area are required', 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(false, 'Invalid email format', 400);
    }

    // Team members to notify
    $teamEmails = [
        'astafa@finovasolutions.tech',
        'umar@finovasolutions.tech',
        'shmair@finovasolutions.tech',
        'info@finovasolutions.tech'  // Main contact email
    ];

    // Create notification email for the client
    $clientEmailSubject = "Your Free Consultation with Finova Solutions";
    $clientEmailBody = "
    <html>
    <head>
        <title>Consultation Booking Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2B8EBE 0%, #1E5B8D 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2B8EBE; }
            .footer { margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Consultation Booking Confirmation</h1>
            </div>
            <div class='content'>
                <p>Hi " . htmlspecialchars($name) . ",</p>
                
                <p>Thank you for booking a free consultation with Finova Solutions! We're excited to discuss your digital transformation journey.</p>
                
                <div class='info-box'>
                    <h3>Your Booking Details:</h3>
                    <p><strong>Focus Area:</strong> " . htmlspecialchars($focusArea) . "</p>
                    <p><strong>Session Duration:</strong> 60 minutes</p>
                    <p><strong>Next Steps:</strong> We'll send you a calendar link within 24 hours to select your preferred time</p>
                </div>
                
                <p>During your consultation, we'll:</p>
                <ul>
                    <li>Analyze your current challenges and opportunities</li>
                    <li>Recommend tailored technology solutions</li>
                    <li>Provide realistic timelines and cost estimates</li>
                    <li>Create a strategic roadmap for your project</li>
                </ul>
                
                <p>You can reach us at <strong>info@finovasolutions.tech</strong> if you have any questions in the meantime.</p>
                
                <p>Best regards,<br>The Finova Solutions Team</p>
                
                <div class='footer'>
                    <p>© 2024 Finova Solutions. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>";

    // Create notification email for the team
    $teamEmailSubject = "New Consultation Booking Request - " . htmlspecialchars($name);
    $teamEmailBody = "
    <html>
    <head>
        <title>New Consultation Booking</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2B8EBE 0%, #1E5B8D 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2B8EBE; }
            .action-box { background: #e8f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Consultation Booking</h1>
            </div>
            <div class='content'>
                <p>A new consultation request has been submitted:</p>
                
                <div class='info-box'>
                    <h3>Client Information:</h3>
                    <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
                    <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                    <p><strong>Company:</strong> " . (empty($company) ? 'Not provided' : htmlspecialchars($company)) . "</p>
                    <p><strong>Phone:</strong> " . (empty($phone) ? 'Not provided' : htmlspecialchars($phone)) . "</p>
                </div>
                
                <div class='info-box'>
                    <h3>Consultation Details:</h3>
                    <p><strong>Focus Area:</strong> " . htmlspecialchars($focusArea) . "</p>
                    <p><strong>Additional Message:</strong> " . (empty($message) ? 'None' : nl2br(htmlspecialchars($message))) . "</p>
                </div>
                
                <div class='action-box'>
                    <h3>Action Required:</h3>
                    <ol>
                        <li>Review the client's focus area and requirements</li>
                        <li>Send a calendar link to " . htmlspecialchars($email) . " with available time slots</li>
                        <li>Assign the consultation to the most suitable team member</li>
                    </ol>
                </div>
                
                <p><strong>Submitted at:</strong> " . date('F j, Y \a\t g:i A') . "</p>
                
                <div class='footer'>
                    <p>This is an automated notification from the Finova Solutions booking system.</p>
                </div>
            </div>
        </div>
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

    // Send email to client
    $clientMailResult = mail($email, $clientEmailSubject, $clientEmailBody, implode("\r\n", $headers));

    if (!$clientMailResult) {
        error_log("Failed to send client confirmation email");
        // Continue to send team notification even if client email fails
    } else {
        error_log("Client confirmation email sent successfully");
    }

    // Send notification emails to team members
    $teamHeaders = array(
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Finova Solutions <info@finovasolutions.tech>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion()
    );

    $teamMailResult = true;
    foreach ($teamEmails as $teamEmail) {
        $result = mail($teamEmail, $teamEmailSubject, $teamEmailBody, implode("\r\n", $teamHeaders));
        if (!$result) {
            error_log("Failed to send team notification email to " . $teamEmail);
            $teamMailResult = false;
        } else {
            error_log("Team notification email sent to " . $teamEmail);
        }
    }

    if ($clientMailResult) {
        error_log("Consultation booking processed successfully");
        sendJsonResponse(true, 'Consultation booking submitted successfully. Confirmation email sent.');
    } else {
        error_log("Booking submitted but email notification failed");
        sendJsonResponse(true, 'Consultation booking submitted. You will receive a confirmation email shortly.');
    }

} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    sendJsonResponse(false, 'Sorry, we could not process your consultation request. Please try again later.', 500);
}
?>
