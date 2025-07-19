import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
        .gradient-background {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; overflow: hidden;
        }
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

function Home() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, spent: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (!isLoggedIn || !userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  useEffect(() => {
    if (user) fetchStats();
    // eslint-disable-next-line
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await axios.get("http://localhost:5000/api/bookings/user", config);
      const bookings = res.data || [];
      const total = bookings.length;
      const active = bookings.filter(b => b.status === "pending" || b.status === "confirmed").length;
      const completed = bookings.filter(b => b.status === "completed").length;
      const spent = bookings
        .filter(b => b.status === "completed")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      setStats({ total, active, completed, spent });
    } catch (err) {
      setStats({ total: 0, active: 0, completed: 0, spent: 0 });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
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
            <Link to="/home" className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1">Home</Link>
            <Link to="/booking" className="text-gray-100 hover:text-blue-400 font-semibold">Book a Service</Link>
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 justify-center items-center">
          <Link
            to="/booking"
            className="flex-1 min-w-[220px] max-w-xs bg-[#18122b]/90 border border-[#2d2346] text-white p-8 rounded-3xl shadow-2xl hover:shadow-2xl transition duration-200 transform hover:-translate-y-1 flex flex-col items-center group backdrop-blur-md"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition">📅</div>
            <h3 className="text-xl font-bold mb-1">Book a Service</h3>
            <p className="text-blue-200 text-sm text-center">Schedule a cleaning service</p>
          </Link>

          <Link
            to="/my-bookings"
            className="flex-1 min-w-[220px] max-w-xs bg-[#18122b]/90 border border-[#2d2346] text-white p-8 rounded-3xl shadow-2xl hover:shadow-2xl transition duration-200 transform hover:-translate-y-1 flex flex-col items-center group backdrop-blur-md"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition">📋</div>
            <h3 className="text-xl font-bold mb-1">My Bookings</h3>
            <p className="text-green-200 text-sm text-center">View your bookings</p>
          </Link>

          <div className="flex-1 min-w-[220px] max-w-xs bg-[#18122b]/90 border border-[#2d2346] text-white p-8 rounded-3xl shadow-2xl flex flex-col items-center backdrop-blur-md">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold mb-1">Profile</h3>
            <p className="text-purple-200 text-sm text-center">Manage your account</p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-[#18122b]/90 border border-[#2d2346] rounded-3xl shadow-2xl p-10 flex flex-col justify-between backdrop-blur-md">
            <h2 className="text-2xl font-extrabold text-gray-100 mb-6">User Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#2d2346]">
                <span className="text-gray-300">Name:</span>
                <span className="font-semibold text-white">{user.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#2d2346]">
                <span className="text-gray-300">Email:</span>
                <span className="font-semibold text-white">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#2d2346]">
                <span className="text-gray-300">User ID:</span>
                <span className="font-semibold text-sm text-white">{user.id}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Member Since:</span>
                <span className="font-semibold text-white">Today</span>
              </div>
            </div>
          </div>
          <div className="bg-[#18122b]/90 border border-[#2d2346] rounded-3xl shadow-2xl p-10 flex flex-col justify-between backdrop-blur-md">
            <h2 className="text-2xl font-extrabold text-gray-100 mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#2d2346]">
                <span className="text-gray-300">Total Bookings:</span>
                <span className="font-semibold text-blue-400">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#2d2346]">
                <span className="text-gray-300">Active Bookings:</span>
                <span className="font-semibold text-green-400">{stats.active}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#2d2346]">
                <span className="text-gray-300">Completed Services:</span>
                <span className="font-semibold text-purple-400">{stats.completed}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Total Spent:</span>
                <span className="font-semibold text-orange-400">LKR {stats.spent}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-[#18122b]/90 border border-[#2d2346] rounded-3xl shadow-2xl p-10 backdrop-blur-md flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-gray-100 mb-4 tracking-tight drop-shadow-lg">Welcome to Your Dashboard!</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
            This is your central hub for managing your cleaning service bookings. Here's what you can do:
          </p>
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-gray-200">Book new cleaning services</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-gray-200">View your booking history</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-gray-200">Cancel or modify bookings</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-gray-200">Track service status</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-gray-200">Add special instructions</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-gray-200">Manage your profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 