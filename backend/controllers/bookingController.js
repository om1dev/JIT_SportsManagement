const db = require("../db");

// CREATE BOOKING (student requests a slot)
exports.createBooking = (req, res) => {
  const userId = req.user.id; // from JWT
  const { slot_id } = req.body;

  if (!slot_id) {
    return res.status(400).json({ message: "slot_id is required" });
  }

  const sql = `
    INSERT INTO bookings (user_id, slot_id)
    VALUES (?, ?)
  `;

  db.query(sql, [userId, slot_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      message: "Booking request submitted. Waiting for admin approval."
    });
  });
};

// GET BOOKINGS FOR LOGGED-IN USER (guaranteed version)
exports.getMyBookings = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      b.id,
      b.status,
      s.day_of_week,
      s.start_time,
      s.end_time,
      g.name AS game_name
    FROM bookings b
    JOIN slots s ON b.slot_id = s.id
    JOIN games g ON s.game_id = g.id
    WHERE b.user_id = ?
    ORDER BY b.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log("Booking fetch error:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("Bookings found:", results);
    res.json(results);
  });
};

