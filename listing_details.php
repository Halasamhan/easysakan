<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                    http_response_code(204);
    exit();
}

header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();

class ListingDetailsHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getUnitById($id) {
        // Get unit details
        $stmt = $this->conn->prepare("SELECT * FROM units WHERE unitID = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $unit = $result->fetch_assoc();
        $stmt->close();

        if (!$unit) return null;

        // Get all images for this unit
        $stmt2 = $this->conn->prepare("SELECT image_path FROM unit_images WHERE unitID = ? ORDER BY imgID ASC");
        $stmt2->bind_param("i", $id);
        $stmt2->execute();
        $imgResult = $stmt2->get_result();
        $images = [];
        while ($row = $imgResult->fetch_assoc()) {
            $images[] = 'http://localhost/easysakan/' . str_replace('\\', '/', $row['image_path']);
        }
        $stmt2->close();

        // Get seller info joined with customer
        $stmt3 = $this->conn->prepare("
            SELECT c.fname, c.lname, COALESCE(s.phone, c.phone) AS phone, c.email, c.location
            FROM seller s
            JOIN customer c ON s.custID = c.custID
            WHERE s.unitID = ?
            LIMIT 1
        ");
        $stmt3->bind_param("i", $id);
        $stmt3->execute();
        $sellerResult = $stmt3->get_result();
        $seller = $sellerResult->fetch_assoc();
        $stmt3->close();

        return [
            'unitID'      => $unit['unitID'],
            'name'        => $unit['name'],
            'zone'        => $unit['zone'],
            'type'        => $unit['type'],
            'price'       => $unit['price'],
            'space'       => $unit['space'],
            'description' => $unit['description'],
            'cover_image' => $unit['cover_image']
                ? 'http://localhost/easysakan/' . str_replace('\\', '/', $unit['cover_image'])
                : null,
            'images'      => $images,
            'seller'      => $seller ? [
                'name'     => $seller['fname'] . ' ' . $seller['lname'],
                'phone'    => $seller['phone'],
                'email'    => $seller['email'],
                'location' => $seller['location'],
            ] : null,
        ];
    }
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$id) {
    echo json_encode(['success' => false, 'error' => 'No unit ID provided']);
    exit();
}

$handler = new ListingDetailsHandler($conn);
$unit = $handler->getUnitById($id);

if (!$unit) {
    echo json_encode(['success' => false, 'error' => 'Unit not found']);
    exit();
}

echo json_encode(['success' => true, 'unit' => $unit]);
?>