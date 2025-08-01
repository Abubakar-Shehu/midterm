const express = require('express');
const router = express.Router();

let favoriteMapsByUser = {};

router.post('/', (req, res) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { favoriteMap } = req.body;

  if (!favoriteMap) {
    return res.status(400).json({ error: 'favoriteMap not provided' });
  }

  favoriteMapsByUser[userId] = favoriteMap;

  res.json({ message: 'Favorite map saved', favoriteMap });
});

router.get('/', (req, res) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const favoriteMap = favoriteMapsByUser[userId] || null;
  res.json({ favoriteMap });
});

module.exports = router;
