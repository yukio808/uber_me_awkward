-- -- drop db and tables if they already exist
-- DROP TABLE IF EXISTS uber_me_awkward;
-- DROP DATABASE IF EXISTS db_uber_me_awkward;

-- -- create the database
-- CREATE DATABASE db_uber_me_awkward;



-- request a ride table
CREATE TABLE request_ride (
product_id character(36),
start_latitude double precision,
start_longitude double precision,
end_latitude double precision,
end_longitude double precision,

user_id serial,
username character varying(24),
password character varying(12)
);

INSERT INTO request_ride (
  product_id,
  start_latitude,
  start_longitude,
  end_latitude,
  end_longitude,
  username,
  password)
VALUES(
  '821415d8-3bd5-4e27-9604-194e4359a449',
  34.232,
  234.45,
  48.321,
  218.32,
  'uberuser@gmail.com',
  '1234password'
  );

SELECT * FROM request_ride;