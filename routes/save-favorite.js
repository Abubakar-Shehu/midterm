const express = require('express');
const router = express.Router();

let favoriteMapsByUser = {};

// Save favorite map for the current user
router.post('/', (req, res) => {
  console.log('Request body:', req.body);
  const userId = req.session?.userId || 'guest';
  const { favoriteMap } = req.body;

  if (favoriteMap === undefined || favoriteMap === null) {
    return res.status(400).json({ error: 'favoriteMap not provided' });
  }

  favoriteMapsByUser[userId] = favoriteMap;
  res.json({ message: 'Favorite map saved', favoriteMap });
});

// Get favorite map for the current user
router.get('/', (req, res) => {
  const userId = req.session?.userId || 'guest';
  const favoriteMap = favoriteMapsByUser[userId] || null;
  res.json({ favoriteMap });
});

module.exports = router;
