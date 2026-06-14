<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();


$filter = $_GET['filter'] ?? 'all';
$action = $_GET['action'] ?? ($_POST['action'] ?? null);

if (!$action) {
    // Get bookings with optional filter
    $query = "SELECT b.*, c.name as customer_name, s.name as service_name 
              FROM bookings b
              LEFT JOIN customers c ON b.customer_id = c.id
              LEFT JOIN services s ON b.service_id = s.id";
    
    if ($filter !== 'all') {
        $query .= " WHERE b.status = ?";
    }
    
    $query .= " ORDER BY b.created_at DESC";
    
    try {
        if ($filter !== 'all') {
            $stmt = $conn->prepare($query);
            $stmt->bind_param('s', $filter);
            $stmt->execute();
            $result = $stmt->get_result();
        } else {
            $result = $conn->query($query);
        }
        
        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'bookings' => $bookings
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} elseif ($action === 'update_status') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        echo json_encode([
            'success' => false,
            'message' => 'Booking ID and status are required'
        ]);
        exit();
    }

    try {
        $query = "UPDATE bookings SET status = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('si', $status, $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Booking status updated successfully'
            ]);
        } else {
            throw new Exception('Failed to update booking');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid action'
    ]);
}
?>
