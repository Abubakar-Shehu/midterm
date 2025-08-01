const express = require('express');
const router = express.Router();
const { getFavouritedMapsByUserId } = require('../db/queries/maps');

console.log('users_favourite router loaded');

router.get('/', (req, res) => {
  console.log('GET /users/favourites/ route hit');

  const userId = Number(req.session.userId);

  if (!userId) return res.redirect('/users');

  getFavouritedMapsByUserId(userId)
    .then(maps => {
      console.log('Fetched favourite maps:', maps);
      res.render('favourite', {
        maps,
        user: userId,
        apiKey: process.env.API_KEY || ''
      });
    })
    .catch(err => {
      console.error('Error fetching favourite maps:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
