<?php
function getconnection() {
    $conn = new mysqli("localhost", "root", "", "easysakan");

    if ($conn->connect_error) {
        header('Content-Type: application/json');
        die(json_encode(['success' => false, 'message' => 'Database unavailable. Please ensure MySQL is running in XAMPP.']));
    }

    return $conn;
}