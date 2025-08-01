const pool = require('../connection'); // adjust this if you use a different pool setup

const getFavouritedMapsByUserId = (userId) => {
  const query = `
    SELECT maps.*
    FROM favourites
    JOIN maps ON favourites.map_id = maps.id
    WHERE favourites.user_id = $1;
  `;
  return pool.query(query, [userId])
    .then(res => res.rows);
};

module.exports = { getFavouritedMapsByUserId };
