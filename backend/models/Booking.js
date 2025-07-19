const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false // Now optional for guest bookings
  },
  serviceTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceType",
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true,
    comment: "Format: HH:MM (24-hour)"
  },
  endTime: {
    type: String,
    required: true,
    comment: "Format: HH:MM (24-hour)"
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  },
  totalPrice: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient querying by date
bookingSchema.index({ bookingDate: 1, startTime: 1 });

module.exports = mongoose.model("Booking", bookingSchema); 