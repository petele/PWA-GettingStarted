var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp
    .src('./resources/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./app/styles'));
});

gulp.task('serve', ['sass'], function() {

  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['app']
  });
  gulp.watch('./resources/*.scss', ['sass']);
  gulp.watch([
    './app/*.html',
    './app/*.js',
    './app/scripts/**/*.js',
    './app/styles/**/*.css'
  ]).on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
