-- -- drop db and tables if they already exist
-- DROP TABLE IF EXISTS uber_me_awkward;
-- DROP DATABASE IF EXISTS db_uber_me_awkward;

-- -- create the database
-- CREATE DATABASE db_uber_me_awkward;



-- request a ride table
CREATE TABLE request_ride (
id serial PRIMARY KEY,
product_id character(36),
start_latitude double precision,
start_longitude double precision,
end_latitude double precision,
end_longitude double precision,

access_token text,

created_at timestamp DEFAULT NOW(),
updated_at timestamp DEFAULT NOW()
);

INSERT INTO request_ride (
  product_id,
  start_latitude,
  start_longitude,
  end_latitude,
  end_longitude,
  access_token)
VALUES(
  '821415d8-3bd5-4e27-9604-194e4359a449',
  21.296890,
  -157.856608,
  21.308650,
  -157.808712,
  'This-is-the-accessToken'
  );

SELECT * FROM request_ride;