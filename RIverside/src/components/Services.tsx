import React from 'react';
import {
  Utensils,
  Car,
  Wifi,
  Dumbbell,
  Waves,
  Coffee,
  MapPin,
  Headphones,
  Calendar,
  Shield,
  Clock,
  Users,
} from 'lucide-react';
const Services: React.FC = () => {
  // Scroll to reservation section
  const scrollToReservation = () => {
    const reservationSection = document.getElementById('make-reservation');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open phone dial pad
  const openDialPad = () => {
    window.location.href = 'tel:+977-9857829429';
  };

  const services = [
    {
      icon: <Utensils className="h-8 w-8" />,
      title: 'Restaurant & Dining',
      description:
        'Authentic Nepali cuisine and international dishes prepared by expert chefs',
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Airport Transfer',
      description:
        'Convenient pickup and drop-off services to local airports and transport hubs',
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: 'Free WiFi',
      description:
        'High-speed internet access throughout the hotel premises',
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: 'Fitness Center',
      description:
        'Modern gym facilities to maintain your fitness routine during your stay',
    },
    {
      icon: <Waves className="h-8 w-8" />,
      title: 'River Activities',
      description:
        'Guided river walks, fishing, and water-based recreational activities',
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: '24/7 Room Service',
      description:
        'Round-the-clock room service for your convenience and comfort',
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Tour Assistance',
      description:
        'Local tour planning and guide services for exploring Rukum West',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: 'Concierge Service',
      description:
        'Personal assistance with bookings, recommendations, and special requests',
    },
  ];

  const facilities = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Event Hosting',
      description:
        'Conference rooms and banquet halls for business meetings and celebrations',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: '24/7 Security',
      description:
        'Round-the-clock security monitoring for your safety and peace of mind',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Express Check-in/out',
      description:
        'Quick and efficient check-in and check-out processes',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Group Bookings',
      description:
        'Special rates and arrangements for group reservations and corporate stays',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="text-center mb-16 animate-fadeIn delay-2"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Services & Facilities
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience world-class hospitality with our comprehensive range of
            services designed to make your stay comfortable, convenient, and
            memorable.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group transform hover:-translate-y-2 hover:scale-[1.02] duration-300 animate-slideUp delay-${index}`}
            >
              <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Facilities */}
        <div className="bg-white rounded-2xl p-8 shadow-lg animate-fadeInUp">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Additional Facilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-blue-600 mb-3 flex justify-center">
                  {facility.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">
                  {facility.title}
                </h4>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-blue-600 text-white rounded-2xl p-12 shadow-xl animate-popUp">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience Our Hospitality?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your stay today and discover why Hotel River Side is the
            perfect choice for your visit to Rukum West, Nepal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Scroll to Reservation */}
            <button
              onClick={scrollToReservation}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Book Your Room
            </button>

            {/* Dial Pad for Contact */}
            <button
              onClick={openDialPad}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
