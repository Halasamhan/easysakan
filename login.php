<?php
header('Content-Type: application/json');

include "connection.php";
$conn = getconnection();
session_start();

class customer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function login($email, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM customer WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['pass'])) {
                $_SESSION['custID'] = $user['custID'];
                $_SESSION['fname'] = $user['fname'];
                echo json_encode([
                    'success' => true,
                    'fname' => $user['fname'],
                    'custID' => $user['custID']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password!']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No user found with that email!']);
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $customer = new customer($conn);
    $customer->login($email, $password);
}
?>