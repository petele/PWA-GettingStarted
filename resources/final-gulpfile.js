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

gulp.task('generate-sw', function() {
  var rootDir = './step-06';
  var swOptions = {
    staticFileGlobs: [
      rootDir + '/**/*.{js,html,css,png,jpg,gif}',
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
  };
  swPrecache.write(path.join(rootDir, 'service-worker.js'), swOptions);
});

gulp.task('serve', ['generate-sw'], function() {
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
  ], ['generate-sw'], browserSync.reload);
});

gulp.task('default', ['serve']);
