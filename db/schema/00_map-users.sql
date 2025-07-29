-- DROP TABLE IF EXISTS favourite_maps CASCADE
-- DROP TABLE IF EXISTS maps CASCADE
-- DROP TABLE IF EXISTS map_points CASCADE
-- DROP TABLE IF EXISTS users CASCADE


-- CREATE TABLE users (
--     "id" SERIAL PRIMARY KEY NOT NULL,
--     "name" VARCHAR(255) NOT NULL,
--     "email" VARCHAR(255) NOT NULL,
--     "password" VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE map_points (
--     "id" SERIAL PRIMARY KEY NOT NULL,
--     "map_id" INTEGER REFERENCES maps(id) ON DELETE CASCADE,
--     "title" VARCHAR(255) NOT NULL,
--     "description" TEXT NOT NULL,
--     "image" VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE maps (
--     "id" SERIAL PRIMARY KEY NOT NULL,
--     "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     "map_point_id" INTEGER REFERENCES map_points(id) ON DELETE CASCADE,
--     "favourite_map_id" INTEGER REFERENCES favourite_maps(id) ON DELETE CASCADE,
--     "name" VARCHAR(255) NOT NULL,
--     "map_link" VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE favourite_maps (
--     "id" SERIAL PRIMARY KEY NOT NULL,
--     "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     "map_id" INTEGER REFERENCES maps(id) ON DELETE CASCADE,
--     "map_point_id" INTEGER REFERENCES map_points(id) ON DELETE CASCADE,
--     "title" VARCHAR(255) NOT NULL
-- );

-- DROP TABLE IF EXISTS favourite_maps CASCADE;
-- DROP TABLE IF EXISTS map_points CASCADE;
-- DROP TABLE IF EXISTS map_points CASCADE;
-- DROP TABLE IF EXISTS maps CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- -- Users
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL
-- );

-- -- Maps
-- CREATE TABLE maps (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   map_point INTEGER REFERENCES map_points(id) ON DELETE CASCADE,
--   favourite_map INTEGER REFERENCES favourite_maps(id) ON DELETE CASCADE,
--   name VARCHAR(255) NOT NULL
-- );

-- -- Map Points (shared across maps using a join table)
-- CREATE TABLE points (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   description TEXT NOT NULL,
--   image VARCHAR(255) NOT NULL
-- );

-- -- Join Table: Which points are in which maps
-- CREATE TABLE map_points (
--   id SERIAL PRIMARY KEY,
--   map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
--   point_id INTEGER NOT NULL REFERENCES map_points(id) ON DELETE CASCADE
-- );

-- -- Favourite Maps (per user)
-- CREATE TABLE favourite_maps (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE
-- );

-- Drop in the correct dependency order
DROP TABLE IF EXISTS favourite_maps CASCADE;
DROP TABLE IF EXISTS map_points CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS points CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Points (locations or items placed on a map)
CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL
);

-- Maps
CREATE TABLE maps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

-- Join table: map <-> point
CREATE TABLE map_points (
  id SERIAL PRIMARY KEY,
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
  point_id INTEGER NOT NULL REFERENCES points(id) ON DELETE CASCADE,
  UNIQUE (map_id, point_id) -- avoid duplicate links
);

-- Favourite maps
CREATE TABLE favourite_maps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
  UNIQUE (user_id, map_id) -- one user can't fav same map twice
);
