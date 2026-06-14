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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    handle_check($conn);
} elseif ($method === 'POST') {
    handle_register($conn);
} else {
    send_json(405, ['success' => false, 'message' => 'Method not allowed']);
}

// ── GET: check whether a customer is already a seller ──────────────────────────
function handle_check($conn) {
    $cust_id = isset($_GET['cust_id']) ? (int) $_GET['cust_id'] : 0;

    if (!$cust_id) {
        send_json(400, ['success' => false, 'is_seller' => false, 'message' => 'Missing cust_id']);
        return;
    }

    $stmt = $conn->prepare("SELECT custID FROM seller WHERE custID = ? LIMIT 1");
    $stmt->bind_param("i", $cust_id);
    $stmt->execute();
    $stmt->store_result();
    $is_seller = $stmt->num_rows > 0;
    $stmt->close();

    send_json(200, ['success' => true, 'is_seller' => $is_seller]);
}

// ── POST: register a customer as a seller ──────────────────────────────────────
function handle_register($conn) {
    $cust_id    = (int)  ($_POST['cust_id']    ?? 0);
    $nationalID = trim(   $_POST['national_id'] ?? '');
    $phone      = trim(   $_POST['phone']       ?? '');

    if (!$cust_id || !$nationalID) {
        send_json(400, ['success' => false, 'message' => 'Customer ID and national ID are required.']);
        return;
    }

    if (strlen($nationalID) !== 14 || !ctype_digit($nationalID)) {
        send_json(400, ['success' => false, 'message' => 'National ID must be exactly 14 digits.']);
        return;
    }

    // Confirm customer exists
    $check = $conn->prepare("SELECT custID FROM customer WHERE custID = ?");
    $check->bind_param("i", $cust_id);
    $check->execute();
    $check->store_result();
    if ($check->num_rows === 0) {
        send_json(404, ['success' => false, 'message' => 'Customer not found.']);
        return;
    }
    $check->close();

    // Already registered → return success silently
    $dup = $conn->prepare("SELECT custID FROM seller WHERE custID = ? LIMIT 1");
    $dup->bind_param("i", $cust_id);
    $dup->execute();
    $dup->store_result();
    if ($dup->num_rows > 0) {
        send_json(200, ['success' => true, 'message' => 'Already registered as a seller.']);
        return;
    }
    $dup->close();

    // Save national ID image if provided
    if (!empty($_FILES['natid_image']) && $_FILES['natid_image']['error'] === UPLOAD_ERR_OK) {
        $allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
        $file    = $_FILES['natid_image'];

        if (!in_array($file['type'], $allowed)) {
            send_json(400, ['success' => false, 'message' => 'Only JPG, PNG, WEBP, or PDF files are allowed.']);
            return;
        }

        if (!is_dir('assets/uploads')) {
            mkdir('assets/uploads', 0777, true);
        }

        $filename = time() . "_natid_{$file['name']}";
        $savePath = 'assets/uploads/' . $filename;

        if (!move_uploaded_file($file['tmp_name'], $savePath)) {
            send_json(500, ['success' => false, 'message' => 'Failed to save ID image.']);
            return;
        }
    }

    // Insert seller registration row (unitID NULL = no listing yet)
    $stmt = $conn->prepare("INSERT INTO seller (custID, unitID, nationalID, phone) VALUES (?, NULL, ?, ?)");
    $stmt->bind_param("iss", $cust_id, $nationalID, $phone);

    if ($stmt->execute()) {
        send_json(200, ['success' => true, 'message' => 'Seller registration submitted successfully.']);
    } else {
        send_json(500, ['success' => false, 'message' => "Database error: {$conn->error}"]);
    }
    $stmt->close();
}

function send_json($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}
