const Booking = require("../models/Booking");
const ServiceType = require("../models/ServiceType");

// Helper function to convert time string to minutes
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes to time string
const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Helper function to check if two time ranges overlap
const isOverlapping = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};

// Get available time slots for a service on a specific date
exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { serviceTypeId, date } = req.query;

    if (!serviceTypeId || !date) {
      return res.status(400).json({ msg: "Service type ID and date are required" });
    }

    // Get service type details
    const serviceType = await ServiceType.findById(serviceTypeId);
    if (!serviceType) {
      return res.status(404).json({ msg: "Service type not found" });
    }

    // Check if the service is available on the selected day
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!serviceType.availability.includes(dayOfWeek)) {
      return res.status(400).json({ 
        msg: `This service is not available on ${dayOfWeek}`,
        availableDays: serviceType.availability 
      });
    }

    // Business hours (9 AM to 6 PM)
    const businessStart = 9 * 60; // 9:00 AM in minutes
    const businessEnd = 18 * 60;   // 6:00 PM in minutes
    const serviceDuration = serviceType.estimatedDuration;

    // Get existing bookings for the date
    const existingBookings = await Booking.find({
      bookingDate: {
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(selectedDate.setHours(23, 59, 59, 999))
      },
      status: { $nin: ['cancelled'] }
    }).sort({ startTime: 1 });

    // Generate all possible time slots
    const timeSlots = [];
    for (let start = businessStart; start + serviceDuration <= businessEnd; start += 30) {
      const end = start + serviceDuration;
      const startTime = minutesToTime(start);
      const endTime = minutesToTime(end);

      // Check if this slot conflicts with any existing booking
      let isAvailable = true;
      for (const booking of existingBookings) {
        const bookingStart = timeToMinutes(booking.startTime);
        const bookingEnd = timeToMinutes(booking.endTime);

        if (isOverlapping(start, end, bookingStart, bookingEnd)) {
          isAvailable = false;
          break;
        }
      }

      if (isAvailable) {
        timeSlots.push({
          startTime,
          endTime,
          displayTime: `${startTime} - ${endTime}`
        });
      }
    }

    res.json({
      serviceType: {
        id: serviceType._id,
        serviceName: serviceType.serviceName,
        price: serviceType.price,
        duration: serviceType.estimatedDuration
      },
      date: date,
      availableSlots: timeSlots,
      businessHours: {
        start: "09:00",
        end: "18:00"
      }
    });

  } catch (err) {
    console.error("Error getting available time slots:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { serviceTypeId, bookingDate, startTime, notes, customerName, customerPhone, customerAddress } = req.body;
    const userId = req.user?.id;

    // Validate required fields
    if (!serviceTypeId || !bookingDate || !startTime || !customerName || !customerPhone || !customerAddress) {
      return res.status(400).json({ msg: "Service type, date, start time, name, phone, and address are required" });
    }

    // Get service type details
    const serviceType = await ServiceType.findById(serviceTypeId);
    if (!serviceType) {
      return res.status(404).json({ msg: "Service type not found" });
    }

    // Calculate end time
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + serviceType.estimatedDuration;
    const endTime = minutesToTime(endMinutes);

    // Check if the time slot is still available
    const conflictingBooking = await Booking.findOne({
      bookingDate: new Date(bookingDate),
      status: { $nin: ['cancelled'] },
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({ msg: "This time slot is no longer available" });
    }

    // Prepare booking data
    const bookingData = {
      serviceTypeId,
      bookingDate: new Date(bookingDate),
      startTime,
      endTime,
      totalPrice: serviceType.price,
      notes: notes || "",
      customerName,
      customerPhone,
      customerAddress
    };
    if (userId) {
      bookingData.userId = userId;
    }

    // Create the booking
    const booking = new Booking(bookingData);

    await booking.save();

    // Populate service type details for response
    await booking.populate('serviceTypeId', 'serviceName price estimatedDuration');

    res.status(201).json({
      msg: "Booking created successfully",
      booking
    });

  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.json([]); // No user logged in, return empty array
    }
    const bookings = await Booking.find({ userId })
      .populate('serviceTypeId', 'serviceName price estimatedDuration')
      .sort({ bookingDate: -1, startTime: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all bookings (for admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('serviceTypeId', 'serviceName price estimatedDuration')
      .sort({ bookingDate: -1, startTime: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching all bookings:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ msg: "Booking status updated successfully", booking });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || "temp-user-id";

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Check if user owns the booking or is admin
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ msg: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ msg: "Server error" });
  }
}; 