const express = require('express');
const router = express.Router();
const { getFavouritedMapsByUserId } = require('../db/queries/maps');

console.log('users_favourite router loaded');

router.get('/', (req, res) => {
  console.log('GET /users/favourites/ route hit');

  const userId = req.session.user;

  if (!userId) return res.redirect('/users');

  getFavouritedMapsByUserId(userId)
    .then(favouriteMaps => {
      res.render('favourite', {
        maps: favouriteMaps,
        user: userId,
        apiKey: process.env.API_KEY  // ✅ Pass the API key to EJS
      });
    })
    .catch(err => {
      console.error('Error fetching favourite maps:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
