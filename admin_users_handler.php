<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();


$filter = $_GET['filter'] ?? 'all';
$action = $_GET['action'] ?? ($_POST['action'] ?? null);

if (!$action) {
    // Get users with optional filter
    $query = "SELECT id, name, email, user_type, status, created_at FROM customers";
    
    if ($filter === 'customers') {
        $query .= " WHERE user_type = 'customer'";
    } elseif ($filter === 'sellers') {
        $query .= " WHERE user_type = 'seller'";
    } elseif ($filter === 'active') {
        $query .= " WHERE status = 'active'";
    }
    
    $query .= " ORDER BY created_at DESC";
    
    try {
        $result = $conn->query($query);
        
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'users' => $users
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} elseif ($action === 'toggle_status') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        echo json_encode([
            'success' => false,
            'message' => 'User ID and status are required'
        ]);
        exit();
    }

    try {
        $query = "UPDATE customers SET status = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('si', $status, $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'User status updated successfully'
            ]);
        } else {
            throw new Exception('Failed to update user status');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} elseif ($action === 'delete') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;

    if (!$id) {
        echo json_encode([
            'success' => false,
            'message' => 'User ID is required'
        ]);
        exit();
    }

    try {
        $query = "DELETE FROM customers WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        } else {
            throw new Exception('Failed to delete user');
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
