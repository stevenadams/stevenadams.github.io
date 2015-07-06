// function mason() {
//     var tiles = $(".tile");
//     new Masonry($('.mosaic .container'), {
//         columnWidth: 300,
//         itemSelector: ".tile",
//         gutter: 0
//     })
// }

$(document).ready(function(){
	var nav = {
		el: $('.site-nav'),
		toggle: $('.site-nav__toggle'),
		menu: $('.site-nav__menu')
	}

	nav.toggle.on('click', function(){
		nav.el.toggleClass('is-active');
	});
});