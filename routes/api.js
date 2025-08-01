// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/save-favorite', (req, res) => {
  const { userId, mapId } = req.body;

  if (!userId || !mapId) {
    return res.status(400).json({ error: 'Missing userId or mapId' });
  }

  const query = `
    INSERT INTO favourites (user_id, map_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *;
  `;

  db.query(query, [userId, mapId])
    .then(result => {
      res.status(200).json({ success: true, favourite: result.rows[0] });
    })
    .catch(err => {
      console.error('Error saving favourite:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
