const express = require('express');
const router  = express.Router();
// markerQuery Runs a database query to insert the passed data in to the points table
const markerQuery = require('../db/queries/insert-points')
// mapPointQuery Runs a database query to insert the passed data in to the map_points table
const mapPointQuery = require('../db/queries/insert-map_points')

router.post('/', async (req, res) => {
  const { mapId, title, description, image, longitude, latitude } = req.body;

  try {
    await markerQuery.saveMarker(title, description, image, longitude, latitude)
      .then(data => {
        const point = data.id
        mapPointQuery.saveMapPoints(mapId, point)
          .then(result => {
            res.json({ success: true, marker: data, result })
          })
      })
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;