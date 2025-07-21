import { useState, useEffect } from "react";
import axios from "axios";

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    estimatedDuration: "",
    availability: []
  });
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/service-types");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/all");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`http://localhost:5000/api/service-types/${editingService._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/service-types", formData);
      }
      setShowForm(false);
      setEditingService(null);
      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      alert(error.response?.data?.msg || "Error saving service");
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      serviceName: service.serviceName,
      description: service.description,
      price: service.price.toString(),
      estimatedDuration: service.estimatedDuration.toString(),
      availability: service.availability
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:5000/api/service-types/${serviceId}`);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
        alert(error.response?.data?.msg || "Error deleting service");
      }
    }
  };

  const handleBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, { status });
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.msg || "Error updating booking status");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to permanently delete this booking? This cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.msg || "Error deleting booking");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      serviceName: "",
      description: "",
      price: "",
      estimatedDuration: "",
      availability: []
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingService(null);
              resetForm();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Add New Service
          </button>
        </div>

        {/* Service Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (LKR)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Duration (minutes)
                </label>
                <input
                  type="number"
                  name="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.availability.includes(day)}
                        onChange={() => handleAvailabilityChange(day)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                >
                  {editingService ? "Update Service" : "Create Service"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                    resetForm();
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {services.map(service => (
            <div key={service._id} className="bg-white rounded-xl shadow p-3">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-gray-900">{service.serviceName}</h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-2 text-xs">{service.description}</p>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-semibold">LKR {service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-semibold">{formatDuration(service.estimatedDuration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available:</span>
                  <span className="font-semibold text-xs">
                    {service.availability.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Booking Management */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All User Bookings</h2>
          {bookingsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading bookings...</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {bookings.map(booking => (
                    <tr key={booking._id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{booking.serviceTypeId?.serviceName}</div>
                        <div className="text-xs text-gray-500">LKR {booking.totalPrice}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-gray-900">{booking.customerName || booking.userId?.name || "-"}</div>
                        <div className="text-xs text-gray-500">{booking.customerPhone || booking.userId?.email || "-"}</div>
                        <div className="text-xs text-gray-400">{booking.customerAddress || "-"}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{booking.startTime} - {booking.endTime}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleBookingStatus(booking._id, 'confirmed')}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleBookingStatus(booking._id, 'cancelled')}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleBookingStatus(booking._id, 'completed')}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium"
                          >
                            Done
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {services.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found. Create your first service!</p>
          </div>
        )}
      </div>
    </div>
  );
} 