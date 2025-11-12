import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ExploreRooms from './components/ExploreRooms'; 

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Rooms />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;