import React from 'react';
import { Mountain, Waves, Trees, Award } from 'lucide-react';
import cover from '../assets/images/cover.jpg';

const About: React.FC = () => {
  const features = [
    {
      icon: <Mountain className="h-8 w-8" />,
      title: "Mountain Views",
      description: "Breathtaking views of the Himalayan foothills"
    },
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Riverside Location",
      description: "Peaceful location alongside pristine river waters"
    },
    {
      icon: <Trees className="h-8 w-8" />,
      title: "Natural Beauty",
      description: "Surrounded by lush forests and natural landscapes"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award Winning",
      description: "Recognized for exceptional hospitality and service"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About Hotel RiverSide
            </h2>
            <div className="w-20 h-1 bg-blue-600 mb-8"></div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Nestled in the beautiful Musikot region of Rukum West, Hotel RiverSide
              offers an unparalleled experience of comfort and natural beauty. Our hotel 
              combines modern amenities with the serene charm of Nepal's countryside.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Located at Kunabang, we provide our guests with stunning riverside views, 
              mountain vistas, and easy access to the region's cultural attractions. 
              Whether you're here for business or leisure, our dedicated staff ensures 
              your stay is memorable and comfortable.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <h4 className="text-2xl font-bold text-blue-600">2018</h4>
                <p className="text-gray-600">Established</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <h4 className="text-2xl font-bold text-blue-600">1000+</h4>
                <p className="text-gray-600">Happy Guests</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src={cover}
              alt="Hotel RiverSide"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
              <h4 className="text-xl font-bold">Experience Nepal</h4>
              <p className="text-blue-100">Authentic Hospitality</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4 group-hover:bg-blue-700 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
