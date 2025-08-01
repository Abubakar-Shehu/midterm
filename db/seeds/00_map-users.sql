-- -- Seed users
-- INSERT INTO users (name, email) VALUES
--   ('Alice Walker', 'alice@nait.ca'),
--   ('Ben Carter', 'ben@nait.ca'),
--   ('Chloe Ahmed', 'chloe@nait.ca');

-- -- Seed maps
-- INSERT INTO maps (user_id, name, map_link) VALUES
--   (1, 'Nature Trails', 'https://maps.example.com/nature'),
--   (2, 'City Bites', 'https://maps.example.com/food'),
--   (3, 'Museum Tour', 'https://maps.example.com/museum');

-- -- Seed map_points
-- INSERT INTO map_points (title, description, image) VALUES
--   ('River Valley', 'A scenic riverside walking path.', 'river.jpg'),
--   ('Burger Alley', 'A street lined with top burger joints.', 'burgers.jpg'),
--   ('Tech Museum', 'Explore the history of Canadian tech.', 'tech.jpg'),
--   ('Botanical Garden', 'Diverse plant life and peaceful paths.', 'garden.jpg'),
--   ('City Plaza', 'Bustling plaza with entertainment.', 'plaza.jpg');

-- -- Seed map_map_points (joining maps and points)
-- INSERT INTO map_map_points (map_id, map_point_id) VALUES
--   (1, 1),
--   (1, 4),
--   (2, 2),
--   (2, 5),
--   (3, 3);

-- -- Seed favourite_maps
-- INSERT INTO favourite_maps (user_id, map_id, title) VALUES
--   (1, 2, 'Alice’s Food Faves'),
--   (2, 1, 'Ben’s Nature Picks'),
--   (3, 3, 'Chloe’s Tech Tour');

-- -- Insert users
-- INSERT INTO users (name, email) VALUES
--   ('Alice Walker', 'alice@nait.ca'),
--   ('Ben Carter', 'ben@nait.ca'),
--   ('Chloe Ahmed', 'chloe@nait.ca');

-- -- Insert points
-- INSERT INTO points (title, description, image) VALUES
--   ('River Valley', 'A scenic riverside walking path in Edmonton.', 'river.jpg'),
--   ('Burger Alley', 'A street lined with top burger joints.', 'burgers.jpg'),
--   ('Tech Museum', 'Explore the history of Canadian technology.', 'tech.jpg'),
--   ('Botanical Garden', 'Lush garden with diverse plant species.', 'garden.jpg'),
--   ('City Plaza', 'Main plaza filled with local art and performers.', 'plaza.jpg');

-- -- Insert maps
-- INSERT INTO maps (user_id, name, latitude, longitude) VALUES
--   (1, 'Toronto', 43.6532, -79.3832),
--   (2, 'New York', 40.7128, -74.0060),
--   (3, 'London', 51.5074, -0.1278);

-- -- Join points to maps
-- INSERT INTO map_points (map_id, point_id) VALUES
--   (1, 1),
--   (1, 4),
--   (2, 2),
--   (2, 5),
--   (3, 3);

-- -- Insert favourite_maps
-- INSERT INTO favourite_maps (user_id, map_id) VALUES
--   (1, 2),
--   (2, 1),
--   (3, 3);

-- Insert users
INSERT INTO users (name, email) VALUES
  ('Alice Walker', 'alice@nait.ca'),
  ('Ben Carter', 'ben@nait.ca'),
  ('Chloe Ahmed', 'chloe@nait.ca');

-- Insert points
INSERT INTO points (title, description, image, longitude, latitude) VALUES
  ('River Valley', 'A riverside walking path in Edmonton.', 'river.jpg', -113.4938, 53.5461);
  -- ('Burger Alley', 'A street of local burger joints.', 'burgers.jpg', -113.4910, 53.5450),
  -- ('Tech Museum', 'Canada’s tech innovation museum.', 'tech.jpg', -113.4945, 53.5470),
  -- ('Botanical Garden', 'A lush garden with rare plants.', 'garden.jpg', -113.4922, 53.5465),
  -- ('City Plaza', 'The heart of the city’s festivities.', 'plaza.jpg', -113.4905, 53.5447);

-- Insert maps
INSERT INTO maps (user_id, name, latitude, longitude) VALUES
  (1, 'Toronto', 43.6532, -79.3832),
  (2, 'New York', 40.7128, -74.0060),
  (3, 'London', 51.5074, -0.1278);

-- Insert favourite_maps
INSERT INTO favourite_maps (user_id, map_id) VALUES
  (1, 2),
  (2, 1),
  (3, 3);