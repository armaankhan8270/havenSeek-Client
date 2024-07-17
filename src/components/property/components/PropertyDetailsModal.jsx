import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Wifi, Car, Coffee, AArrowDown, Sun } from "lucide-react";

const PropertyDetailsModal = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabVariants = {
    inactive: { opacity: 0, y: 10 },
    active: { opacity: 1, y: 0 },
  };

  const renderAmenityIcon = (amenity) => {
    const iconMap = {
      "Wi-Fi": <Wifi />,
      Parking: <Car />,
      "Coffee Machine": <Coffee />,
      Garden: <AArrowDown />,
      "Solar Panels": <Sun />,
    };
    return iconMap[amenity] || null;
  };

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <motion.div className="bg-slate-100 w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden">
        <div className="relative">
          <img
            src={`http://localhost:3001/uploads/${property.images[0]}`}
            alt={property.title}
            className="w-full h-64 object-cover"
          />
          <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-200">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
          {/* Add the rest of your modal content here */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyDetailsModal;
