const pool = require('../database/index.js');

const sortHelper = (sort) => {
  return sort === 'newest' ? 'date DESC' : sort === 'helpful' ? 'helpfulness DESC' : 'date DESC, helpfulness DESC';
}
// review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
// ORDER BY ${sortHelper(sort)}
// LIMIT ${count}
// OFFSET ${page > 1 && count ? (page - 1) * count : 0};

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
      let reviewIds = results.rows.map(review => {
        review.date = new Date(Number(review.date)).toISOString();
        review.photos = [];
        return review.review_id});
      let photos = await client.query(`
        SELECT photo_id, review_id, url
        FROM photos
        WHERE review_id in (${reviewIds});
      `)
      results.rows.map(review => {
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

const getAverage = (array) => {
  return (array.reduce((a, b) => a + b) / array.length).toFixed(2);
}

const getMetaData = async (params, callback) => {
  const client = await pool.connect();
  let {product_id} = params;

  let metaData = {
    product_id: product_id,
    ratings: {},
    recommended: {
      '0' : 0,
      '1' : 0
    },
    characteristics: {}
  }

  let charSelect = `
  SELECT characteristic_id, name
  FROM all_chars
  WHERE product_id = ${product_id};
  `
  await client.query(charSelect)
    .then(async (results) => {
      let tempRatings = {};
      let finalRatings = {};
      let finalChars = {};
      let averagedChars = {};
      let charIds = results.rows.map(element => {
        finalChars[element.name] = { id : element.characteristic_id };
        averagedChars[element.characteristic_id] = [];
        return element.characteristic_id;
      })
      let charQuery = await client.query(`
        SELECT *
        FROM characteristic_reviews
        WHERE characteristic_id in (${charIds})
      `)
      charQuery.rows.forEach(element => {
        averagedChars[element.characteristic_id].push(element.value);
      })
      for (let key in averagedChars) {
        averagedChars[key] = getAverage(averagedChars[key]);
      }
      results.rows.map(element => {
        finalChars[element.name].value = averagedChars[element.characteristic_id];
      })
      metaData.characteristics = finalChars;
      let reviews = await client.query(`
        SELECT rating, recommend
        FROM all_reviews
        WHERE product_id = ${product_id};
      `)

      reviews.rows.map(review => {
        if (review.recommend) {
          metaData.recommended['1'] = metaData.recommended['1'] + 1;
        } else {
          metaData.recommended['0'] = metaData.recommended['0'] + 1;
        }
        if (tempRatings[review.rating]) {
          tempRatings[review.rating].push(review.rating);
        } else {
          tempRatings[review.rating] = [1];
        }
      })

      reviews.rows.forEach(review => {
        finalRatings[review.rating] = tempRatings[review.rating].length;
      })

      metaData.ratings = finalRatings;
      callback(null, metaData);
    })
    .catch((err) => callback(err))
}

module.exports = { getReviews, getMetaData };
