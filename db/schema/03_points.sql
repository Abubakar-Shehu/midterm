-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS points CASCADE;

-- Map Points (shared across maps using a join table)
CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL
);