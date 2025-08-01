const db = require('../connection');

const getFavouritedMapsByUserId = (userId) => {
  return db.query(`
    SELECT maps.*
    FROM favourites
    JOIN maps ON favourites.map_id = maps.id
    WHERE favourites.user_id = $1;
  `, [userId])
    .then(res => res.rows);
};

const saveFavoriteMapForUser = (userId, mapId) => {
  // Prevent duplicate favorites with ON CONFLICT
  return db.query(`
    INSERT INTO favourites (user_id, map_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING;
  `, [userId, mapId]);
};

const deleteFavoriteMapForUser = (userId, mapId) => {
  return db.query(
    `DELETE FROM favourites WHERE user_id = $1 AND map_id = $2;`,
    [userId, mapId]
  );
};

module.exports = { getFavouritedMapsByUserId, saveFavoriteMapForUser, deleteFavoriteMapForUser };
