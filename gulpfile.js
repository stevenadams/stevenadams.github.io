var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

var opacity = function(css) {
  css.eachDecl(function(decl, i) {
    if (decl.prop === 'opacity') {
      decl.parent.insertAfter(i, {
        prop: '-ms-filter',
        value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
      });
    }
  });
};

var autoprefixer_browsers = [
	'last 2 versions',
	'ie >= 8',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var plugins_js_src = [
	// Define order specific libraries first
		'dev/js/plugins/_dependent/**/*.js',

		// All other libraries are then brought in
		'dev/js/plugins/*.js'
];

gulp.task('images', function() {
	return gulp.src('dev/img/**/*')
		.pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('dist/img'))
		.pipe($.size({title: 'images'}))
		.on('finish', function() {
		$.notify({ message: 'Images task complete' });
	});
});

// Copy Web Fonts To Dist
gulp.task('videos', function () {
	return gulp.src(['dev/videos/**/*'])
		.pipe(gulp.dest('dist/videos'))
		.pipe($.size({title: 'videos'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
	return gulp.src(['dev/fonts/**/*'])
		.pipe(gulp.dest('dist/css/fonts'))
		.pipe($.size({title: 'fonts'}));
});

gulp.task('styles', function() {
	return $.rubySass('dev/scss/project.scss')
		.on('error', function (err) {
				console.error('Error!', err.message);
		})
		.pipe($.autoprefixer('last 3 versions'))
		.pipe($.postcss([opacity]))
		.pipe($.rename({basename: 'build'}))
		.pipe(gulp.dest('dist/css'))
		.pipe($.rename({suffix: '.min'}))
		.pipe($.csso(true))
		.pipe(gulp.dest('dist/css'))
		.pipe($.size({title: 'styles'}))
		.pipe($.notify({ message: 'Styles task complete' }));

});

gulp.task('style_redundancy', function(){
	gulp.src('dist/css/*.css')
		.pipe($.csscss());
});

gulp.task('main_js', function() {
	return gulp.src('dev/js/main.js')
		.pipe($.jshint({
			laxcomma: true
		}))
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest('dist/js'))
		.pipe($.rename({suffix: '.min'}))
		.pipe($.uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe($.notify({ message: 'Main JS task complete' }));
});

gulp.task('plugins_js', function() {
	return gulp.src(plugins_js_src)
		.pipe($.concat('plugins.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe($.rename({suffix: '.min'}))
		.pipe($.uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe($.notify({ message: 'Plugins JS task complete' }));
});

gulp.task('libs_js', function() {
	return gulp.src('dev/js/libs/*.js')
		.pipe(gulp.dest('dist/js/libs'))
		.pipe($.size({title: 'JS Libs'}));
});

gulp.task('clean', function(cb) {
		del(['dist/*'], cb)
});




var spawn = require('child_process').spawn;

gulp.task('auto-reload', function() {
	var process;

	function restart() {
		if (process) {
			process.kill();
		}

		process = spawn('gulp', ['default'], {stdio: 'inherit'});
	}

	restart();
});




gulp.task('default', ['clean'], function() {
		gulp.start('styles', 'images', 'videos', 'fonts', 'main_js', 'libs_js', 'plugins_js');
});

gulp.task('watch', function() {

		// Watch Gulpfile
		gulp.watch('gulpfile.js', ['auto-reload']);

		// Watch .scss files
		gulp.watch('dev/scss/**/*.scss', ['styles']);

		// Watch JS files
		gulp.watch('dev/js/main.js', ['main_js']);
		gulp.watch('dev/js/libs/*.js', ['libs_js']);
		gulp.watch('dev/js/plugins/**/*.js', ['plugins_js']);


		// Watch image files
		gulp.watch('dev/img/**/*', ['images']);

		// Watch video files
		gulp.watch('dev/videos/**/*', ['videos']);

		// Watch font files
		gulp.watch('dev/fonts/**/*', ['fonts']);

});