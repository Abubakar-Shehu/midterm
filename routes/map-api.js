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

router.get('/', (req, res) => {
  mapsQuery.getMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST: Create a new map
router.post('/', (req, res) => {
  const { userId, name, latitude, longitude } = req.body;

  db.query(`
    INSERT INTO maps (user_id, name, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `, [userId, name, latitude, longitude])
    .then(result => {
      const mapId = result.rows[0].id;
      res.json({ mapId });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create map' });
    });
});

module.exports = router;
