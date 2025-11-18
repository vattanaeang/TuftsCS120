<!-- include header and database -->
<?php
include "header.php";
include "db.php";
// query all orders
$orders = $conn->query("SELECT * FROM orders ORDER BY id DESC");
?>

<h1>All Orders</h1>
<!-- list orders -->
<?php while ($o = $orders->fetch_assoc()): ?>
<div class="order-block">
    <h3>Order #<?= $o['id'] ?> — <?= $o['order_date'] ?></h3>
    <p>Total: $<?= $o['total'] ?></p>

    <?php
    // query order items
    $items = $conn->query("
        SELECT products.name, products.price, order_items.quantity
        FROM order_items
        JOIN products ON products.id = order_items.productId
        WHERE orderId = {$o['id']}
    ");
    ?>

    <ul>
    <!-- list order items -->    
    <?php while($i = $items->fetch_assoc()): ?>
        <li>
            <?= $i['name'] ?> — Qty: <?= $i['quantity'] ?> —
            Item Total: $<?= $i['price'] * $i['quantity'] ?>
        </li>
    <?php endwhile; ?>
    </ul>
</div>
<hr>
<?php endwhile; ?>

</body>
</html>