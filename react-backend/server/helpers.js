const pool = require('../database/index.js');

const sortHelper = (sort) => {
  return sort === 'newest' ? 'date DESC' : sort === 'helpful' ? 'helpfulness DESC' : 'date DESC, helpfulness DESC';
}
// review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
// ORDER BY ${sortHelper(sort)}
//     LIMIT ${count}
//     OFFSET ${page > 1 && count ? (page - 1) * count : 0};

const getReviews = async (params, callback) => {
  const client = await pool.connect();
  let {page, count, sort, product_id} = params;

  let reviews = {
    product: product_id,
    page: page || 1,
    count: count|| 5,
  }

  let select = `
    SELECT *
    FROM all_reviews
    WHERE product_id = ${product_id}
    ORDER BY ${sortHelper(sort) || sortHelper('relevant')}
    LIMIT ${count || 5}
    OFFSET ${page > 1 && count ? (page - 1) * count : 0};
  `
  await client.query(select)
    .then(async (results) => {
      let reviewIds = await results.rows.map(review => {
        review.date = new Date(Number(review.date)).toISOString();
        review.photos = [];
        return review.review_id});
      const photos = await client.query(`
        SELECT photo_id, review_id, url
        FROM photos
        WHERE review_id in (${reviewIds});
      `)
      await results.rows.map(review => {
        photos.rows.forEach(photo => {
          if (review.review_id === photo.review_id) {
            review.photos.push({photo_id: photo.photo_id, url: photo.url});
          }
        })
      })
      callback(null, { ...reviews, results: results.rows });
    })
    .catch((err) => callback(err))
}

module.exports = { getReviews };