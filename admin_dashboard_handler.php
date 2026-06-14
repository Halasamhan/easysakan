<?php
header('Content-Type: application/json');

include 'connection.php';
$conn = getconnection();


try {
    // Get booking statistics
    $bookingQuery = "SELECT COUNT(*) as total FROM bookings";
    $bookingResult = $conn->query($bookingQuery);
    $totalBookings = $bookingResult->fetch_assoc()['total'] ?? 0;

    // Get listings statistics
    $listingQuery = "SELECT COUNT(*) as total FROM listings";
    $listingResult = $conn->query($listingQuery);
    $totalListings = $listingResult->fetch_assoc()['total'] ?? 0;

    // Get pending listings
    $pendingQuery = "SELECT COUNT(*) as total FROM listings WHERE status = 'pending'";
    $pendingResult = $conn->query($pendingQuery);
    $pendingListings = $pendingResult->fetch_assoc()['total'] ?? 0;

    // Get users count
    $userQuery = "SELECT COUNT(*) as total FROM customers";
    $userResult = $conn->query($userQuery);
    $totalUsers = $userResult->fetch_assoc()['total'] ?? 0;

    // Get revenue (sum of all bookings with amount)
    $revenueQuery = "SELECT COALESCE(SUM(amount), 0) as total FROM bookings WHERE status = 'completed'";
    $revenueResult = $conn->query($revenueQuery);
    $totalRevenue = $revenueResult->fetch_assoc()['total'] ?? 0;

    echo json_encode([
        'success' => true,
        'stats' => [
            'totalBookings' => intval($totalBookings),
            'totalListings' => intval($totalListings),
            'totalUsers' => intval($totalUsers),
            'totalRevenue' => intval($totalRevenue),
            'pendingListings' => intval($pendingListings)
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
