<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();
session_start();

class customer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function signup($fname, $lname, $email, $pass, $confirm_password, $location) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email format!']);
            return;
        }
        if ($pass !== $confirm_password) {
            echo json_encode(['success' => false, 'message' => 'Passwords do not match!']);
            return;
        }
        if (strlen($pass) < 6) {
            echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters!']);
            return;
        }

        $check = $this->conn->prepare("SELECT * FROM customer WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $result = $check->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already registered!']);
            return;
        }

        $hashed_password = password_hash($pass, PASSWORD_DEFAULT);
        $stmt = $this->conn->prepare("INSERT INTO customer (fname, lname, email, pass, location) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $fname, $lname, $email, $hashed_password, $location);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Account created successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $this->conn->error]);
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $customer = new customer($conn);
    $customer->signup(
        $data['fname'] ?? '',
        $data['lname'] ?? '',
        $data['email'] ?? '',
        $data['pass'] ?? '',
        $data['confirmPassword'] ?? '',
        $data['location'] ?? ''
    );
}
?>