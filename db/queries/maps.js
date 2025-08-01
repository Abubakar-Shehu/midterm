const db = require('../connection');

const getMaps = () => {
  return db.query(`SELECT * FROM maps;`)
    .then(data => data.rows);
};

const getFavouritedMapsByUserId = (userId) => {
  const query = `
    SELECT maps.*
    FROM maps
    JOIN favourites ON maps.id = favourites.map_id
    WHERE favourites.user_id = $1;
  `;
  return db.query(query, [userId])
    .then(data => data.rows);
};

module.exports = {
  getMaps,
  getFavouritedMapsByUserId
};
