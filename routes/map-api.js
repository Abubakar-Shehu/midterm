/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const needle = require('needle');

router.get('/', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  needle('GET', url)
    .then(response => {
      res.send(response.body)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
