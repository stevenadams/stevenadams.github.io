function mason() {
    var tiles = $(".tile");
    new Masonry($('.mosaic .container'), {
        itemSelector: ".tile"
    })
}