import React, { useState } from "react";
import { Wifi, Car, Coffee, Tv, Waves, Users, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import local images
import room1Img from "../assets/images/room1.jpg";
import room2Img from "../assets/images/room2.jpg";
import room3Img from "../assets/images/room3.jpg";

const Rooms: React.FC = () => {
  const rooms = [
    {
      id: 1,
      name: "AC Deluxe Room",
      image: room1Img,
      price: "NPR 1,500",
      capacity: "4 Guests",
      size: "25 sqm",
      amenities: ["AC", "Free WiFi", "Attached Bathroom", "Mini Bar"],
      description:
        "Modern air-conditioned room offering comfort and relaxation for your stay.",
    },
    {
      id: 2,
      name: "Standard Single Bed Room",
      image: room2Img,
      price: "NPR 1,200",
      capacity: "1 Guest",
      size: "18 sqm",
      amenities: ["WiFi", "Single Bed", "Fan", "Room Service"],
      description:
        "Perfect for solo travelers seeking peace and convenience at a great price.",
    },
    {
      id: 3,
      name: "Normal Room (Attached Bathroom)",
      image: room3Img,
      price: "NPR 800",
      capacity: "4 Guests",
      size: "20 sqm",
      amenities: ["Attached Bathroom", "Fan", "Free WiFi"],
      description:
        "Budget-friendly room with attached bathroom and essential amenities.",
    },
  ];

  const commonAmenities = [
    { icon: <Wifi className="h-5 w-5" />, name: "Free WiFi" },
    { icon: <Car className="h-5 w-5" />, name: "Free Parking" },
    { icon: <Coffee className="h-5 w-5" />, name: "Room Service" },
    { icon: <Tv className="h-5 w-5" />, name: "Smart TV" },
    { icon: <Waves className="h-5 w-5" />, name: "River Access" },
    { icon: <Users className="h-5 w-5" />, name: "Concierge" },
  ];

  const [showReservation, setShowReservation] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // ✅ added phone here
    checkIn: "",
    checkOut: "",
    guests: "",
    room_type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // ✅ When user clicks “Book Now”, store the selected room type
  const openReservation = (roomName: string) => {
    setSelectedRoom(roomName);
    setFormData((prev) => ({ ...prev, room_type: roomName }));
    setShowReservation(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ EmailJS Integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const currentTime = new Date().toLocaleString();

    try {
      // 1️⃣ Send reservation details to admin
      await emailjs.send(
        "service_5n3cqcd", // your EmailJS service ID
        "template_4a2f7t2", // your admin template ID
        {
          room_type: formData.room_type,
          name: formData.name,
          phone: formData.phone, // ✅ included phone
          email: formData.email,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          message: formData.message,
          time: currentTime,
        },
        "QxvkhVySTKYpqdksI" // your EmailJS public key
      );

      // 2️⃣ Send auto-reply to user
      await emailjs.send(
        "service_5n3cqcd",
        "template_vgkpavc",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // ✅ included phone
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          message: formData.message,
          room_type: formData.room_type,
        },
        "QxvkhVySTKYpqdksI"
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "",
        room_type: "",
        message: "",
      });

      setTimeout(() => setShowReservation(false), 2000);
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rooms" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Rooms & Suites
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience comfort and affordability with our range of rooms — perfect for all kinds of travelers.
          </p>
        </motion.div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  {room.price}/night
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-600 mb-4">{room.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{room.capacity}</span>
                  <span>{room.size}</span>
                </div>

                <div className="space-y-2 mb-6">
                  {room.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {amenity}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openReservation(room.name)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Common Amenities */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            All Rooms Include
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {commonAmenities.map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-2 flex justify-center">
                    {amenity.icon}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {amenity.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reservation Form Modal */}
      <AnimatePresence>
        {showReservation && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center px-4 py-10 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
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
              <p className="text-center text-gray-600 mb-4">
                Room Type:{" "}
                <span className="font-semibold text-blue-600">
                  {selectedRoom}
                </span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* ✅ Added Phone Number Field */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkIn" className="sr-only">
                      Check-in date
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      name="checkIn"
                      title="Check-in date"
                      placeholder="Check-in"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOut" className="sr-only">
                      Check-out date
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      name="checkOut"
                      title="Check-out date"
                      placeholder="Check-out"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <input
                  type="number"
                  name="guests"
                  placeholder="Number of Guests"
                  min={1}
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <textarea
                  name="message"
                  placeholder="Special Request / Message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading ? "Sending..." : "Confirm Reservation"}
                </button>

                {!loading && status === "success" && (
                  <p className="text-green-600 mt-2 text-center">
                    ✅ Reservation request sent successfully! Check your email.
                  </p>
                )}
                {!loading && status === "error" && (
                  <p className="text-red-600 mt-2 text-center">
                    ❌ Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Rooms;
