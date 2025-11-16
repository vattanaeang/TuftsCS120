<?php
include "header.php";
include "db.php";

$result = $conn->query("SELECT * FROM products");
?>

<h1>Products</h1>

<div class="product-grid">
<?php while($row = $result->fetch_assoc()): ?>
    <div class="card">
        <img src="<?= $row['imageURL'] ?>">
        <h3><?= $row['name'] ?></h3>
        <p>$<?= $row['price'] ?></p>
        <button onclick="addToCart(<?= $row['id'] ?>)">Add to Cart</button>

        <div class="description hidden">
            <?= $row['description'] ?>
        </div>
    </div>
<?php endwhile; ?>
</div>

<script>

// Add to cart stored in Session via AJAX
function addToCart(id){
    window.location = "cart.php?add=" + id;
}
</script>

</body>
</html>