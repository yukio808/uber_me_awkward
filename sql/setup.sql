-- -- drop db and tables if they already exist
-- DROP TABLE IF EXISTS uber_me_awkward;
-- DROP DATABASE IF EXISTS db_uber_me_awkward;

-- -- create the database
-- CREATE DATABASE IF NOT EXISTS db_uber_me_awkward;

-- request a ride table
CREATE TABLE request_ride (
product_id character(36),
start_latitude double precision,
start_longitude double precision,
end_latitude double precision,
end_longitude double precision
);

-- users table
CREATE TABLE users (
id serial PRIMARY KEY,
username character varying(24),
password character varying(12)
);

-- INSERT INTO request_ride (
--   product_id,
--   start_latitude,
--   start_longitude,
--   end_latitude,
--   end_longitude
--   )
-- VALUES();

-- INSERT INTO users (
--   id,
--   username,
--   password
--   )
-- VALUES();