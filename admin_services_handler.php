<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();

$action = $_GET['action'] ?? ($_POST['action'] ?? null);

if ($action === 'list') {
    // Get all services
    $query = "SELECT * FROM services ORDER BY created_at DESC";
    $result = $conn->query($query);
    
    $services = [];
    while ($row = $result->fetch_assoc()) {
        $services[] = $row;
    }
    
    echo json_encode([
        'success' => true,
        'services' => $services
    ]);
} elseif ($action === 'create') {
    $input = json_decode(file_get_contents('php://input'), true);
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $icon = $input['icon'] ?? '🔧';
    $price = $input['price'] ?? 0;

    if ($title === '') {
        echo json_encode([
            'success' => false,
            'message' => 'Title is required'
        ]);
        exit();
    }

    try {
        $query = "INSERT INTO services (title, description, icon, price, created_at) 
                  VALUES (?, ?, ?, ?, NOW())";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('sssi', $title, $description, $icon, $price);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Service created successfully',
                'id' => $stmt->insert_id
            ]);
        } else {
            throw new Exception('Failed to insert service');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} elseif ($action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $icon = $input['icon'] ?? '🔧';
    $price = $input['price'] ?? 0;

    if (!$id || $title === '') {
        echo json_encode([
            'success' => false,
            'message' => 'ID and title are required'
        ]);
        exit();
    }

    try {
        $query = "UPDATE services SET title = ?, description = ?, icon = ?, price = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('sssii', $title, $description, $icon, $price, $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Service updated successfully'
            ]);
        } else {
            throw new Exception('Failed to update service');
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
            'message' => 'Service ID is required'
        ]);
        exit();
    }

    try {
        $query = "DELETE FROM services WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Service deleted successfully'
            ]);
        } else {
            throw new Exception('Failed to delete service');
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
