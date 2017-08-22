var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');

gulp.task('script', function() {
    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'assets/js/*.js'])
        .pipe(concat('script.js'))
        //carpeta dist
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function() {
    gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'assets/sass/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('webserver', function() {
    gulp.src('../portfolio/')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            directoryListing: false,
            open: true,
            port: 8008
        }));
});

gulp.task('watchjs', function() {
    gulp.watch('assets/js/*.js', ['script']);
});


/**
 * Le indicamos a gulp cuales son las tareas a ejecutar al correr el comando gulp
 */

gulp.task('default', ['script', 'style', 'webserver', 'watch', 'watchjs']);