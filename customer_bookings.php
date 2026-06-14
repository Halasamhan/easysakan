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

if (!isset($_SESSION['custID'])) {
    send_response(401, ['success' => false, 'error' => 'Not logged in']);
}

$customer_id = (int) $_SESSION['custID'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data     = json_decode(file_get_contents('php://input'), true);
    $action   = $data['action']   ?? '';
    $order_id = (int) ($data['order_id'] ?? 0);

    if ($action === 'cancel' && $order_id > 0) {
        $stmt = $conn->prepare(
            "DELETE FROM orders WHERE orderid = ? AND customer_id = ? AND (stat = 'pending' OR stat IS NULL OR stat = '')"
        );
        $stmt->bind_param("ii", $order_id, $customer_id);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            send_response(200, ['success' => true]);
        } else {
            send_response(400, ['success' => false, 'error' => 'Order not found or not cancellable']);
        }
        $stmt->close();
    } else {
        send_response(400, ['success' => false, 'error' => 'Invalid request']);
    }
}

$stmt = $conn->prepare("
    SELECT orderid, order_type, services, booking_date, stat
    FROM orders
    WHERE customer_id = ?
    ORDER BY orderid DESC
");

if (!$stmt) {
    send_response(500, ['success' => false, 'error' => 'DB error: ' . $conn->error]);
}

$stmt->bind_param("i", $customer_id);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = [
        'id'            => $row['orderid'],
        'property_name' => $row['services'] ?? $row['order_type'],
        'date'          => $row['booking_date'] ?? '',
        'status'        => $row['stat'] ?? 'pending',
        'order_type'    => $row['order_type'],
    ];
}

$stmt->close();
send_response(200, ['success' => true, 'bookings' => $bookings]);

function send_response($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}
?>
