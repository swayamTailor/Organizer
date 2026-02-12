import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import UserDashboard from './pages/user/UserDashboard';
import MyBookings from './pages/user/MyBookings';
import Profile from './pages/user/Profile';
import Payment from './pages/user/Payment';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import AddEvent from './pages/admin/AddEvent';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-[calc(100vh-5rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/bookings" element={<MyBookings />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/payment" element={<Payment />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/events/add" element={<AddEvent />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
