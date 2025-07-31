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

const apiKey =  process.env.API_KEY;

router.get('/', (req, res) => {
  getAllUsers.getUsers()
  .then(users => {
    // Find the logged-in user by session
    const user = users.find(u => u.id == req.session.user);
    const templateVars = { users, user, apiKey };
    res.render('create', templateVars);
  })
  .catch(err => {
    res.status(500).send('Error loading users');
  });
})

router.get('/:id', (req, res) => {
  getAllUsers.getUsers()
  .then(users => {
    // Find the logged-in user by session
    const user = users.find(u => u.id == req.session.user);
    const mapId = req.params.id;
    mapsQuery.getMaps()
      .then(maps => {
        let neededMap;

        for (const availableMap of maps) {
          if (availableMap.id == mapId){
            neededMap = availableMap;
          }
        }

        const mapName = neededMap.name

        const templateVars = { users, user, mapName, mapId, apiKey };
        res.render('create_maps', templateVars);
      })
  })
  .catch(err => {
    res.status(500).send('Error loading users');
  });
});

module.exports = router;
