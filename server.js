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

// Simulate testing like real user
app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = 1; // <-- integer, replace 1 with a valid user ID in your DB
  }
  next();
});
// MAKE SURE TO COMMENT OUT THE ABOVE LINE AFTER TESTING

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
      const user = users.find(u => u.id == req.session.userId);
      const templateVars = { users, user, apiKey };
      res.render('index', templateVars);
    })
    .catch(err => {
      res.status(500).send('Error loading users');
    });
});

// FOR TESTING
app.use((req, res, next) => {
  console.log(`No route matched for ${req.method} ${req.originalUrl}`);
  res.status(404).send('Page not found');
});
// FOR TESTING

// FOR TESTING
app.get('/login', (req, res) => {
  // You'll likely want to pass users and apiKey here
  getAllUsers.getUsers()
    .then(users => {
      res.render('login', { users, apiKey: process.env.API_KEY });
    })
    .catch(err => {
      res.status(500).send('Error loading login page');
    });
});
// FOR TESTING

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
