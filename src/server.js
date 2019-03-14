const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");

import Auth from "./auth/Auth";
import User from "./user/User";
import Blog from "./blog/Blog";
import Image from "./image/Image";

const app = express();

const auth = new Auth();
const user = new User();
const blog = new Blog();
const image = new Image();

const server = require("https").createServer(
  {
    key: fs.readFileSync("/etc/ssl/privateblog.key"),
    cert: fs.readFileSync("/etc/ssl/privateblog.crt")
  },
  app
);

app.use(cookieParser());
app.use(bodyParser());

app.use(function(req, res, next) {
  const origins = [
    "https://privateblog.ru",
    "https://privateblog.ru:3000",
    "https://privateblog.ru:8080"
  ];

  if (~origins.indexOf(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.post("/api/auth/fb", auth.get);
app.post("/api/auth/vk", auth.getVk);
app.get("/api/user", user.get);
app.get("/api/user/logout", user.logout);
app.post("/api/blog", blog.save);
app.post("/api/blog/delete", blog.delete);
app.get("/api/image", image.get);

server.listen(3001, () => console.log("listen 3001"));
