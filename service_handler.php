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

// ─── Allowed order_type values (matching ServicesPage.jsx categories) ─────────
$allowed_order_types = [
    'Plumbing',
    'Electrical',
    'Cleaning',
    'Landscaping',
    'Painting',
    'Maintenance'
];

// ─── Route by method ──────────────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    handle_create_order($conn, $allowed_order_types);
} elseif ($method === 'GET') {
    handle_get_orders($conn);
} else {
    send_response(405, ['error' => 'Method not allowed']);
}

// ─── CREATE ORDER ─────────────────────────────────────────────────────────────
function handle_create_order($conn, $allowed_order_types) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        send_response(400, ['error' => 'Invalid JSON body']);
        return;
    }

    // --- Validate required fields ---
    $required = ['order_type', 'services', 'total', 'date', 'time', 'customer_id'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            send_response(400, ['error' => "Missing required field: $field"]);
            return;
        }
    }

    $order_type     = trim($data['order_type']);
    $services       = $data['services'];      // array of {id, name, price}
    $total          = (int) $data['total'];
    $date           = trim($data['date']);
    $time           = trim($data['time']);
    $notes          = isset($data['notes']) ? trim($data['notes']) : '';
    $location_label = isset($data['location_label']) ? trim($data['location_label']) : '';
    $location_lat   = isset($data['location_lat'])   ? (float) $data['location_lat']   : null;
    $location_lng   = isset($data['location_lng'])   ? (float) $data['location_lng']   : null;
    $customer_id    = (int) $data['customer_id'];

    // Append location to notes if not already included
    if ($location_label !== '' && $notes === '') {
        $notes = $location_label;
    } elseif ($location_label !== '' && $notes !== $location_label) {
        $notes .= "\nLocation: $location_label";
    }

    // --- Validate order_type ---
    if (!in_array($order_type, $allowed_order_types)) {
        send_response(400, [
            'error'   => 'Invalid order_type',
            'allowed' => $allowed_order_types
        ]);
        return;
    }

    // --- Validate services is a non-empty array ---
    if (!is_array($services) || count($services) === 0) {
        send_response(400, ['error' => 'services must be a non-empty array']);
        return;
    }

    // --- Validate total is positive ---
    if ($total <= 0) {
        send_response(400, ['error' => 'total must be a positive integer']);
        return;
    }

    // --- Validate customer exists ---
    $check = $conn->prepare("SELECT custID FROM customer WHERE custID = ?");
    $check->bind_param("i", $customer_id);
    $check->execute();
    $check->store_result();
    if ($check->num_rows === 0) {
        send_response(404, ['error' => 'Customer not found']);
        return;
    }
    $check->close();

    // --- Build service string (comma-separated names) ---
    $service_names = array_map(fn($s) => trim($s['name']), $services);
    $service_str   = implode(', ', $service_names);

    // --- Insert into orders ---
    // Note: date, time, notes, customer_id stored in service_str / order_type
    // If your orders table has more columns, add them here.
    // Current schema: orderid, total, order_type, service
    // Extended insert includes booking_date, booking_time, notes, customer_id
    // — add those columns to your table if needed (see SQL below)

    $stmt = $conn->prepare("
        INSERT INTO orders (total, order_type, services, booking_date, booking_time, notes, customer_id, stat)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    ");

    if (!$stmt) {
        // Fallback: insert with only the 4 base columns if extras don't exist yet
        $stmt = $conn->prepare("
            INSERT INTO orders (total, order_type, services, stat)
            VALUES (?, ?, ?, 'pending')
        ");

        if (!$stmt) {
            send_response(500, ['error' => 'DB prepare failed: ' . $conn->error]);
            return;
        }

        $stmt->bind_param("iss", $total, $order_type, $service_str);
    } else {
        $stmt->bind_param("isssssi", $total, $order_type, $service_str, $date, $time, $notes, $customer_id);
    }

    if ($stmt->execute()) {
        $order_id = $conn->insert_id;
        send_response(201, [
            'success'    => true,
            'message'    => 'Order created successfully',
            'order_id'   => $order_id,
            'order_type' => $order_type,
            'services'   => $service_names,
            'total'      => $total,
            'date'       => $date,
            'time'       => $time
        ]);
    } else {
        send_response(500, ['error' => 'Failed to create order: ' . $stmt->error]);
    }

    $stmt->close();
}

// ─── GET ORDERS (for a specific customer) ─────────────────────────────────────
function handle_get_orders($conn) {
    $customer_id = isset($_GET['customer_id']) ? (int) $_GET['customer_id'] : 0;

    if ($customer_id <= 0) {
        send_response(400, ['error' => 'Missing or invalid customer_id']);
        return;
    }

    $stmt = $conn->prepare("
        SELECT orderid, total, order_type, services, booking_date, booking_time, notes, stat
        FROM orders
        WHERE customer_id = ? AND order_type != 'Transportation'
        ORDER BY orderid DESC
    ");

    if (!$stmt) {
        send_response(500, ['error' => 'DB prepare failed: ' . $conn->error]);
        return;
    }

    $stmt->bind_param("i", $customer_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    send_response(200, [
        'success' => true,
        'orders'  => $orders,
        'count'   => count($orders)
    ]);

    $stmt->close();
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function send_response($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}
