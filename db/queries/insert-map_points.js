const db = require('../connection');

const saveMapPoints = (map_id, point_id) => {
  return db.query('INSERT INTO map_points (map_id,point_id) VALUES ($1, $2) RETURNING *',
  [map_id, point_id])
    .then(result => {
      return result.rows[0];
    })
    .catch (err => {
      console.log(err.message)
    })
};

module.exports = { saveMapPoints };