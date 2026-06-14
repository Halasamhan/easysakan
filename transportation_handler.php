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

if ($method === 'POST') {
    handle_create_order($conn);
} elseif ($method === 'GET') {
    handle_get_orders($conn);
} else {
    send_response(405, ['error' => 'Method not allowed']);
}

function handle_create_order($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        send_response(400, ['error' => 'Invalid JSON body']);
        return;
    }

    $required = ['package_name', 'total', 'date', 'time', 'pickup_location', 'dropoff_location', 'customer_id'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            send_response(400, ['error' => "Missing required field: $field"]);
            return;
        }
    }

    $package_name     = trim($data['package_name']);
    $services         = $data['services'] ?? [];
    $total            = (int) $data['total'];
    $date             = trim($data['date']);
    $time             = trim($data['time']);
    $pickup_location  = trim($data['pickup_location']);
    $dropoff_location = trim($data['dropoff_location']);
    $pickup_lat       = isset($data['pickup_lat'])  ? (float) $data['pickup_lat']  : null;
    $pickup_lng       = isset($data['pickup_lng'])  ? (float) $data['pickup_lng']  : null;
    $dropoff_lat      = isset($data['dropoff_lat']) ? (float) $data['dropoff_lat'] : null;
    $dropoff_lng      = isset($data['dropoff_lng']) ? (float) $data['dropoff_lng'] : null;
    $distance_km      = isset($data['distance_km']) ? (float) $data['distance_km'] : null;
    $notes            = isset($data['notes']) ? trim($data['notes']) : '';
    $customer_id      = (int) $data['customer_id'];

    if ($total <= 0) {
        send_response(400, ['error' => 'total must be a positive integer']);
        return;
    }

    // Validate customer exists
    $check = $conn->prepare("SELECT custID FROM customer WHERE custID = ?");
    if (!$check) {
        send_response(500, ['error' => 'DB error: ' . $conn->error]);
        return;
    }
    $check->bind_param("i", $customer_id);
    $check->execute();
    $check->store_result();
    if ($check->num_rows === 0) {
        send_response(404, ['error' => 'Customer not found']);
        return;
    }
    $check->close();

    // Build service string: package + any add-ons
    $addon_names = array_map(fn($s) => trim($s['name']), $services);
    $service_str = $package_name;
    if (!empty($addon_names)) {
        $service_str .= ' + ' . implode(', ', $addon_names);
    }

    // Store pickup/dropoff in notes field alongside coordinates and user notes
    $full_notes = "From: $pickup_location | To: $dropoff_location";
    if ($pickup_lat !== null && $pickup_lng !== null) {
        $full_notes .= " | pickup_coords: $pickup_lat,$pickup_lng";
    }
    if ($dropoff_lat !== null && $dropoff_lng !== null) {
        $full_notes .= " | dropoff_coords: $dropoff_lat,$dropoff_lng";
    }
    if ($distance_km !== null) {
        $full_notes .= " | distance_km: $distance_km";
    }
    if ($notes) {
        $full_notes .= " | $notes";
    }

    $stmt = $conn->prepare("
        INSERT INTO orders (total, order_type, services, booking_date, booking_time, notes, customer_id, stat)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    ");

    $order_type = 'Transportation';

    if (!$stmt) {
        // Fallback: base columns only
        $stmt = $conn->prepare("INSERT INTO orders (total, order_type, services, stat) VALUES (?, ?, ?, 'pending')");
        if (!$stmt) {
            send_response(500, ['error' => 'DB prepare failed: ' . $conn->error]);
            return;
        }
        $stmt->bind_param("iss", $total, $order_type, $service_str);
    } else {
        $stmt->bind_param("isssssi", $total, $order_type, $service_str, $date, $time, $full_notes, $customer_id);
    }

    if ($stmt->execute()) {
        $order_id = $conn->insert_id;
        send_response(201, [
            'success'          => true,
            'message'          => 'Transportation order created successfully',
            'order_id'         => $order_id,
            'package'          => $package_name,
            'total'            => $total,
            'date'             => $date,
            'time'             => $time,
            'pickup_location'  => $pickup_location,
            'dropoff_location' => $dropoff_location,
        ]);
    } else {
        send_response(500, ['error' => 'Failed to create order: ' . $stmt->error]);
    }

    $stmt->close();
}

function handle_get_orders($conn) {
    $customer_id = isset($_GET['customer_id']) ? (int) $_GET['customer_id'] : 0;

    if ($customer_id <= 0) {
        send_response(400, ['error' => 'Missing or invalid customer_id']);
        return;
    }

    $stmt = $conn->prepare("
        SELECT orderid, total, order_type, services, booking_date, booking_time, notes
        FROM orders
        WHERE customer_id = ? AND order_type = 'Transportation'
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

function send_response($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}
?>
