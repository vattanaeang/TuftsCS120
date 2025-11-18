<!-- database connection file -->
<?php
$host = "localhost";
$user = "uglcg4yw3mjwd";
$pass = "Cs120password!";
$db   = "dblyn60fr90mlb";
// Create connection
$conn = new mysqli($host, $user, $pass, $db);
// Check connection otherwise die
if ($conn->connect_error) die("DB Error: " . $conn->connect_error);
?>