<?php
ini_set('display_errors', 0);
error_reporting(0);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'connection.php';
$conn = getconnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$data     = json_decode(file_get_contents('php://input'), true);
$email    = trim($data['email']    ?? '');
$password = $data['password']      ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit();
}

// Check customer table
$stmt = $conn->prepare("SELECT * FROM customer WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['pass'])) {
        $_SESSION['custID'] = $user['custID'];
        $_SESSION['fname']  = $user['fname'];
        echo json_encode([
            'success' => true,
            'fname'   => $user['fname'],
            'custID'  => $user['custID'],
            'role'    => 'customer',
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid password!']);
    }
    exit();
}

// Check partners table for transport providers
$stmt2 = $conn->prepare("SELECT * FROM partners WHERE email = ? AND type = 'transport'");
$stmt2->bind_param("s", $email);
$stmt2->execute();
$result2 = $stmt2->get_result();

if ($result2->num_rows > 0) {
    $partner = $result2->fetch_assoc();
    if (password_verify($password, $partner['pass'])) {
        $_SESSION['partnerID'] = $partner['partnerID'];
        $_SESSION['fname']     = $partner['fname'];
        echo json_encode([
            'success' => true,
            'fname'   => $partner['fname'],
            'custID'  => $partner['partnerID'],
            'role'    => 'provider',
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid password!']);
    }
    exit();
}

echo json_encode(['success' => false, 'message' => 'No account found with that email!']);
