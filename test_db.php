<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing database connection...\n\n";

$host = 'localhost';
$dbname = 'easysakan';
$username = 'root';
$password = '';

try {
    echo "Attempting to connect to database '$dbname'...\n";
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    echo "✓ Database connection successful!\n\n";
    
    // Check if units table exists
    echo "Checking for 'units' table...\n";
    $stmt = $pdo->query("SHOW TABLES LIKE 'units'");
    $tableExists = $stmt->fetch();
    
    if ($tableExists) {
        echo "✓ 'units' table exists!\n\n";
        
        // Count units
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM units");
        $result = $stmt->fetch();
        echo "Total units in database: " . $result['count'] . "\n\n";
        
        // Show first 3 units
        if ($result['count'] > 0) {
            echo "Sample units:\n";
            $stmt = $pdo->query("SELECT * FROM units LIMIT 3");
            while ($unit = $stmt->fetch()) {
                echo "- {$unit['name']} ({$unit['type']}) - {$unit['zone']}\n";
            }
        }
    } else {
        echo "✗ 'units' table does NOT exist!\n";
        echo "\nAvailable tables:\n";
        $stmt = $pdo->query("SHOW TABLES");
        while ($table = $stmt->fetch(PDO::FETCH_NUM)) {
            echo "- {$table[0]}\n";
        }
    }
    
} catch(PDOException $e) {
    echo "✗ Database error: " . $e->getMessage() . "\n";
    echo "\nPlease check:\n";
    echo "1. Is MySQL/XAMPP running?\n";
    echo "2. Does database 'easysakan' exist?\n";
    echo "3. Are the credentials correct (user: root, password: empty)?\n";
}
?>
