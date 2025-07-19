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

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get("http://localhost:5000/api/bookings/user", config);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
        alert("Booking cancelled successfully!");
        fetchBookings();
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert(error.response?.data?.msg || "Error cancelling booking");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0612] relative overflow-hidden flex items-center justify-center">
        <ModernGradientBackground />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0612] relative overflow-hidden p-6">
      <ModernGradientBackground />
      {/* Navigation Bar */}
      <nav className="bg-[#18122b]/80 border-b border-[#2d2346] shadow-2xl sticky top-0 z-20 backdrop-blur-md mb-8 rounded-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-6">
            <Link to="/home" className="text-gray-100 hover:text-blue-400 font-semibold">Home</Link>
            <Link to="/booking" className="text-gray-100 hover:text-blue-400 font-semibold">Book a Service</Link>
            <Link to="/my-bookings" className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1">My Bookings</Link>
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
          <h1 className="text-3xl font-extrabold text-gray-100 mb-2 drop-shadow-lg">My Bookings</h1>
          <p className="text-gray-300 text-lg">View and manage your service bookings</p>
        </div>
        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <div key={booking._id} className="bg-[#18122b]/90 border border-[#2d2346] rounded-2xl shadow-2xl p-6 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-100">
                          {booking.serviceTypeId?.serviceName}
                        </h3>
                        <p className="text-gray-300 mt-1">
                          {formatDate(booking.bookingDate)} at {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <div className="font-bold text-purple-600">LKR {booking.totalPrice}</div>
                          <div className="text-sm text-gray-500">
                            {formatDuration(booking.serviceTypeId?.estimatedDuration)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Service Details</h4>
                        <div className="space-y-1 text-sm">
                          <div><span className="text-gray-500">Service:</span> {booking.serviceTypeId?.serviceName}</div>
                          <div><span className="text-gray-500">Duration:</span> {formatDuration(booking.serviceTypeId?.estimatedDuration)}</div>
                          <div><span className="text-gray-500">Price:</span> LKR {booking.totalPrice}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Booking Details</h4>
                        <div className="space-y-1 text-sm">
                          <div><span className="text-gray-500">Date:</span> {formatDate(booking.bookingDate)}</div>
                          <div><span className="text-gray-500">Time:</span> {booking.startTime} - {booking.endTime}</div>
                          <div><span className="text-gray-500">Status:</span> {booking.status}</div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {booking.notes && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                        <p className="text-sm text-gray-700">{booking.notes}</p>
                      </div>
                    )}

                    {/* Booking Actions */}
                    <div className="flex flex-wrap gap-3">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                          >
                            Cancel Booking
                          </button>
                          <span className="text-sm text-gray-500 flex items-center">
                            Your booking is confirmed! We'll see you soon.
                          </span>
                        </div>
                      )}

                      {booking.status === 'completed' && (
                        <span className="text-sm text-green-600 font-medium">
                          ✓ Service completed successfully
                        </span>
                      )}

                      {booking.status === 'cancelled' && (
                        <span className="text-sm text-red-600 font-medium">
                          ✗ This booking has been cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't made any bookings yet. Start by booking a service!
                </p>
                <button
                  onClick={() => window.location.href = '/booking'}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                >
                  Book a Service
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 