var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
  return gulp
    .src('./resources/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./step-3/styles'))
    .pipe(gulp.dest('./step-4/styles'))
    .pipe(gulp.dest('./step-5/styles'))
    .pipe(gulp.dest('./step-6/styles'))
    .pipe(gulp.dest('./step-7/styles'))
    .pipe(minifyCss({}))
    .pipe(gulp.dest('./step-celebrate/styles/'));
});

gulp.task('step3', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['step-3']
  });
  gulp.watch([
    './step-3/*.html',
    './step-3/*.js',
    './step-3/scripts/**/*.js',
    './step-3/styles/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('step4', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['step-4']
  });
  gulp.watch([
    './step-4/*.html',
    './step-4/*.js',
    './step-4/scripts/**/*.js',
    './step-4/styles/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('step5', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['step-5']
  });
  gulp.watch([
    './step-5/*.html',
    './step-5/*.js',
    './step-5/scripts/**/*.js',
    './step-5/styles/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('step6', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['step-6']
  });
  gulp.watch([
    './step-6/*.html',
    './step-6/*.js',
    './step-6/scripts/**/*.js',
    './step-6/styles/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('step7', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['step-7']
  });
  gulp.watch([
    './step-7/*.html',
    './step-7/*.js',
    './step-7/scripts/**/*.js',
    './step-7/styles/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('celebrate', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['step-celebrate']
  });
  gulp.watch([
    './step-celebrate/*.html',
    './step-celebrate/*.js',
    './step-celebrate/scripts/**/*.js',
    './step-celebrate/styles/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('default', ['celebrate']);
