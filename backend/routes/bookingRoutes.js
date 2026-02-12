const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings
} = require("../controllers/bookingController");
const { verifyAccessToken } = require("../middleware/authMiddleware");

router.post("/", verifyAccessToken, createBooking);
router.get("/my", verifyAccessToken, getMyBookings);

module.exports = router;
