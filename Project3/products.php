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
        <button style="background-color:lightblue; padding=15px; font-size=25px" onclick="addToCart(<?= $row['id'] ?>)">Add to Cart</button>

        <p>
            <?= $row['description'] ?>
        </p>
    </div>
<?php endwhile; ?>
</div>

<script>


function addToCart(id){
    window.location = "cart.php?add=" + id;
}
</script>

</body>
</html>