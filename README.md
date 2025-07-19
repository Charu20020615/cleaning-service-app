# 🧹 Cleaning Service Booking App

A modern full-stack web application for booking cleaning services, featuring a smart scheduling system, admin management, and a beautiful animated UI.

---

## ✨ Features

- 🔐 **User Authentication**: Secure registration and login with JWT.
- 📆 **Smart Booking System**: Real-time available time slots, avoids overlaps using estimated service durations.
- 🛠️ **Service Management**: Admin can add, edit, and manage service types with price, duration, and availability.
- 📋 **Booking Management**: Users can view, cancel their bookings.
- 🎨 **Animated Modern UI**: Built with React, Vite, and Tailwind CSS, with animated gradient backgrounds and dark mode.
- 🔑 **Role-Based Navigation**: Separate experiences for Users and Admins.
- 📱 **Responsive Design**: Fully responsive and mobile-friendly.

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Authentication | Other Tools |
|----------|---------|----------|-----------------|-------------|
| React (Vite) | Node.js, Express | MongoDB (Mongoose) | JWT (JSON Web Tokens) | Axios, React Router, Tailwind CSS |

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or local)
- npm or yarn

---

### 🖥 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

> 📍 Runs at: `http://localhost:5000`

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> 📍 Runs at: `http://localhost:5173`

---

### 🧪 Default Admin Login

```text
Email: admin123@gmail.com
Password: admin123
```
Enter the following credentials on the login page to access the admin dashboard

---

## 🧾 Folder Structure

```
cleaning-service-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── utils/
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
```

---

## 🎨 Customization

- Add or update **service types, durations, prices, and available days** via the admin dashboard.
- Update the animated background in `components/ModernGradientBackground.jsx`.

---
