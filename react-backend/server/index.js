const express = require('express');
const router = require('./routes.js');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  })
  next()
})

app.use('/api/reviews', router);

module.exports = router;
