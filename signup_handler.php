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
$fname    = trim($data['fname']           ?? '');
$lname    = trim($data['lname']           ?? '');
$email    = trim($data['email']           ?? '');
$pass     = $data['pass']                 ?? '';
$confirm  = $data['confirmPassword']      ?? '';
$location = trim($data['location']        ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format!']);
    exit();
}

if ($pass !== $confirm) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match!']);
    exit();
}

if (strlen($pass) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters!']);
    exit();
}

$check = $conn->prepare("SELECT custID FROM customer WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered!']);
    exit();
}
$check->close();

$hashed = password_hash($pass, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO customer (fname, lname, email, pass, location) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $fname, $lname, $email, $hashed, $location);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}
