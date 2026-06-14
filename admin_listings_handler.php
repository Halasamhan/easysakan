<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();


$filter = $_GET['filter'] ?? 'all';
$action = $_GET['action'] ?? ($_POST['action'] ?? null);

if (!$action) {
    $query = "SELECT u.*, 
                     CONCAT(c.fname, ' ', c.lname) as seller_name
              FROM units u
              LEFT JOIN seller s ON u.unitID = s.unitID
              LEFT JOIN customer c ON s.custID = c.custID";

    if ($filter !== 'all') {
        $query .= " WHERE u.stat = ?";
    }

    $query .= " ORDER BY u.unitID DESC";

    try {
        if ($filter !== 'all') {
            $stmt = $conn->prepare($query);
            $stmt->bind_param('s', $filter);
            $stmt->execute();
            $result = $stmt->get_result();
        } else {
            $result = $conn->query($query);
        }

        $listings = [];
        while ($row = $result->fetch_assoc()) {
            $listings[] = $row;
        }

        echo json_encode([
            'success' => true,
            'listings' => $listings
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} elseif ($action === 'approve') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Listing ID is required']);
        exit();
    }

    try {
        $query = "UPDATE units SET stat = 'approved' WHERE unitID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Listing approved successfully']);
        } else {
            throw new Exception('Failed to approve listing');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    }
} elseif ($action === 'reject') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $reason = $input['reason'] ?? '';

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Listing ID is required']);
        exit();
    }

    try {
        $query = "UPDATE units SET stat = 'rejected' WHERE unitID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Listing rejected successfully']);
        } else {
            throw new Exception('Failed to reject listing');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    }
} elseif ($action === 'delete') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Listing ID is required']);
        exit();
    }

    try {
        $query = "DELETE FROM units WHERE unitID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Listing deleted successfully']);
        } else {
            throw new Exception('Failed to delete listing');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
