<?php
include "header.php";
include "db.php";

// Initialize cart in session
if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

// Add item from products page into cart
if (isset($_GET['add'])) {
    $id = $_GET['add'];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
}

// Remove item from cart
if (isset($_GET['remove'])) {
    unset($_SESSION['cart'][$_GET['remove']]);
}

// If cart is empty, show message
if (empty($_SESSION['cart'])) {
    echo "<h2>Your cart is empty.</h2>";
    echo "<a href='products.php'>Continue Shopping</a>";
    exit;
}

// Load product details for items in cart
$ids = implode(",", array_keys($_SESSION['cart']));
$result = $conn->query("SELECT * FROM products WHERE id IN ($ids)");

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[$row['id']] = $row;
}

$total = 0;
?>
<!-- cart page -->
<h1>Your Cart</h1>
<!-- cart table -->
<table class="cart-table">
<tr>
    <th>Item</th>
    <th>Qty</th>
    <th>Price</th>
    <th>Total</th>
    <th></th>
</tr>
<!-- loop through cart items -->
<?php foreach ($_SESSION['cart'] as $id => $qty): 
    $p = $products[$id];
    $item_total = $p['price'] * $qty;
    $total += $item_total;
?>
<!-- cart item row -->
    <tr>
        <td>
            <?= $p['name'] ?>
        </td>
        <td>
            <?= $qty ?>
        </td>
        <td>
            $<?= $p['price'] ?>
        </td>
        <td>
            $<?= $item_total ?>
        </td>
        <td>
            <a href="cart.php?remove=<?= $id ?>">Remove from cart</a>
        </td>
    </tr>
<?php endforeach; ?>
</table>
<!-- order total and checkout buttons -->
<h2>Order Total: $<?= $total ?></h2>

<a class="btn" href="thankyou.php">Check Out</a>
<a class="btn" href="products.php">Continue Shopping</a>

</body>
</html>