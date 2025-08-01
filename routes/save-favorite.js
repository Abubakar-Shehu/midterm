const express = require('express');
const router = express.Router();
const { saveFavoriteMapForUser, getFavouritedMapsByUserId, deleteFavoriteMapForUser } = require('../db/queries/favourites');
// Delete a favorite map for the current user
router.delete('/:mapId', async (req, res) => {
  const userId = req.session?.userId;
  const mapId = req.params.mapId;
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  if (!mapId) {
    return res.status(400).json({ error: 'mapId not provided' });
  }
  try {
    await deleteFavoriteMapForUser(userId, mapId);
    res.json({ message: 'Favorite map deleted', mapId });
  } catch (err) {
    console.error('Error deleting favorite map:', err);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

// Save favorite map for the current user (persist to DB)
router.post('/', async (req, res) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  const { favoriteMap } = req.body;
  if (!favoriteMap) {
    return res.status(400).json({ error: 'favoriteMap not provided' });
  }
  try {
    await saveFavoriteMapForUser(userId, favoriteMap);
    res.json({ message: 'Favorite map saved', favoriteMap });
  } catch (err) {
    console.error('Error saving favorite map:', err);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// Get all favorite maps for the current user (from DB)
router.get('/', async (req, res) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  try {
    const maps = await getFavouritedMapsByUserId(userId);
    res.json(maps);
  } catch (err) {
    console.error('Error fetching favorite maps:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

module.exports = router;
