/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const getAllUsers = require('../db/queries/users');

const apiKey =  process.env.API_KEY;

router.get('/', (req, res) => {
  getAllUsers.getUsers()
  .then(users => {
    // Find the logged-in user by session
    const user = users.find(u => u.id == req.session.user);
    const templateVars = { users, user, apiKey };

    console.log('Session user:', req.session.user);
    console.log('User found:', user);

    res.render('users', templateVars);
  })
  .catch(err => {
    res.status(500).send('Error loading users');
  });
});

// Handle login form
router.post('/', (req, res) => {
  const userId = req.body.user_id;


  getAllUsers.getUsers()
    .then(users => {
      let user;

      for (const existingUser of users) {
        if (existingUser.id == userId){
          user = existingUser;
        }
      }
      // If user not found, return error
      if (!user) return res.status(400).send('User not found');

      req.session['user'] = user.id;

      res.redirect('http://localhost:8080/');
    })
    .catch(err => {
      res.status(500).send('Error logging in');
    });
});

module.exports = router;
