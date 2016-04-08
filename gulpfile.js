var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var mocha = require('gulp-mocha');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('html', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  gulp.src('app/sass/main.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
})

gulp.task('scripts', function() {
	return browserify('app/**/*.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
		.pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/sass/main.sass', ['sass']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('test/**/*.spec.js', ['test']);
});

gulp.task('test', function() {
  gulp.src('test/**/*.js')
    .pipe(mocha({ reporter: 'nyan'}));
});

gulp.task('default', ['html', 'sass', 'scripts']);
gulp.task('start', ['html', 'sass', 'scripts', 'test', 'server', 'watch']);
