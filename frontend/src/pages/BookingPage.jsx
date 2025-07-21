import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ModernGradientBackground() {
  const particlesRef = useRef(null);
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;
    const particleCount = 80;
    let running = true;
    let particles = [];
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      resetParticle(particle);
      particlesContainer.appendChild(particle);
      animateParticle(particle);
      particles.push(particle);
    }
    function resetParticle(particle) {
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = '0';
      return { x: posX, y: posY };
    }
    function animateParticle(particle) {
      const pos = resetParticle(particle);
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      setTimeout(() => {
        if (!running) return;
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        setTimeout(() => {
          if (!running) return;
          animateParticle(particle);
        }, duration * 1000);
      }, delay * 1000);
    }
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
    function handleMouseMove(e) {
      const mouseX = (e.clientX / window.innerWidth) * 100;
      const mouseY = (e.clientY / window.innerHeight) * 100;
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${mouseX}%`;
      particle.style.top = `${mouseY}%`;
      particle.style.opacity = '0.6';
      particlesContainer.appendChild(particle);
      setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';
        setTimeout(() => {
          particle.remove();
        }, 2000);
      }, 10);
      const spheres = document.querySelectorAll('.gradient-sphere');
      const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
      spheres.forEach(sphere => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      running = false;
      document.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(p => p.remove());
    };
  }, []);
  return (
    <>
      <div className="gradient-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
        <div className="glow"></div>
        <div className="grid-overlay"></div>
        <div className="noise-overlay"></div>
        <div className="particles-container" ref={particlesRef}></div>
      </div>
      <style>{`
        .gradient-background { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; overflow: hidden; }
        .gradient-sphere { position: absolute; border-radius: 50%; filter: blur(60px); }
        .sphere-1 { width: 40vw; height: 40vw; background: linear-gradient(40deg, rgba(255,0,128,0.8), rgba(255,102,0,0.4)); top: -10%; left: -10%; animation: float-1 15s ease-in-out infinite alternate; }
        .sphere-2 { width: 45vw; height: 45vw; background: linear-gradient(240deg, rgba(72,0,255,0.8), rgba(0,183,255,0.4)); bottom: -20%; right: -10%; animation: float-2 18s ease-in-out infinite alternate; }
        .sphere-3 { width: 30vw; height: 30vw; background: linear-gradient(120deg, rgba(133,89,255,0.5), rgba(98,216,249,0.3)); top: 60%; left: 20%; animation: float-3 20s ease-in-out infinite alternate; }
        @keyframes float-1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(10%,10%) scale(1.1); } }
        @keyframes float-2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-10%,-5%) scale(1.15); } }
        @keyframes float-3 { 0% { transform: translate(0,0) scale(1); opacity: 0.3; } 100% { transform: translate(-5%,10%) scale(1.05); opacity: 0.6; } }
        .noise-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.05; z-index: 5; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .grid-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px); z-index: 2; }
        .glow { position: absolute; width: 40vw; height: 40vh; background: radial-gradient(circle, rgba(72,0,255,0.15), transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; animation: pulse 8s infinite alternate; filter: blur(30px); }
        @keyframes pulse { 0% { opacity: 0.3; transform: translate(-50%,-50%) scale(0.9); } 100% { opacity: 0.7; transform: translate(-50%,-50%) scale(1.1); } }
        .particles-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none; }
        .particle { position: absolute; background: white; border-radius: 50%; opacity: 0; pointer-events: none; }
      `}</style>
    </>
  );
}

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/service-types");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchAvailableSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/available-slots?serviceTypeId=${selectedService._id}&date=${selectedDate}`
      );
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      if (error.response?.data?.msg) {
        alert(error.response.data.msg);
      }
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in your name, phone number, and address.");
      return;
    }
    setBookingLoading(true);
    try {
      const bookingData = {
        serviceTypeId: selectedService._id,
        bookingDate: selectedDate,
        startTime: selectedSlot.startTime,
        notes: notes,
        customerName,
        customerPhone,
        customerAddress
      };
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.post("http://localhost:5000/api/bookings", bookingData, config);
      alert("Booking created successfully!");
      // Reset form
      setSelectedService(null);
      setSelectedDate("");
      setSelectedSlot(null);
      setNotes("");
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setAvailableSlots([]);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(error.response?.data?.msg || "Error creating booking");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/");
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#0a0612] relative overflow-hidden p-6">
      <ModernGradientBackground />
      {/* Navigation Bar */}
      <nav className="bg-[#18122b]/80 border-b border-[#2d2346] shadow-2xl sticky top-0 z-20 backdrop-blur-md mb-8 rounded-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-6">
            <Link to="/home" className="text-gray-100 hover:text-blue-400 font-semibold">Home</Link>
            <Link to="/booking" className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1">Book a Service</Link>
            <Link to="/my-bookings" className="text-gray-100 hover:text-blue-400 font-semibold">My Bookings</Link>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold border border-[#2d2346] transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-100 mb-2 drop-shadow-lg">Book a Service</h1>
          <p className="text-gray-300 text-lg">Select a service and choose your preferred time slot</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Date and Service Selection */}
          <div className="space-y-6">
            {/* Date Selection - now always visible */}
            <div className="bg-[#18122b]/90 border border-[#2d2346] rounded-2xl shadow-2xl p-6 backdrop-blur-md">
              <h2 className="text-xl font-bold text-gray-100 mb-4">1. Select Date</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                className="w-full px-4 py-3 border border-[#2d2346] rounded-lg bg-[#18122b] text-gray-100 focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              {selectedDate && (
                <p className="text-sm text-gray-300 mt-2">
                  Selected: {formatDate(selectedDate)}
                </p>
              )}
            </div>
            {/* Service Selection */}
            <div className="bg-[#18122b]/90 border border-[#2d2346] rounded-2xl shadow-2xl p-6 backdrop-blur-md">
              <h2 className="text-xl font-bold text-gray-100 mb-4">2. Choose a Service</h2>
              <div className="space-y-3">
                {services.map(service => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
                      selectedService?._id === service._id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-[#2d2346] hover:border-green-400 hover:bg-green-900/10'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-100">{service.serviceName}</h3>
                        <p className="text-sm text-gray-300 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">LKR {service.price}</div>
                        <div className="text-sm text-gray-400">{formatDuration(service.estimatedDuration)}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Available: {service.availability.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column - Time Slots and Booking */}
          <div className="space-y-6">
            {/* Time Slots */}
            {selectedService && selectedDate && (
              <div className="bg-[#18122b]/90 border border-[#2d2346] rounded-2xl shadow-2xl p-6 backdrop-blur-md">
                <h2 className="text-xl font-bold text-gray-100 mb-4">3. Choose Time Slot</h2>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                    <span className="ml-2 text-gray-300">Loading available slots...</span>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2 border-2 rounded-md text-center transition duration-200 text-xs ${
                          selectedSlot?.startTime === slot.startTime
                            ? 'border-green-400 bg-green-900/30 text-green-200'
                            : 'border-[#2d2346] hover:border-green-400 hover:bg-green-900/10 text-gray-100'
                        }`}
                        style={{ minWidth: 0 }}
                      >
                        <div className="font-semibold text-xs">{slot.startTime}</div>
                        <div className="text-[10px] text-gray-400">to {slot.endTime}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No available slots for this date</p>
                    <p className="text-sm text-gray-500 mt-1">Try selecting a different date</p>
                  </div>
                )}
              </div>
            )}
            {/* Booking Form */}
            {selectedSlot && (
              <div className="bg-[#18122b]/90 border border-[#2d2346] rounded-2xl shadow-2xl p-6 backdrop-blur-md">
                <h2 className="text-xl font-bold text-gray-100 mb-4">4. Complete Booking</h2>
                <div className="space-y-4">
                  <div className="bg-[#2d2346]/60 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-100 mb-2">Booking Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-400">Service:</span> {selectedService.serviceName}</div>
                      <div><span className="text-gray-400">Date:</span> {formatDate(selectedDate)}</div>
                      <div><span className="text-gray-400">Time:</span> {selectedSlot.startTime} - {selectedSlot.endTime}</div>
                      <div><span className="text-gray-400">Duration:</span> {formatDuration(selectedService.estimatedDuration)}</div>
                      <div><span className="text-gray-400">Price:</span> <span className="font-semibold text-green-400">LKR {selectedService.price}</span></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-[#2d2346] rounded-lg bg-[#18122b] text-gray-100 focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-[#2d2346] rounded-lg bg-[#18122b] text-gray-100 focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={e => setCustomerAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="w-full px-4 py-3 border border-[#2d2346] rounded-lg bg-[#18122b] text-gray-100 focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows="3"
                      placeholder="Any special instructions or requests..."
                      className="w-full px-4 py-3 border border-[#2d2346] rounded-lg bg-[#18122b] text-gray-100 focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
                  >
                    {bookingLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Booking...
                      </div>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 