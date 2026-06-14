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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    handle_get_orders($conn);
} elseif ($method === 'POST') {
    handle_update_status($conn);
} else {
    send_response(405, ['error' => 'Method not allowed']);
}

function handle_get_orders($conn) {
    $stmt = $conn->prepare("
        SELECT o.orderid, o.total, o.services, o.booking_date, o.booking_time, o.notes, o.stat,
               c.fname, c.lname, c.phone, c.email
        FROM orders o
        LEFT JOIN customer c ON o.customer_id = c.custID
        WHERE o.order_type = 'Transportation'
        ORDER BY o.orderid DESC
    ");

    if (!$stmt) {
        send_response(500, ['error' => 'DB error: ' . $conn->error]);
        return;
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = [
            'id'            => $row['orderid'],
            'customer_name' => trim($row['fname'] . ' ' . $row['lname']),
            'phone'         => $row['phone'] ?? '',
            'email'         => $row['email'] ?? '',
            'package'       => $row['services'] ?? '',
            'move_date'     => $row['booking_date'] ?? '',
            'move_time'     => $row['booking_time'] ?? '',
            'notes'         => $row['notes'] ?? '',
            'total'         => $row['total'],
            'status'        => $row['stat'] ?? 'pending',
        ];
    }

    $stmt->close();
    send_response(200, ['success' => true, 'orders' => $orders]);
}

function handle_update_status($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || empty($data['order_id']) || empty($data['action'])) {
        send_response(400, ['error' => 'Missing order_id or action']);
        return;
    }

    $order_id = (int) $data['order_id'];
    $action   = $data['action'];

    if (!in_array($action, ['accept', 'deny'])) {
        send_response(400, ['error' => 'Invalid action. Use accept or deny']);
        return;
    }

    $status = $action === 'accept' ? 'accepted' : 'denied';

    $stmt = $conn->prepare("UPDATE orders SET stat = ? WHERE orderid = ? AND order_type = 'Transportation'");
    if (!$stmt) {
        send_response(500, ['error' => 'DB error: ' . $conn->error]);
        return;
    }

    $stmt->bind_param("si", $status, $order_id);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        send_response(200, ['success' => true, 'order_id' => $order_id, 'status' => $status]);
    } else {
        send_response(500, ['error' => 'Failed to update order or order not found']);
    }

    $stmt->close();
}

function send_response($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}
?>
