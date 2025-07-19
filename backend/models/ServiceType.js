const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema({
  serviceName: { 
    type: String, 
    required: true,
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  estimatedDuration: { 
    type: Number, 
    required: true,
    min: 1,
    comment: "Duration in minutes" 
  },
  availability: [{ 
    type: String, 
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true 
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("ServiceType", serviceTypeSchema); 