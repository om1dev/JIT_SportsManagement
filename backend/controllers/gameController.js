const db = require("../db");

// GET ALL GAMES
exports.getAllGames = (req, res) => {
  db.query("SELECT * FROM games", (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};
