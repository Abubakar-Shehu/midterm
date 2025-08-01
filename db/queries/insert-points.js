const db = require('../connection');

const saveMarker = (title, description, image, longitude, latitude) => {
  return db.query('INSERT INTO points (title, description, image, longitude, latitude) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [title, description, image, longitude, latitude])
    .then(result => {
      return result.rows[0];
    })
    .catch (err => {
      console.log(err.message)
    })
}

module.exports = { saveMarker };