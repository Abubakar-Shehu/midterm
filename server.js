// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const getAllUsers = require('./db/queries/users');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'bam',
  keys: ["bach-abu-makenzie"],
  maxAge: 300 * 1000
}))

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const mapApiRoutes = require('./routes/map-api');
const usersRoutes = require('./routes/users');
const createMapRoutes = require('./routes/create');
const exploreMapRoutes = require('./routes/explore');
const logoutRoutes = require('./routes/logout')


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/maps', mapApiRoutes);
app.use('/users', usersRoutes);
app.use('/create', createMapRoutes);
app.use('/explore', exploreMapRoutes);
app.use('/logout', logoutRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  getAllUsers.getUsers()
    .then(users => {
      // Find the logged-in user by session
      const user = users.find(u => u.id == req.session.user);
      const templateVars = { users, user };
      res.render('index', templateVars);
    })
    .catch(err => {
      res.status(500).send('Error loading users');
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
