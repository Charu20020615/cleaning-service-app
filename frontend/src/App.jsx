import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ServiceManagement from "./pages/ServiceManagement";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/service-management" element={<ServiceManagement />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
}

export default App;
