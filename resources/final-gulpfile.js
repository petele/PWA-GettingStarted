var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var path = require('path');
var swPrecache = require('sw-precache');

gulp.task('clean', function() {
  return del([
    './styles/*',
    './step-06/service-worker.js',
    './step-07/service-worker.js',
    './final/service-worker.js'
  ]);
});

function generateServiceWorker(forDir, callback) {
  swPrecache.write(path.join(forDir, 'service-worker.js'), {
    staticFileGlobs: [
      forDir + '/**/*.{js,html,css,png,jpg,gif}',
      './images/**/*.{png,svg,gif,jpg}',
      './styles/**/*.css'
    ],
    stripPrefix: '.',
    runtimeCaching: [{
      urlPattern: /^https:\/\/publicdata-weather\.firebaseio\.com/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'weatherData'
        }
      }
    }]
  }, callback); 
}

gulp.task('generate-sw', ['gen-sw-06', 'gen-sw-07', 'gen-sw-final']);

gulp.task('gen-sw-06', function(callback) {
  generateServiceWorker('./step-06', callback);
});

gulp.task('gen-sw-07', function(callback) {
  generateServiceWorker('./step-07', callback);
});

gulp.task('gen-sw-final', function(callback) {
  generateServiceWorker('./final', callback);
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
    server: ['.'],
    open: false
  });
  gulp.watch([
    './**/*.html',
    './**/*.js',
    './**/*.css',
    '!./**/service-worker.js',
    '!./gulpfile.js'
  ]).on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
