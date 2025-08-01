/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
// mapsQuery Runs a database query for all maps and returns an array of all map objects
const mapsQuery = require('../db/queries/maps');
// markerQuery Runs a database query to insert the passed data in to the points table
const markerQuery = require('../db/queries/insert-points')
// mapPointQuery Runs a database query to insert the passed data in to the map_points table
const mapPointQuery = require('../db/queries/insert-map_points')


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

router.post('/with-markers', async (req, res) => {
  const { mapId, markers, userId } = req.body;
  if (!mapId || !Array.isArray(markers) || markers.length === 0) {
    return res.status(400).json({ error: 'Missing mapId or markers' });
  }

  try {
    for (const marker of markers) {
      const { title, description, image, longitude, latitude } = marker;
      const point = await markerQuery.saveMarker(title, description, image, longitude, latitude);

      await mapPointQuery.saveMapPoints(mapId, point.id, userId);
    }
    res.json({ success: true });

  } catch (err) {
    console.error('Error saving map and markers:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
