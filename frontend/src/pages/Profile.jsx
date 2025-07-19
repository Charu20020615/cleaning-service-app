import React, { useState, useEffect, useRef } from "react";
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

    return () => {
      running = false;
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

const Profile = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm({ name: user.name, email: user.email, password: "" });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          ...(form.password ? { password: form.password } : {}),
        }),
      });
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }
      if (!res.ok) throw new Error(data.msg || "Update failed");
      setMessage("Profile updated successfully");
      setError("");
      // Update localStorage user info
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      setForm({ ...form, password: "" });
    } catch (err) {
      setError(err.message);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0612] relative overflow-hidden p-6">
      <ModernGradientBackground />
      {/* Navigation Bar */}
      <nav className="bg-[#18122b]/80 border-b border-[#2d2346] shadow-2xl sticky top-0 z-20 backdrop-blur-md mb-8 rounded-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-6">
            <Link to="/home" className="text-gray-100 hover:text-blue-400 font-semibold">Home</Link>
            <Link to="/booking" className="text-gray-100 hover:text-blue-400 font-semibold">Book a Service</Link>
            <Link to="/my-bookings" className="text-gray-100 hover:text-blue-400 font-semibold">My Bookings</Link>
            <Link to="/profile" className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1">Profile</Link>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold border border-[#2d2346] transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow relative z-10">
        <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          {message && <div className="text-green-600 mt-2">{message}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile; 