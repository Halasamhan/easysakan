<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'connection.php';
$conn = getconnection();
session_start();

class SellerLogin {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function login($email, $password) {
        if (!$email || !$password) {
            echo json_encode(['success' => false, 'message' => 'Email and password are required!']);
            return;
        }

        // Find customer by email
        $stmt = $this->conn->prepare("SELECT * FROM customer WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            echo json_encode(['success' => false, 'message' => 'No account found with that email!']);
            return;
        }

        $user = $result->fetch_assoc();

        if (!password_verify($password, $user['pass'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid password!']);
            return;
        }

        // Check this customer has at least one unit in seller table
        $sellerCheck = $this->conn->prepare("SELECT COUNT(*) as cnt FROM seller WHERE custID = ?");
        $sellerCheck->bind_param("i", $user['custID']);
        $sellerCheck->execute();
        $sellerResult = $sellerCheck->get_result();
        $sellerRow = $sellerResult->fetch_assoc();

        if ((int)$sellerRow['cnt'] === 0) {
            echo json_encode(['success' => false, 'message' => 'This account has no seller listings. Please add a listing first!']);
            return;
        }

        // Set session
        $_SESSION['custID'] = $user['custID'];
        $_SESSION['fname']  = $user['fname'];

        echo json_encode([
            'success' => true,
            'message' => 'Login successful!',
            'custID'  => $user['custID'],
            'fname'   => $user['fname'],
            'lname'   => $user['lname'],
            'email'   => $user['email'],
        ]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data     = json_decode(file_get_contents('php://input'), true);
    $email    = $data['email']    ?? '';
    $password = $data['password'] ?? '';

    $handler = new SellerLogin($conn);
    $handler->login($email, $password);
}
?>