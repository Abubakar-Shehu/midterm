/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const app = express();
const mapsQuery = require('../db/queries/maps')
const getAllUsers = require('../db/queries/users');

router.get('/', (req, res) => {
  getAllUsers.getUsers()
  .then(users => {
    // Find the logged-in user by session
    const user = users.find(u => u.id == req.session.user);
    const templateVars = { users, user };
    res.render('create', templateVars);
  })
  .catch(err => {
    res.status(500).send('Error loading users');
  });
})

router.get('/:id', (req, res) => {
  const mapId = req.params.id;
  res.render('create_map', { mapId });
});

module.exports = router;
