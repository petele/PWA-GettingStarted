var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// watch files for changes and reload
gulp.task('default', function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['app']
  });

  gulp.watch([
    '*.html',
    '*.js',
    'styles/**/*.css',
    'scripts/**/*.js'
  ], {cwd: 'app'}, reload);
});
