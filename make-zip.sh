#!/bin/bash

rm pwa-weather.zip
find . -name '*.DS_Store' -type f -delete
zip -r pwa-weather.zip favicon.ico final/* gulpfile.js images/* package.json resources/* step-0?/* styles/*
