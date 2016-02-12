var path = require('path');
var swPrecache = require('sw-precache');

function buildSW(rootDir) {
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
}

buildSW('./step-07');
buildSW('./final');
