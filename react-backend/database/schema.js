module.exports.queries = {

// COPY all_reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/anthonyliang/SDC_data/reviews.csv' DELIMITER ',' CSV HEADER;

  createSchema: () => {
    client.query(`CREATE TABLE IF NOT EXISTS all_reviews(
      review_id integer NOT NULL,
      product_id integer,
      rating integer,
      date varchar,
      summary varchar,
      body varchar,
      recommend boolean,
      reported boolean,
      reviewer_name varchar,
      reviewer_email varchar,
      response varchar,
      helpfulness integer,
      CONSTRAINT all_reviews_pkey PRIMARY KEY(review_id));`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    client.query(`CREATE TABLE IF NOT EXISTS photos(
      photo_id integer NOT NULL,
      review_id integer,
      url varchar,
      CONSTRAINT photos_pkey PRIMARY KEY(photo_id),
      CONSTRAINT photos_fkey FOREIGN KEY(review_id) REFERENCES all_reviews(review_id));`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    client.query(`CREATE TABLE IF NOT EXISTS all_chars(
      characteristic_id integer NOT NULL,
      product_id integer,
      "name" varchar,
      CONSTRAINT characteristic_reviews_fkey FOREIGN KEY(characteristic_id) REFERENCES all_chars(characteristic_id),
      CONSTRAINT all_chars_pkey PRIMARY KEY(characteristic_id));`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    client.query(`CREATE TABLE IF NOT EXISTS characteristic_reviews(
      id integer NOT NULL,
      characteristic_id integer,
      review_id integer,
      "value" integer,
      CONSTRAINT characteristic_reviews_pkey PRIMARY KEY(id),
      CONSTRAINT characteristic_reviews_fkey FOREIGN KEY(review_id) REFERENCES all_reviews(review_id));`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })
  }
}

// CONSTRAINT characteristic_reviews_fkey FOREIGN KEY(characteristic_id) REFERENCES characteristics(characteristic_id),