const express = require('express');

const PORT = 3001;

const router = express.Router();
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://privateblog.ru');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/auth/fb', (req, res) => res.redirect('/'))

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
