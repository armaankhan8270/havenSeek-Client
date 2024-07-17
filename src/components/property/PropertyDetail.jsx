// src/components/PropertyDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaBuilding,
  FaCogs,
  FaEye,
  FaCheck,
} from "react-icons/fa";

const PropertyDetails = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/newproperties/${id}`
      );
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  if (!property) {
    return <div className="text-center py-20 text-slate-100">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <motion.div
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 h-80 lg:h-auto relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={`http://localhost:3001/uploads/${property.images[0]}`}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">
                View Gallery
              </span>
            </div>
          </motion.div>

          {/* Details Section */}
          <div className="p-8 w-full lg:w-1/2 flex flex-col justify-between bg-slate-900">
            <div>
              <motion.h2
                className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {property.title}
              </motion.h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                {property.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoItem icon={FaDollarSign} text={`$${property.price}`} />
                <InfoItem icon={FaMapMarkerAlt} text={property.location} />
                <InfoItem icon={FaBuilding} text={property.type} />
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-200 flex items-center">
                  <FaCogs className="text-purple-400 text-xl mr-2" /> Amenities
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-slate-300"
                    >
                      <FaCheck className="text-green-400" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-slate-200 flex items-center">
                    <FaEye className="text-purple-400 text-xl mr-2" /> Address
                  </h3>
                  <p className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md shadow-md transition-colors duration-300 hover:bg-purple-700">
                    {property.Address}
                  </p>
                </motion.div>
              }
            </div>
            <div className="flex justify-end mt-6">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-md transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
              >
                Back
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 text-slate-300">
    <Icon className="text-purple-400 text-xl" />
    <span className="font-semibold">{text}</span>
  </div>
);

export default PropertyDetails;
