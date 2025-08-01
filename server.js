// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
// const session = require('express-session');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const getAllUsers = require('./db/queries/users');

const apiKey =  process.env.API_KEY;

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

const cookieKeys = process.env.COOKIE_KEY.split(',')

app.use(cookieSession({
  name: process.env.COOKIE_NAME,
  keys: cookieKeys,
  maxAge: Number(process.env.COOKIE_AGE)
}))

// Simulate testing like real user (MUST be before all routes)
app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = 1; // ALICE / othername
  }
  next();
});
// MAKE SURE TO COMMENT OUT THE ABOVE LINE AFTER TESTING

// GET /api/user/favorites
app.get('/api/user/favorites', async (req, res) => {
  const userId = req.session.userId; //

  if (!userId) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  try {
    const dbResult = await getFavouritedMapsByUserId(userId);
    const cityCoords = {
      'Toronto Map': { lat: 43.6532, lng: -79.3832 },
      'New York Map': { lat: 40.7128, lng: -74.0060 },
      'London Map': { lat: 51.5074, lng: -0.1278 },
      'Tokyo Map': { lat: 35.6895, lng: 139.6917 }
    };
    const maps = dbResult.map(map => ({
      ...map,
      ...cityCoords[map.title]
    }));
    res.json(maps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const mapApiRoutes = require('./routes/map-api');
const usersRoutes = require('./routes/users');
const createMapRoutes = require('./routes/create');
const exploreMapRoutes = require('./routes/explore');
const saveFavoriteRouter = require('./routes/save-favorite');
const logoutRoutes = require('./routes/logout')
const markerRoutes = require('./routes/markers-api')
const userFavouriteRoutes = require('./routes/users_favourite');
const apiRoutes = require('./routes/api');
const { getFavouritedMapsByUserId } = require('./db/queries/favourites');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/users/favourites', userFavouriteRoutes);
app.use('/api/users', userApiRoutes);
app.use('/api/maps', mapApiRoutes);
app.use('/users', usersRoutes);
app.use('/create', createMapRoutes);
app.use('/explore', exploreMapRoutes);
app.use('/api/save-favorite', saveFavoriteRouter);
app.use('/logout', logoutRoutes);
app.use('/api/markers', markerRoutes);
app.use('/api', apiRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/', (req, res) => {
  getAllUsers.getUsers()
    .then(users => {
      // Find the logged-in user by session
      const user = users.find(u => u.id == req.session.user);
      const templateVars = { users, user, apiKey };
      res.render('index', templateVars);
    })
    .catch(err => {
      res.status(500).send('Error loading users');
    });
});

// Page not found handler
app.use((req, res, next) => {
  console.log(`No route matched for ${req.method} ${req.originalUrl}`);
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  (`Example app listening on port ${PORT}`);
});
