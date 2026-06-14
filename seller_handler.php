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

class SellerHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function addListing($custID, $name, $zone, $type, $price, $space, $description, $phone, $cover_image, $extra_images = []) {

        if (!$name || !$zone || !$type || !$price || !$phone) {
            return ['success' => false, 'message' => 'All fields are required!'];
        }

        // Look up registration row (unitID IS NULL = pending first listing)
        $sel = $this->conn->prepare("SELECT nationalID FROM seller WHERE custID = ? AND unitID IS NULL LIMIT 1");
        $sel->bind_param("i", $custID);
        $sel->execute();
        $selRow = $sel->get_result()->fetch_assoc();
        $sel->close();

        // Also check if seller already has at least one listing (for additional listings)
        $hasListing = false;
        $nationalID = $selRow['nationalID'] ?? null;
        if (!$selRow) {
            $chk = $this->conn->prepare("SELECT nationalID FROM seller WHERE custID = ? AND unitID IS NOT NULL LIMIT 1");
            $chk->bind_param("i", $custID);
            $chk->execute();
            $chkRow = $chk->get_result()->fetch_assoc();
            $chk->close();
            $hasListing = (bool) $chkRow;
            if (!$hasListing) {
                return ['success' => false, 'message' => 'You must complete seller registration before listing.'];
            }
            $nationalID = $chkRow['nationalID'];
        }

        if (!preg_match('/^01[0125]\d{8}$/', $phone)) {
            return ['success' => false, 'message' => 'Phone must be a valid Egyptian mobile number!'];
        }

        if ($price <= 0) {
            return ['success' => false, 'message' => 'Price must be greater than 0!'];
        }

        if (!$cover_image || $cover_image['error'] !== 0) {
            return ['success' => false, 'message' => 'Cover image is required!'];
        }

        $allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!in_array($cover_image['type'], $allowed_types)) {
            return ['success' => false, 'message' => 'Only JPG, PNG, WEBP images allowed!'];
        }

        if (!is_dir('assets/uploads')) {
            mkdir('assets/uploads', 0777, true);
        }

        $image_name = time() . '_' . basename($cover_image['name']);
        $cover_path = 'assets/uploads/' . $image_name;

        if (!move_uploaded_file($cover_image['tmp_name'], $cover_path)) {
            return ['success' => false, 'message' => 'Image upload failed!'];
        }

        $stmt = $this->conn->prepare("INSERT INTO units (name, zone, type, price, description, cover_image, space) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            return ['success' => false, 'message' => 'DB error: ' . $this->conn->error];
        }
        $stmt->bind_param("sssissi", $name, $zone, $type, $price, $description, $cover_path, $space);

        if (!$stmt->execute()) {
            return ['success' => false, 'message' => 'Error saving listing: ' . $stmt->error];
        }

        $unitID = $this->conn->insert_id;

        if ($selRow) {
            // First listing: UPDATE the registration row (unitID IS NULL → unitID = new unit)
            $seller_stmt = $this->conn->prepare("UPDATE seller SET unitID = ?, phone = ? WHERE custID = ? AND unitID IS NULL LIMIT 1");
            if (!$seller_stmt) {
                return ['success' => false, 'message' => 'DB error: ' . $this->conn->error];
            }
            $seller_stmt->bind_param("isi", $unitID, $phone, $custID);
        } else {
            // Additional listing: INSERT a new row reusing the nationalID from registration
            $seller_stmt = $this->conn->prepare("INSERT INTO seller (custID, unitID, nationalID, phone) VALUES (?, ?, ?, ?)");
            if (!$seller_stmt) {
                return ['success' => false, 'message' => 'DB error: ' . $this->conn->error];
            }
            $seller_stmt->bind_param("iiss", $custID, $unitID, $nationalID, $phone);
        }

        if (!$seller_stmt->execute()) {
            return ['success' => false, 'message' => 'Error saving seller info: ' . $seller_stmt->error];
        }

        // Save extra images to unit_images
        $allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        $img_stmt = $this->conn->prepare("INSERT INTO unit_images (unitID, image_path) VALUES (?, ?)");
        $count = is_array($extra_images['name'] ?? null) ? count($extra_images['name']) : 0;
        for ($i = 0; $i < $count && $i < 10; $i++) {
            if ($extra_images['error'][$i] !== 0) continue;
            if (!in_array($extra_images['type'][$i], $allowed_types)) continue;
            $img_name = time() . '_' . $i . '_' . basename($extra_images['name'][$i]);
            $img_path = 'assets/uploads/' . $img_name;
            if (!move_uploaded_file($extra_images['tmp_name'][$i], $img_path)) continue;
            $img_stmt->bind_param("is", $unitID, $img_path);
            $img_stmt->execute();
        }

        return ['success' => true, 'message' => 'Listing published successfully!'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $custID = $_POST['custID'] ?? $_SESSION['custID'] ?? null;

        if (!$custID) {
            echo json_encode(['success' => false, 'message' => 'You must be logged in to add a listing!']);
            exit();
        }

        $custID = (int) $custID;

        $check = $conn->prepare("SELECT custID FROM customer WHERE custID = ?");
        if (!$check) {
            echo json_encode(['success' => false, 'message' => 'DB error: ' . $conn->error]);
            exit();
        }
        $check->bind_param("i", $custID);
        $check->execute();
        $check->store_result();
        if ($check->num_rows === 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid customer account!']);
            exit();
        }
        $check->close();

        $handler = new SellerHandler($conn);

        $result = $handler->addListing(
            $custID,
            $_POST['title']       ?? '',
            $_POST['location']    ?? '',
            $_POST['listingType'] ?? '',
            (int) ($_POST['price'] ?? 0),
            (int) ($_POST['space'] ?? 0),
            $_POST['description'] ?? '',
            $_POST['phone']       ?? '',
            $_FILES['photo']      ?? null,
            $_FILES['extra_photos'] ?? []
        );

        echo json_encode($result);
    } catch (Throwable $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>
