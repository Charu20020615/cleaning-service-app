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
Enter the following credentials on the User login page to access the admin dashboard

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


## 🛡️ What Can the Admin Do?

The admin has special privileges to manage the platform and bookings. As an admin, you can:

### 🔐 Log in with Admin Credentials
- Access the admin dashboard using the default admin email and password.

### 🧼 Manage Service Types
- Add new cleaning service types (e.g., deep cleaning, carpet cleaning, etc.).
- Edit existing service details (name, description, price, duration, availability).
- Delete services that are no longer offered.

### 📋 View and Manage All Bookings
- See all bookings made by users.
- Approve or confirm pending bookings.
- Mark bookings as completed when the service is done.
- Cancel bookings if necessary (e.g., due to scheduling conflicts).

### 📊 Monitor Booking Status
- Track the status of each booking (pending, confirmed, completed, cancelled).
- View customer details for each booking.

### 🧾 Dashboard Overview
- Get a quick overview of total bookings, active bookings, completed services, and revenue.

### 🔐 Role-Based Navigation
- Access the service management and booking management pages that are only visible to admins.

---






## 🙋‍♂️ What Can Users Do?

Regular users have access to a range of features to manage their cleaning service needs. As a user, you can:

### 📝 Register and Log In
- Create an account and securely log in to access your dashboard.

### 🧹 Book Cleaning Services
- Browse available cleaning service types.
- Select a service, pick a date, and choose from smart, real-time available time slots.
- Provide your contact details and any special instructions.

### 📅 View and Manage Your Bookings
- See a list of all your current and past bookings.
- Check the status of each booking (pending, confirmed, completed, cancelled).
- Cancel bookings if your plans change (before they are completed).

### 🔄 Track Booking Status
- Get real-time updates as your booking is approved, confirmed, completed, or cancelled by the admin.

### 👤 Profile and Dashboard
- View your profile information and booking statistics (total bookings, active bookings, completed services, total spent).
- Access quick actions to book new services or view your booking history.

### 🌈 Modern, Responsive UI
- Enjoy a beautiful, animated, and mobile-friendly interface with dark mode and smooth navigation.

