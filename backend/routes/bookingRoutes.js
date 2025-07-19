const express = require("express");
const router = express.Router();
const {
  getAvailableTimeSlots,
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} = require("../controllers/bookingController");
const auth = require("../middleware/auth");

// Get available time slots for a service on a specific date
router.get("/available-slots", getAvailableTimeSlots);

// Create a new booking (protected)
router.post("/", auth, createBooking);

// Get user's bookings (protected)
router.get("/user", auth, getUserBookings);

// Get all bookings (for admin)
router.get("/all", getAllBookings);

// Update booking status
router.put("/:id/status", updateBookingStatus);

// Cancel booking
router.put("/:id/cancel", cancelBooking);

module.exports = router; 