var express = require("express");
var fs = require("fs");
var app = express();

var server = require("https").createServer(
  {
    key: fs.readFileSync('/etc/ssl/privateblog.key'),
    cert: fs.readFileSync('/etc/ssl/privateblog.crt')
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

app.get('/api/auth/fb', (req, res) => {
  console.log(req.query.code);
  res.send('O, zdorova!');
})

server.listen(3000, () => console.log('listen 3000'));