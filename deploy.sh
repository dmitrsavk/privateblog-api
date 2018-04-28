#!/bin/bash

yarn
./node_modules/.bin/babel ./src --presets es2017 --plugins transform-es2015-modules-commonjs -d ./dist
forever start /root/privateblog-api/dist/server.js
forever start /root/privateblog-api/dist/server.js
