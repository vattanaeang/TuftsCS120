function GalleryItem(name, price, image, largeImage) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.largeImage = largeImage;
}

var galleryItem = [
    new GalleryItem("Ginevra de' Benci", 450000000, "../pictures/jQueryAssignment/pictures/Ginevra_de_Benci.jpeg", "../pictures/jQueryAssignment/pictures/Ginevra_de_Benci.jpeg"),
    new GalleryItem("The Feast of the Gods", 200000, "../pictures/jQueryAssignment/pictures/The_Feast_of_the_Gods.jpeg", "../pictures/jQueryAssignment/pictures/The_Feast_of_the_Gods.jpeg"),
    new GalleryItem("Family of Saltimbanques", 70000000, "../pictures/jQueryAssignment/pictures/Family_of_Saltimbanques.jpeg", "pictures/item1Large.jpg"),
    new GalleryItem("The Shaw 54th Regiment Memorial", 95000000, "../pictures/jQueryAssignment/pictures/The_Shaw_54th_Regiment_Memorial.jpeg", "pictures/item1Large.jpg"),
    new GalleryItem("Woman with a Sunflower", 12500000, "../pictures/jQueryAssignment/pictures/Woman_with_a_Sunflower.jpeg", "pictures/item1Large.jpg")
]
$(document).ready(function () {
    const $normalSize = $('#normalSize');
    const $largeSize = $('#largeSize');
    const $info = $('#info');

    // Populate thumbnail container
    galleryItem.forEach((item, index) => {
        const $img = $('<img>')
            .attr('src', item.image)
            .attr('data-index', index);

        $normalSize.append($img);
    });

    $normalSize.on('mouseenter', 'img', function () {
        const index = $(this).data('index');
        const item = galleryItem[index];

        const $largeImg = $('<img>')
            .attr('src', item.largeImage)
            .css('max-width', '400px')
            .hide();

        $largeSize.empty().append($largeImg);
        $largeImg.fadeIn(2000);
    });

    $normalSize.on('click', 'img', function () {
        const index = $(this).data('index');
        const item = galleryItem[index];

        $info.stop(true, true)
            .hide()
            .html(`<p><strong>${item.name}</strong><br>Price: $${item.price.toLocaleString()}</p>`)
            .fadeIn(500)
            .delay(4000)
            .fadeOut(1000);
    });

});



