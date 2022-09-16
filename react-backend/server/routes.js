const express = require('express');
const router = express.Router();
const db = require('./helpers.js');

router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res) {
  db.getReviews(req.query, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
});

module.exports = router;
