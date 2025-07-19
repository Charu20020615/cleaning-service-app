const express = require("express");
const router = express.Router();
const {
  createServiceType,
  getAllServiceTypes,
  getServiceTypeById,
  updateServiceType,
  deleteServiceType
} = require("../controllers/serviceTypeController");

// Create a new service type
router.post("/", createServiceType);

// Get all service types
router.get("/", getAllServiceTypes);

// Get service type by ID
router.get("/:id", getServiceTypeById);

// Update service type
router.put("/:id", updateServiceType);

// Delete service type
router.delete("/:id", deleteServiceType);

module.exports = router; 