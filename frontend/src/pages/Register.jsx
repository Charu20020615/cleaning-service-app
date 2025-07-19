import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";

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

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      // Remove numbers from input
      const value = e.target.value.replace(/[0-9]/g, "");
      setForm({ ...form, [e.target.name]: value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setError(""); // Clear error when user types
  };

  const validate = () => {
    if (!form.name) return "Name is required.";
    if (/[0-9]/.test(form.name)) return "Name cannot contain numbers.";
    if (!form.email) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format.";
    if (!form.password) return "Password is required.";
    if (form.password.length < 7) return "Password must be at least 7 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("Registration successful! Redirecting to login...");
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0612] relative overflow-hidden p-6 flex items-center justify-center">
      <ModernGradientBackground />
      <div className="max-w-md w-full space-y-8 z-10 bg-[#18122b]/90 border border-[#2d2346] rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white">Join us and get started</p>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center space-x-4 text-sm">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="text-green-600 hover:text-green-800 font-medium border-b-2 border-green-600 pb-1"
          >
            Register
          </Link>
        </nav>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-green-600 hover:text-green-800 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
