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

include 'connection.php';
$conn = getconnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON body']);
    exit();
}

$fname        = trim($data['fname']        ?? '');
$lname        = trim($data['lname']        ?? '');
$email        = trim($data['email']        ?? '');
$cname        = trim($data['cname']        ?? '');
$location     = trim($data['location']     ?? '');
$nationalID   = trim($data['nationalID']   ?? '');
$phone        = trim($data['phone']        ?? '');
$type         = trim($data['type']         ?? '');
$service_type = trim($data['service_type'] ?? '');
$pass         = $data['pass']              ?? '';
$confirm      = $data['confirmPassword']   ?? '';

if (!$fname || !$lname || !$email || !$pass || !$type || !$location) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit();
}

if ($pass !== $confirm) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
    exit();
}

if (strlen($pass) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters.']);
    exit();
}

if (!in_array($type, ['transport', 'service'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid partner type.']);
    exit();
}

if (strlen($nationalID) !== 14) {
    echo json_encode(['success' => false, 'message' => 'National ID must be exactly 14 digits.']);
    exit();
}

$check = $conn->prepare("SELECT partnerID FROM partners WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered as a partner.']);
    exit();
}
$check->close();

$hashed = password_hash($pass, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO partners (fname, lname, email, cname, location, nationalID, phone, type, service_type, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssss", $fname, $lname, $email, $cname, $location, $nationalID, $phone, $type, $service_type, $hashed);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Partner account created successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}
$stmt->close();
?>
