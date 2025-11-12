import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* 🔹 Top bar */}
      <div className="bg-blue-900 text-white py-2 sm:py-3 px-4 text-sm border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          {/* Contact Info — Always visible */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center hover:text-blue-200 transition-colors">
              <Phone className="h-4 w-4 mr-1 text-blue-300" />
              <span>088-530333</span>
            </span>
            <span className="flex items-center hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4 mr-1 text-blue-300" />
              <span>hotelriversiderukum@gmail.com</span>
            </span>
          </div>

          {/* Right Side Info */}
          <div className="hidden lg:flex items-center space-x-3 text-blue-100">
            <div className="flex items-center text-blue-200">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm">Open 24/7</span>
            </div>
            <div className="w-px h-4 bg-blue-700"></div>
            <span>Musikot 05 Kunabang, Rukum West</span>
          </div>
        </div>
      </div>

      {/* 🔹 Main Navigation */}
      <nav className="px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HR</span>
            </div>
            <div>
              <h1
                className={`text-lg sm:text-xl font-bold transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                Hotel RiverSide
              </h1>
              <p
                className={`text-xs transition-colors ${
                  isScrolled ? 'text-gray-600' : 'text-white/80'
                }`}
              >
                Musikot, Rukum West
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'rooms', 'services', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize font-medium hover:text-blue-600 transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}

            {/* Desktop Book Now → Scroll to contact section */}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-gray-800 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 bg-white rounded-lg shadow-lg mx-2">
            {['home', 'about', 'rooms', 'services', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-5 py-2 text-gray-800 hover:bg-gray-100 capitalize"
              >
                {item}
              </button>
            ))}

            {/* Mobile Book Now → Scroll to Make a Reservation */}
            <div className="px-5 py-2">
              <button
                onClick={() => scrollToSection('make-reservation')}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
