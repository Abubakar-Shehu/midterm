require('dotenv').config();

const express = require('express');
const router  = express.Router();
// getAllUsers Runs a database query for all users and returns an array of all users objects
const getAllUsers = require('../db/queries/users');

const apiKey =  process.env.API_KEY;

router.get('/', (req, res) => {
  getAllUsers.getUsers()
  .then(users => {
    // Find the logged-in user by session
    const user = users.find(u => u.id == req.session.user);
    const templateVars = { users, user, apiKey };
    res.render('explore', templateVars);
  })
  .catch(err => {
    res.status(500).send('Error loading users');
  });
})

module.exports = router;
