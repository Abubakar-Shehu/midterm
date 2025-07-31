const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const markerQuery = require('../db/queries/insert-marker')

router.post('/', async (req, res) => {
  const { mapId, title, description, image, longitude, latitude } = req.body;
  console.log(req.body)
  try {
    // Save to DB (adjust query/table as needed)
    await markerQuery.saveMarker(mapId, title, description, image, longitude, latitude)
      .then(data => {
        res.json({ success: true, data });
      })
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;