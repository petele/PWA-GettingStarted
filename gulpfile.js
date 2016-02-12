var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('sass', function () {
  return gulp
    .src('./resources/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./styles/'))
    .pipe(minifyCss({}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('serve', function() {
  gulp.watch('./resources/*.scss', ['sass']);
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['.'],
    open: false
  });
  gulp.watch([
    './**/*.html',
    './**/*.js',
    './**/*.css',
    '!./**/service-worker.js',
    '!./gulpfile.js'
  ], browserSync.reload);
});

gulp.task('default', ['serve']);
