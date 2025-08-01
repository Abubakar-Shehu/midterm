/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
// mapsQuery Runs a database query for all maps and returns an array of all map objects
const mapsQuery = require('../db/queries/maps');
// getAllUsers Runs a database query for all users and returns an array of all users objects
const getAllUsers = require('../db/queries/users');

const apiKey = process.env.API_KEY;

// Route to show all maps (homepage for city selection)
router.get('/', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/');
  } else {
    getAllUsers.getUsers()
      .then(users => {
        const userId = req.session.user;
        const user = users.find(u => u.id == req.session.user);
        db.query(`
          SELECT * FROM maps
          WHERE user_id = $1
          ORDER BY id DESC;
        `, [userId])
          .then(result => {
            const maps = result.rows;
            const templateVars = { users, user, maps, apiKey };
            res.render('create', templateVars);
          })
          .catch(err => {
            console.error('Error loading user maps:', err);
            res.status(500).send('Could not load maps');
          });
      })
      .catch(err => {
        res.status(500).send('Error loading users');
      });
  }
});

// Route to show a specific map creation page
router.get('/:id', (req, res) => {
  getAllUsers.getUsers()
    .then(users => {
      const user = users.find(u => u.id == req.session.user);
      const mapId = Number(req.params.id);

      mapsQuery.getMaps()
        .then(maps => {
          const neededMap = maps.find(m => m.id === mapId);

          if (!neededMap) {
            return res.status(404).send('Map not found');
          }

          const templateVars = {
            users,
            user,
            mapName: neededMap.name,
            mapId: neededMap.id,
            apiKey
          };

          res.render('create_maps', templateVars);
        });
    })
    .catch(err => {
      console.error('Error loading data:', err);
      res.status(500).send('Server error');
    });
});

module.exports = router;
