const { Sequelize } = require('sequelize');
const database = 'reviews';
const username = 'admin';
const password = 'password';

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

// CREATE DATABASE reviews;
// \c reviews;

// CREATE TABLE "characteristics"(
//   characteristic_id integer NOT NULL,
//   product_id integer,
//   "name" varchar,
//   CONSTRAINT characteristics_pkey PRIMARY KEY(characteristic_id)
// );


// CREATE TABLE all_reviews(
//   review_id integer NOT NULL,
//   product_id integer,
//   rating integer,
//   summary varchar,
//   response varchar,
//   body text,
//   date varchar,
//   reviewer_name varchar,
//   helpfulness varchar,
//   reviewer_email varchar,
//   reported varchar,
//   recommend varchar,
//   CONSTRAINT all_reviews_pkey PRIMARY KEY(review_id)
// );

// CREATE TABLE characteristic_reviews(
//   id integer NOT NULL,
//   characteristic_id integer,
//   review_id integer,
//   "value" integer,
//   CONSTRAINT characteristic_reviews_pkey PRIMARY KEY(id)
// );

// CREATE TABLE photos(
//   photo_id integer,
//   review_id integer,
//   url varchar,
//   CONSTRAINT photos_pkey PRIMARY KEY(photo_id)
// );

// postgres=# \dt
//                    List of relations
//  Schema |          Name          | Type  |    Owner
// --------+------------------------+-------+--------------
//  public | Characteristic_Reviews | table | anthonyliang
//  public | Characteristics        | table | anthonyliang
//  public | Photos                 | table | anthonyliang
//  public | Reviews                | table | anthonyliang
// (4 rows)

// COPY all_chars(characteristic_id, product_id, name) FROM '/Users/anthonyliang/SDC_data/characteristics.csv' DELIMITER ',' CSV HEADER;
// COPY 3347679

// COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/Users/anthonyliang/SDC_data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
// COPY 19327575

// COPY photos(photo_id, review_id, url) FROM '/Users/anthonyliang/SDC_data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
// COPY 2742540

// COPY all_reviews(review_id, product_id, rating, summary, response, body, date, reviewer_name, helpfulness, reviewer_email, reported, recommend) FROM '/Users/anthonyliang/SDC_data/reviews.csv' DELIMITER ',' CSV HEADER;
// COPY 5774952

// GRANT ALL on all_reviews TO PUBLIC;
// GRANT ALL on all_chars TO PUBLIC;
// GRANT ALL on photos TO PUBLIC;
// GRANT ALL on characteristic_reviews TO PUBLIC;