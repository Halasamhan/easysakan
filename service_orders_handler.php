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

if (!isset($_SESSION['partnerID'])) {
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

$partnerID = (int) $_SESSION['partnerID'];

$pStmt = $conn->prepare("SELECT service_type, type FROM partners WHERE partnerID = ?");
$pStmt->bind_param("i", $partnerID);
$pStmt->execute();
$partner = $pStmt->get_result()->fetch_assoc();
$pStmt->close();

if (!$partner) {
    echo json_encode(['success' => false, 'error' => 'Partner not found']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $serviceType = $partner['service_type'];

    $stmt = $conn->prepare("
        SELECT o.orderid, o.total, o.order_type, o.services,
               o.booking_date, o.booking_time, o.notes, o.stat,
               c.fname AS customer_name, c.phone AS customer_phone
        FROM orders o
        LEFT JOIN customer c ON o.customer_id = c.custID
        WHERE o.order_type = ?
        ORDER BY o.orderid DESC
    ");
    $stmt->bind_param("s", $serviceType);
    $stmt->execute();
    $result = $stmt->get_result();

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    $stmt->close();

    echo json_encode([
        'success'      => true,
        'orders'       => $orders,
        'service_type' => $serviceType,
    ]);

} elseif ($method === 'POST') {
    $data    = json_decode(file_get_contents('php://input'), true);
    $orderId = (int) ($data['order_id'] ?? 0);
    $action  = trim($data['action'] ?? '');

    if (!$orderId) {
        echo json_encode(['success' => false, 'error' => 'Missing order_id']);
        exit();
    }

    if ($action === 'accept') {
        $stmt = $conn->prepare("UPDATE orders SET stat = 'accepted' WHERE orderid = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['success' => true, 'status' => 'accepted']);

    } elseif ($action === 'deny') {
        $stmt = $conn->prepare("UPDATE orders SET stat = 'denied' WHERE orderid = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['success' => true, 'status' => 'denied']);

    } elseif ($action === 'update_price') {
        $newPrice = (int) ($data['new_price'] ?? 0);
        if ($newPrice <= 0) {
            echo json_encode(['success' => false, 'error' => 'Price must be greater than 0']);
            exit();
        }
        $stmt = $conn->prepare("UPDATE orders SET total = ? WHERE orderid = ? AND stat = 'accepted'");
        $stmt->bind_param("ii", $newPrice, $orderId);
        $stmt->execute();
        $affected = $stmt->affected_rows;
        $stmt->close();

        if ($affected > 0) {
            echo json_encode(['success' => true, 'new_price' => $newPrice]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Order not found or not in accepted state']);
        }

    } else {
        echo json_encode(['success' => false, 'error' => 'Unknown action']);
    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
