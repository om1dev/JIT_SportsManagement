const db = require("../db");

// GET ALL SLOTS WITH GAME INFO
exports.getAllSlots = (req, res) => {
  const sql = `
    SELECT 
      slots.id AS slot_id,
      games.name AS game_name,
      slots.day_of_week,
      slots.start_time,
      slots.end_time,
      slots.allowed_year,
      slots.allowed_section,
      slots.allowed_branch,
      slots.max_players
    FROM slots
    JOIN games ON slots.game_id = games.id
    ORDER BY slots.day_of_week, slots.start_time
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};
