<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email']) || !isset($input['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Email and password are required'
    ]);
    exit();
}

$email = $input['email'];
$password = $input['password'];

try {
    // For demo purposes: allow admin@easysakan.com with password admin123
    if ($email === 'admin@easysakan.com' && $password === 'admin123') {
        $token = bin2hex(random_bytes(32));
        
        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => 1,
                'name' => 'Administrator',
                'email' => 'admin@easysakan.com',
                'role' => 'admin'
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
