const express = require("express");
const fs = require("fs");
const axios = require("axios");
const app = express();

import Auth from './auth/Auth';
const auth = new Auth();

const server = require("https").createServer(
  {
    key: fs.readFileSync("/etc/ssl/privateblog.key"),
    cert: fs.readFileSync("/etc/ssl/privateblog.crt")
  },
  app
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://privateblog.ru");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/auth/fb", auth.get);

server.listen(3000, () => console.log("listen 3000"));
