<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();

$action = $_GET['action'] ?? ($_POST['action'] ?? null);

if ($action === 'list') {
    // Get all posters
    $query = "SELECT * FROM posters ORDER BY created_at DESC";
    $result = $conn->query($query);
    
    $posters = [];
    while ($row = $result->fetch_assoc()) {
        $posters[] = $row;
    }
    
    echo json_encode([
        'success' => true,
        'posters' => $posters
    ]);
} elseif ($action === 'create') {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $location = $_POST['location'] ?? 'services';
    $imagePath = '';
    $adminID = $_POST['adminID']  ?? null;

    if ($title === '') {
        echo json_encode([
            'success' => false,
            'message' => 'Title is required'
        ]);
        exit();
    }

    // Handle image upload
    if (isset($_FILES['image'])) {
        $uploadDir = '../easy-sakan-react/public/assets/images/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $file = $_FILES['image'];
        $fileName = 'poster_' . time() . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $uploadPath = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            $imagePath = '/assets/images/' . $fileName;
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to upload image'
            ]);
            exit();
        }
    }

    try {
        $query = "INSERT INTO posters (title, description, location, image_path, created_at, adminID) 
                  VALUES (?, ?, ?, ?, NOW(), ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ssssi', $title, $description, $location, $imagePath, $adminID);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Poster created successfully',
                'id' => $stmt->insert_id
            ]);
        } else {
            throw new Exception('Failed to insert poster');
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
            'message' => 'Poster ID is required'
        ]);
        exit();
    }

    try {
        $query = "DELETE FROM posters WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Poster deleted successfully'
            ]);
        } else {
            throw new Exception('Failed to delete poster');
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
