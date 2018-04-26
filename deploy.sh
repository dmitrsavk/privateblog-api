#!/bin/bash

yarn
forever stop /root/privateblog-api/src/server.js
forever start /root/privateblog-api/src/server.js
