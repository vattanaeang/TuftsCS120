<?php
include "header.php";
include "db.php";

if (empty($_SESSION['cart'])) {
    echo "<h1>No active order.</h1>";
    exit;
}

$cart = $_SESSION['cart'];
$ids = implode(",", array_keys($cart));
$result = $conn->query("SELECT * FROM products WHERE id IN ($ids)");

$total = 0;
while ($row = $result->fetch_assoc()) {
    $total += $row['price'] * $cart[$row['id']];
}

// Insert order
$conn->query("INSERT INTO orders (orderDate, total) VALUES (NOW(), $total)");
$order_id = $conn->insert_id;

// Insert order items
foreach ($cart as $id => $qty) {
    $conn->query("INSERT INTO order_items (orderId, productId, quantity)
                  VALUES ($order_id, $id, $qty)");
}

// Clear cart
$_SESSION['cart'] = [];

$ship_date = date('Y-m-d', strtotime('+2 days'));
?>

<h1>Thank You for Your Order!</h1>
<p>Order ID: <?= $order_id ?></p>
<p>Total Paid: $<?= $total ?></p>
<p>Your order will ship on: <b><?= $ship_date ?></b></p>

<a href="products.php">Return to shopping</a>

</body>
</html>