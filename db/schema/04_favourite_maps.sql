-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS favourite_maps CASCADE;

-- Favourite Maps (per user)
CREATE TABLE favourite_maps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE
);