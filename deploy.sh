#!/bin/bash

yarn
forever stop /root/privateblog-api/dist/server.js
forever start /root/privateblog-api/dist/server.js
