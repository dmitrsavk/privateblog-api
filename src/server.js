const express = require("express");
const fs = require("fs");
const cookieParser = require('cookie-parser')

import session from 'express-session';

import Auth from './auth/Auth';
import User from './user/User';

const app = express();

const auth = new Auth();
const user = new User();

const server = require("https").createServer(
  {
    key: fs.readFileSync("/etc/ssl/privateblog.key"),
    cert: fs.readFileSync("/etc/ssl/privateblog.crt")
  },
  app
);

app.set('trust proxy', true)

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: '123qwe',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true
  },
  name: "sessionId",
  secure: true,
}));

app.use(cookieParser());

app.use(function(req, res, next) {
  const origins = ['https://privateblog.ru', 'https://privateblog.ru:3000'];

  if (~origins.indexOf(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true)
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.get("/api/auth/fb", auth.get);
app.get("/api/user", user.get)

server.listen(3001, () => console.log("listen 3001"));
