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

// ── Auth check ─────────────────────────────────────────────
$custID = $_SESSION['custID'] ?? null;
if (!$custID) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in!']);
    exit();
}

class SellerUnitsHandler {
    private $conn;
    private $custID;

    public function __construct($conn, $custID) {
        $this->conn   = $conn;
        $this->custID = $custID;
    }

    // ── Verify unit belongs to this seller ──────────────────
    private function ownsUnit($unitID) {
        $stmt = $this->conn->prepare(
            "SELECT u.*, s.nationalID, s.phone AS seller_phone
             FROM units u
             JOIN seller s ON s.unitID = u.unitID
             WHERE u.unitID = ? AND s.custID = ?
             LIMIT 1"
        );
        $stmt->bind_param("ii", $unitID, $this->custID);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    // ── GET: all units for this seller ──────────────────────
    public function getMyUnits() {
        $stmt = $this->conn->prepare(
            "SELECT u.*, s.nationalID, s.phone AS seller_phone
             FROM units u
             JOIN seller s ON s.unitID = u.unitID
             WHERE s.custID = ?
             ORDER BY u.unitID DESC"
        );
        $stmt->bind_param("i", $this->custID);
        $stmt->execute();
        $result = $stmt->get_result();

        $units = [];
        while ($row = $result->fetch_assoc()) {
            // Attach images
            $imgStmt = $this->conn->prepare(
                "SELECT imgID, image_path FROM unit_images WHERE unitID = ? ORDER BY imgID ASC"
            );
            $imgStmt->bind_param("i", $row['unitID']);
            $imgStmt->execute();
            $imgResult = $imgStmt->get_result();
            $images = [];
            while ($img = $imgResult->fetch_assoc()) {
                $images[] = $img;
            }
            $row['images'] = $images;
            $units[] = $row;
        }

        echo json_encode(['success' => true, 'units' => $units, 'total' => count($units)]);
    }

    // ── POST: add new unit ──────────────────────────────────
    public function addUnit($data, $files) {
        $name        = trim($data['title']       ?? '');
        $zone        = trim($data['location']    ?? '');
        $type        = trim($data['listingType'] ?? '');
        $price       = (int)($data['price']      ?? 0);
        $description = trim($data['description'] ?? '');
        $nationalID  = trim($data['nationalId']  ?? '');
        $phone       = trim($data['phone']       ?? '');
        $space       = isset($data['space']) ? (int)$data['space'] : null;

        if (!$name || !$zone || !$type || !$price || !$nationalID || !$phone) {
            echo json_encode(['success' => false, 'message' => 'All fields are required!']);
            return;
        }

        if (!preg_match('/^\d{14}$/', $nationalID)) {
            echo json_encode(['success' => false, 'message' => 'National ID must be exactly 14 digits!']);
            return;
        }

        if (!preg_match('/^01[0-2,5]\d{8}$/', $phone)) {
            echo json_encode(['success' => false, 'message' => 'Phone must be a valid Egyptian mobile number!']);
            return;
        }

        if ($price <= 0) {
            echo json_encode(['success' => false, 'message' => 'Price must be greater than 0!']);
            return;
        }

        // Handle cover image upload
        $cover_path = '';
        if (!empty($files['photo']) && $files['photo']['error'] === 0) {
            $allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!in_array($files['photo']['type'], $allowed_types)) {
                echo json_encode(['success' => false, 'message' => 'Only JPG, PNG, WEBP images allowed!']);
                return;
            }
            if (!is_dir('assets/uploads')) {
                mkdir('assets/uploads', 0777, true);
            }
            $image_name = time() . '_' . basename($files['photo']['name']);
            $cover_path = 'assets/uploads/' . $image_name;
            if (!move_uploaded_file($files['photo']['tmp_name'], $cover_path)) {
                echo json_encode(['success' => false, 'message' => 'Image upload failed!']);
                return;
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Cover image is required!']);
            return;
        }

        // Insert into units
        $stmt = $this->conn->prepare(
            "INSERT INTO units (name, zone, type, price, description, cover_image, space, stat)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'available')"
        );
        $stmt->bind_param("sssissi", $name, $zone, $type, $price, $description, $cover_path, $space);

        if (!$stmt->execute()) {
            echo json_encode(['success' => false, 'message' => 'Error inserting unit: ' . $this->conn->error]);
            return;
        }

        $unitID = $this->conn->insert_id;

        // Insert into seller
        $sellerStmt = $this->conn->prepare(
            "INSERT INTO seller (custID, unitID, nationalID, phone) VALUES (?, ?, ?, ?)"
        );
        $sellerStmt->bind_param("iisi", $this->custID, $unitID, $nationalID, $phone);

        if ($sellerStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Listing added successfully!', 'unitID' => $unitID]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error linking seller: ' . $this->conn->error]);
        }
    }

    // ── POST action=update_price: change price ──────────────
    public function updatePrice($unitID, $price) {
        if (!$unitID || $price <= 0) {
            echo json_encode(['success' => false, 'message' => 'Valid unit ID and price are required!']);
            return;
        }

        if (!$this->ownsUnit($unitID)) {
            echo json_encode(['success' => false, 'message' => 'Unit not found or does not belong to you!']);
            return;
        }

        $stmt = $this->conn->prepare("UPDATE units SET price = ? WHERE unitID = ?");
        $stmt->bind_param("ii", $price, $unitID);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Price updated successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update price: ' . $this->conn->error]);
        }
    }

    // ── POST action=mark_sold: set stat = 'sold' ────────────
    public function markSold($unitID) {
        if (!$unitID) {
            echo json_encode(['success' => false, 'message' => 'Unit ID is required!']);
            return;
        }

        if (!$this->ownsUnit($unitID)) {
            echo json_encode(['success' => false, 'message' => 'Unit not found or does not belong to you!']);
            return;
        }

        $stmt = $this->conn->prepare("UPDATE units SET stat = 'sold' WHERE unitID = ?");
        $stmt->bind_param("i", $unitID);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Unit marked as sold!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to mark as sold: ' . $this->conn->error]);
        }
    }

    // ── POST action=mark_available: revert to available ─────
    public function markAvailable($unitID) {
        if (!$unitID) {
            echo json_encode(['success' => false, 'message' => 'Unit ID is required!']);
            return;
        }

        if (!$this->ownsUnit($unitID)) {
            echo json_encode(['success' => false, 'message' => 'Unit not found or does not belong to you!']);
            return;
        }

        $stmt = $this->conn->prepare("UPDATE units SET stat = 'available' WHERE unitID = ?");
        $stmt->bind_param("i", $unitID);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Unit marked as available!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update status: ' . $this->conn->error]);
        }
    }

    // ── POST action=delete: remove unit ─────────────────────
    public function deleteUnit($unitID) {
        if (!$unitID) {
            echo json_encode(['success' => false, 'message' => 'Unit ID is required!']);
            return;
        }

        if (!$this->ownsUnit($unitID)) {
            echo json_encode(['success' => false, 'message' => 'Unit not found or does not belong to you!']);
            return;
        }

        // Delete images from DB (files on disk kept — remove manually if needed)
        $imgStmt = $this->conn->prepare("DELETE FROM unit_images WHERE unitID = ?");
        $imgStmt->bind_param("i", $unitID);
        $imgStmt->execute();

        // Remove seller link
        $selStmt = $this->conn->prepare("DELETE FROM seller WHERE unitID = ? AND custID = ?");
        $selStmt->bind_param("ii", $unitID, $this->custID);
        $selStmt->execute();

        // Delete unit
        $unitStmt = $this->conn->prepare("DELETE FROM units WHERE unitID = ?");
        $unitStmt->bind_param("i", $unitID);

        if ($unitStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Unit deleted successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete unit: ' . $this->conn->error]);
        }
    }
}

$handler = new SellerUnitsHandler($conn, $custID);
$method  = $_SERVER['REQUEST_METHOD'];
$action  = $_POST['action'] ?? $_GET['action'] ?? null;

// ── Route ──────────────────────────────────────────────────
if ($method === 'GET') {
    // GET → list all my units
    $handler->getMyUnits();

} elseif ($method === 'POST') {

    if (!$action) {
        // No action = add new listing (multipart form with file)
        $handler->addUnit($_POST, $_FILES);

    } elseif ($action === 'update_price') {
        $data   = json_decode(file_get_contents('php://input'), true);
        $unitID = (int)($data['unitID'] ?? 0);
        $price  = (int)($data['price']  ?? 0);
        $handler->updatePrice($unitID, $price);

    } elseif ($action === 'mark_sold') {
        $data   = json_decode(file_get_contents('php://input'), true);
        $unitID = (int)($data['unitID'] ?? 0);
        $handler->markSold($unitID);

    } elseif ($action === 'mark_available') {
        $data   = json_decode(file_get_contents('php://input'), true);
        $unitID = (int)($data['unitID'] ?? 0);
        $handler->markAvailable($unitID);

    } elseif ($action === 'delete') {
        $data   = json_decode(file_get_contents('php://input'), true);
        $unitID = (int)($data['unitID'] ?? 0);
        $handler->deleteUnit($unitID);

    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid action!']);
    }

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed!']);
}
?>