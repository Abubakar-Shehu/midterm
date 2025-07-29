/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const app = express();
const mapsQuery = require('../db/queries/maps')

router.get('/', (req, res) => {
  res.render('create');
})

module.exports = router;
