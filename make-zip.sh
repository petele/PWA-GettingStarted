#!/bin/bash

rm pwa-weather.zip
rm resources/gulpfile.js
rm resources/package.json
rm step-06/service-worker.js
cp gulpfile.js resources/
cp package.json resources/
gulp sass
node generate-sw.js
find . -name '*.DS_Store' -type f -delete
zip -r pwa-weather.zip favicon.ico final/* images/* resources/* step-0?/* styles/*
