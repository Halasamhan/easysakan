<?php
ini_set('display_errors', 0);
error_reporting(0);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include "connection.php";
$conn = getconnection();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$data     = json_decode(file_get_contents("php://input"), true);
$email    = trim($data['email']    ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit();
}

$stmt = $conn->prepare("SELECT * FROM partners WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'No partner account found with that email.']);
    exit();
}

$partner = $result->fetch_assoc();

if (!password_verify($password, $partner['pass'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid password.']);
    exit();
}

$_SESSION['partnerID'] = $partner['partnerID'];
$_SESSION['fname']     = $partner['fname'];
$_SESSION['type']      = $partner['type'];

echo json_encode([
    'success'      => true,
    'fname'        => $partner['fname'],
    'partnerID'    => $partner['partnerID'],
    'type'         => $partner['type'],
    'service_type' => $partner['service_type'],
    'role'         => $partner['type'] === 'transport' ? 'provider' : 'service_provider',
]);
?>
