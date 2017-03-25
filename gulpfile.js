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
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest('builds/development/assets/css'))
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
	gulp.watch('builds/development/**').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);