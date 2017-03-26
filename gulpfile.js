var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),


	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'), // postcss is needed
	sourcemaps = require('gulp-sourcemaps');

var sassSources = ['components/sass/style.scss'];

gulp.task('css', function(){
	gulp.src(sassSources)
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded', 
		sourceComments: true,
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		//autoprefixer('last 2 versions', '> 1%')
		autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
	]))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest('builds/development/assets/css'))
});

var sassBootstrapSources = ['components/sass-bootstrap/bootstrap.scss'];

gulp.task('css-bootstrap', function(){
	gulp.src(sassBootstrapSources)
	//.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(postcss([
		//autoprefixer('last 2 versions', '> 1%')
		autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
	]))
	//.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest('builds/development/assets/plugins/bootstrap/css'))
});

gulp.task('watch', function(){
	// browserSync.init({ 
	// 	open: 'external',
	// 	proxy: 'mysite.dev',
	// 	port: 8080
	// });
	browserSync.init({
        server: 'builds/development'
    });
	gulp.watch(['components/sass/*.scss'], ['css']);
	gulp.watch(['components/sass-bootstrap/*.scss'] ,['css-bootstrap']);
	gulp.watch('builds/development/**').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);