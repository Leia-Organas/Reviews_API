const express = require('express');
const router = express.Router();
const db = require('./helpers.js');

router.use(express.json());

router.get('/reviews', (req, res) => {
  db.getReviews(req.query, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
});

router.get('/reviews/meta', (req, res) => {
  db.getMetaData(req.query, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
});

router.post('/reviews', (req, res) => {
  db.addReview(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(data);
      res.json(data);
    }
  })
})

router.put('/reviews/:review_id/helpful', (req, res) => {
  db.setHelpful(req.params, (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

router.put('/reviews/:review_id/report', (req, res) => {
  db.setReport(req.params, (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

module.exports = router;
