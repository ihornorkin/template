const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const browserSync 	= require('browser-sync');
const soursemaps	= require('gulp-sourcemaps');
const concat		= require('gulp-concat');
const uglify		= require('gulp-uglifyjs');
const del			= require('del');
const cache			= require('gulp-cache');
const autoprefixer 	= require('gulp-autoprefixer');
const cssnano		= require('gulp-cssnano');
const styleInject 	= require("gulp-style-inject");
const notify		= require('gulp-notify');
const replace 		= require('gulp-replace');
const imagemin 		= require('gulp-tinypng-compress');
const ttf2woff2 	= require('gulp-ttf2woff2');

gulp.task('scss', function(){
	return gulp.src('assets/scss/**/*.scss')
	.pipe(soursemaps.init())
	.pipe(sass())
	.on('error', notify.onError(function(err){
		return {
			title: 'Styles',
			message: err.message
		}
		}))
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(soursemaps.write())
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.reload({stream: true}))
	});

gulp.task('header', function(){
	return gulp.src('assets/header/*.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(gulp.dest('assets/header/'))
	.pipe(browserSync.reload({stream: true}))
	});

gulp.task('libs', function() {
	return gulp.src('assets/libs/**/*.scss')
	.pipe(concat('libs.scss'))
	.pipe(gulp.dest('assets/scss'))
	});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'assets'
			},
			notify: false
			});
	});

gulp.task('scripts', function() {
	return gulp.src([
		'assets/libs/slick-carousel/slick/*.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
	});

gulp.task('clean', function() {
	return del.sync('dist');
	});

gulp.task('clear', function() {
	return cache.clearAll();
	});

gulp.task('woff2', function(){
	gulp.src(['assets/fonts/*.ttf'])
	.pipe(ttf2woff2())
	.pipe(gulp.dest('assets/fonts/'));
	});

gulp.task('inject', function() {
	gulp.src("assets/*.html")
	.pipe(styleInject())
	.pipe(gulp.dest("./dist"));
	});

gulp.task('img', function () {
	gulp.src('assets/images/**/*.{png,jpg,jpeg}')
	.pipe(imagemin({
		key: 'XtU0Mzbzbg2b5OFKYvdZY8UGdu1JPp8S',
		log: false
		}))
	.pipe(gulp.dest('assets/images'));
	});

gulp.task('watch', ['browser-sync', 'scss', 'header', 'scripts', 'libs'],  function() {
	gulp.watch('assets/scss/*.scss', ['header']);
	gulp.watch('assets/scss/*.scss', ['scss']);
	gulp.watch('assets/*.html', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
	});

gulp.task('remove', function() {
	gulp.src("assets/header/*.min.css")
	.pipe(replace('../', ''))
	.pipe(gulp.dest("assets/header"));
	});

gulp.task('inject', function() {
	gulp.src("assets/*.html")
	.pipe(styleInject())
	.pipe(gulp.dest("./dist"));
	})

gulp.task('build', ['clean', 'scss', 'scripts', 'remove', 'inject'], function() {
	var buildCss = gulp.src('assets/css/main.css')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('assets/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildScripts = gulp.src('assets/js/*.js')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('assets/*.html')
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('assets/*.php')
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('assets/video/**.*')
	.pipe(gulp.dest('dist/video'));

	var buldFavicon = gulp.src('assets/*.png')

	});
