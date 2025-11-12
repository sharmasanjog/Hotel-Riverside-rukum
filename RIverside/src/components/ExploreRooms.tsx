import React, { useState } from "react";
import room1 from "../assets/images/room1.jpg";
import room2 from "../assets/images/room2.jpg";
import Bathroom from "../assets/images/Bathroom.jpg";
import hall from "../assets/images/hall.jpg"; 
import fish from "../assets/images/fish.jpg";
import dining from "../assets/images/dining.jpg";
import park from "../assets/images/park.jpg";
import highway from "../assets/images/highway.jpg";
import food from "../assets/images/food.jpg";
// Add more images later easily
const rooms = [
  { img: room1, name: "Deluxe/Ac Room" },
  { img: room2, name: "Single Bed Room" },
  { img: Bathroom, name: "Attached Bathroom" },
  { img: hall, name: "Meeting Hall" },
  { img: fish, name: "Fishing Area" },
  { img: dining, name: "Dining Area" },
  { img: park, name: "Garden Park" },
  { img: highway, name: "Highway View" },
  { img: food, name: "Delicious Food" },
];

interface ExploreRoomsProps {
  onClose: () => void;
}

const ExploreRooms: React.FC<ExploreRoomsProps> = ({ onClose }) => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const openPreview = (img: string) => setPreviewImg(img);
  const closePreview = () => setPreviewImg(null);

  return (
    <div className="relative p-4 animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-2xl z-50"
      >
        ×
      </button>

      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center animate-slideDown">
        Our Photo Gallery
      </h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fadeInUp">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            onClick={() => openPreview(room.img)}
          >
            <img
              src={room.img}
              alt={room.name}
              className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-4 transition-all duration-500">
              <p className="text-white text-lg font-semibold">{room.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Preview */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center animate-fadeIn"
          onClick={closePreview}
        >
          <div className="relative max-w-3xl w-full p-4">
            <img
              src={previewImg}
              alt="Room Preview"
              className="w-full rounded-xl shadow-2xl animate-zoomIn"
            />
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreRooms;
