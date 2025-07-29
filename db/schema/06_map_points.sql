-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS map_map_points CASCADE;

CREATE TABLE map_points (
  id SERIAL PRIMARY KEY,
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
  point_id INTEGER NOT NULL REFERENCES map_points(id) ON DELETE CASCADE
);