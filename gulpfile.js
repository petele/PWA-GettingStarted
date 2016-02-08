var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('clean', function() {
  return del([
    './styles/*',
    './step-06/service-worker.js',
    './step-07/service-worker.js',
    './final/service-worker.js'
  ]);
});

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
    server: ['.']
  });
  gulp.watch([
    './**/*.html',
    './**/*.js',
    './**/*.css'
  ]).on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
