<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                    http_response_code(204);
    exit();
}

header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();

class ListingHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getFilteredUnits($filters) {
        $conditions = [];
        $params = [];
        $types = '';

        // Keyword search (name, zone, description)
        if (!empty($filters['keyword'])) {
            $keyword = "%" . $filters['keyword'] . "%";
            $conditions[] = "(name LIKE ? OR zone LIKE ? OR description LIKE ?)";
            $params[] = $keyword;
            $params[] = $keyword;
            $params[] = $keyword;
            $types .= 'sss';
        }

        // Category filter (e.g. "Apartment", "Villa")
        if (!empty($filters['category']) && $filters['category'] !== 'All') {
            $conditions[] = "category = ?";
            $params[] = $filters['category'];
            $types .= 's';
        }

        // Type filter (e.g. "For Sale", "For Rent")
        if (!empty($filters['type']) && $filters['type'] !== 'All Types') {
            $conditions[] = "type = ?";
            $params[] = $filters['type'];
            $types .= 's';
        }

        // Location filter
        if (!empty($filters['location'])) {
            $location = "%" . $filters['location'] . "%";
            $conditions[] = "(zone LIKE ? OR address LIKE ?)";
            $params[] = $location;
            $params[] = $location;
            $types .= 'ss';
        }

        // Price range filter
        if (!empty($filters['price_range']) && $filters['price_range'] !== 'All') {
            switch ($filters['price_range']) {
                case 'Under EGP 500K':
                    $conditions[] = "price < ?";
                    $params[] = 500000;
                    $types .= 'i';
                    break;
                case 'EGP 500K - 1M':
                    $conditions[] = "price BETWEEN ? AND ?";
                    $params[] = 500000;
                    $params[] = 1000000;
                    $types .= 'ii';
                    break;
                case 'EGP 1M - 3M':
                    $conditions[] = "price BETWEEN ? AND ?";
                    $params[] = 1000000;
                    $params[] = 3000000;
                    $types .= 'ii';
                    break;
                case 'EGP 3M - 5M':
                    $conditions[] = "price BETWEEN ? AND ?";
                    $params[] = 3000000;
                    $params[] = 5000000;
                    $types .= 'ii';
                    break;
                case 'Above EGP 5M':
                    $conditions[] = "price > ?";
                    $params[] = 5000000;
                    $types .= 'i';
                    break;
            }
        }

        // Build final query
        $sql = "SELECT * FROM units where stat != 'sold' OR stat IS NULL";
        if (!empty($conditions)) {
            $sql .= " AND " . implode(" AND ", $conditions);
        }
        $sql .= " ORDER BY unitID DESC";

        $stmt = $this->conn->prepare($sql);

        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $units = [];
        while ($row = $result->fetch_assoc()) {
            $units[] = $row;
        }

        return $units;
    }
}

$handler = new ListingHandler($conn);

// Collect all filters from GET params
$filters = [
    'keyword'     => $_GET['keyword']     ?? '',
    'category'    => $_GET['category']    ?? '',
    'type'        => $_GET['type']        ?? '',
    'location'    => $_GET['location']    ?? '',
    'price_range' => $_GET['price_range'] ?? '',
];

$units = $handler->getFilteredUnits($filters);

echo json_encode(['success' => true, 'units' => $units]);
?>