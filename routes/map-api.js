/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM maps`;
  console.log(query);
  db.query(query)
    .then(data => {
      const maps = data.rows;
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

let favoriteLocations = []; // Replace with DB later

router.post('/favorite', (req, res) => {
  const { lat, lng } = req.body;
  if (lat && lng) {
    favoriteLocations.push({ lat, lng });
    res.status(200).json({ message: 'Saved!' });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.get('/favorite', (req, res) => {
  res.json({ favorites: favoriteLocations });
});

module.exports = router;
