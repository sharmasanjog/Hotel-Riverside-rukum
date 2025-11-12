import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import bg1 from '../assets/images/Background.jpg';
import bg2 from '../assets/images/night.jpg';
import ExploreRooms from './ExploreRooms';
import emailjs from '@emailjs/browser';

const Hero: React.FC = () => {
  const images = [bg1, bg2];
  const [current, setCurrent] = useState(0);
  const [showRooms, setShowRooms] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // ✅ Added phone
    checkIn: '',
    checkOut: '',
    guests: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showRooms || showReservation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showRooms, showReservation]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const currentTime = new Date().toLocaleString();

    try {
      // 1️⃣ Send reservation details to admin
      await emailjs.send(
        'service_5n3cqcd', // your EmailJS service ID
        'template_4a2f7t2', // your admin template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // ✅ Added phone here
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          message: formData.message,
          time: currentTime,
        },
        'QxvkhVySTKYpqdksI' // your EmailJS public key
      );

      // 2️⃣ Send auto-reply to user
      await emailjs.send(
        'service_5n3cqcd',
        'template_vgkpavc',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // ✅ Added phone here
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          message: formData.message,
        },
        'QxvkhVySTKYpqdksI'
      );

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '', // ✅ reset phone
        checkIn: '',
        checkOut: '',
        guests: '',
        message: '',
      });
      setShowReservation(false);
    } catch (error) {
      console.error('Email sending error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative h-[100vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-32 overflow-hidden"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Welcome to
          <span className="block text-yellow-400">Hotel RiverSide</span>
        </h1>

        <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
          Experience luxury and comfort in the heart of Nepal's natural beauty.
          Your perfect getaway awaits alongside the serene riverside.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setShowReservation(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors flex items-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Your Stay
          </button>

          <button
            onClick={() => setShowRooms(true)}
            className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors"
          >
            Photo Gallery
          </button>
        </div>
      </div>

      {/* Explore Rooms Modal */}
      {showRooms && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center px-4 py-10 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowRooms(false)}
              title="Close explore rooms"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <ExploreRooms onClose={() => setShowRooms(false)} />
          </div>
        </div>
      )}

      {/* Reservation Form Modal */}
      {showReservation && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center px-4 py-10 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowReservation(false)}
              title="Close reservation form"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Make a Reservation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* ✅ Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Check-in & Check-out */}
              <div>
                <label htmlFor="checkIn" className="block text-gray-700 font-medium mb-1">Check-in Date</label>
                <input
                  id="checkIn"
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="checkOut" className="block text-gray-700 font-medium mb-1">Check-out Date</label>
                <input
                  id="checkOut"
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-gray-700 font-medium mb-1">Guests</label>
                <input
                  id="guests"
                  type="number"
                  name="guests"
                  min={1}
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Number of guests"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Special Request / Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="Any special request or message for us?"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Sending...' : 'Confirm Reservation'}
              </button>

              {!loading && status === 'success' && (
                <p className="text-green-600 mt-2 text-center">
                  ✅ Reservation request sent successfully! Check your email.
                </p>
              )}
              {!loading && status === 'error' && (
                <p className="text-red-600 mt-2 text-center">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
