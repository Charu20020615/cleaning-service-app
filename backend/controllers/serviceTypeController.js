const ServiceType = require("../models/ServiceType");

// Create a new service type
exports.createServiceType = async (req, res) => {
  try {
    const { serviceName, description, price, estimatedDuration, availability } = req.body;

    // Check if service type already exists
    const existingService = await ServiceType.findOne({ serviceName });
    if (existingService) {
      return res.status(400).json({ msg: "Service type already exists" });
    }

    const serviceType = new ServiceType({
      serviceName,
      description,
      price,
      estimatedDuration,
      availability
    });

    await serviceType.save();
    res.status(201).json({ msg: "Service type created successfully", serviceType });
  } catch (err) {
    console.error("Error creating service type:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all service types
exports.getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(serviceTypes);
  } catch (err) {
    console.error("Error fetching service types:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get service type by ID
exports.getServiceTypeById = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);
    if (!serviceType) {
      return res.status(404).json({ msg: "Service type not found" });
    }
    res.json(serviceType);
  } catch (err) {
    console.error("Error fetching service type:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update service type
exports.updateServiceType = async (req, res) => {
  try {
    const { serviceName, description, price, estimatedDuration, availability } = req.body;

    const serviceType = await ServiceType.findById(req.params.id);
    if (!serviceType) {
      return res.status(404).json({ msg: "Service type not found" });
    }

    // Check if new service name conflicts with existing one
    if (serviceName && serviceName !== serviceType.serviceName) {
      const existingService = await ServiceType.findOne({ serviceName });
      if (existingService) {
        return res.status(400).json({ msg: "Service type name already exists" });
      }
    }

    serviceType.serviceName = serviceName || serviceType.serviceName;
    serviceType.description = description || serviceType.description;
    serviceType.price = price || serviceType.price;
    serviceType.estimatedDuration = estimatedDuration || serviceType.estimatedDuration;
    serviceType.availability = availability || serviceType.availability;

    await serviceType.save();
    res.json({ msg: "Service type updated successfully", serviceType });
  } catch (err) {
    console.error("Error updating service type:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete service type (soft delete)
exports.deleteServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);
    if (!serviceType) {
      return res.status(404).json({ msg: "Service type not found" });
    }

    serviceType.isActive = false;
    await serviceType.save();
    res.json({ msg: "Service type deleted successfully" });
  } catch (err) {
    console.error("Error deleting service type:", err);
    res.status(500).json({ msg: "Server error" });
  }
}; 