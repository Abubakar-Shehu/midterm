

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const app = express();
const mapsQuery = require('../db/queries/maps')



router.get('/', (req, res) => {
  res.render('explore');
})

module.exports = router;
