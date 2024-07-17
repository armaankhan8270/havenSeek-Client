import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Wifi,
  Car,
  Coffee,
  Sun,
  AArrowDown,
  X,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  PawPrint,
  Home,
} from "lucide-react";

const PropertyDetailsModal = ({ property }) => {
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
    <div className="w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden bg-white">
      <div className="relative">
        <img
          src={`http://localhost:3001/uploads/${property.images[0]}`}
          alt={property.title}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="flex flex-col items-end justify-center px-4">
        <button
          onClick={() => window.history.back()}
          className="relative text-white text-3xl  top-4 bg-red-600 rounded-full px-4 py-2 shadow-md hover:bg-gray-100 transition duration-200"
        >
          X
        </button>
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
        <p className="flex items-center text-gray-600 mb-4">
          <MapPin className="mr-2" size={18} />
          {property.location}
        </p>

        <div className="flex space-x-4 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            {property.propertyStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 p-3 rounded-lg flex items-center">
            <DollarSign className="mr-2" size={18} />
            <span className="font-semibold">
              {property.price.toLocaleString()}
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg flex items-center">
            <Bed className="mr-2" size={18} />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg flex items-center">
            <Bath className="mr-2" size={18} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg flex items-center">
            <Square className="mr-2" size={18} />
            <span>{property.squareFootage} sqft</span>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {["Overview", "Amenities", "Details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 font-medium text-sm focus:outline-none ${
                  activeTab === tab.toLowerCase()
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <motion.div
          key={activeTab}
          initial="inactive"
          animate="active"
          variants={tabVariants}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div>
              <p className="text-gray-600 mb-4">{property.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Built</h4>
                  <p className="flex items-center text-gray-600">
                    <Calendar className="mr-2" size={18} />
                    {property.yearBuilt}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Parking</h4>
                  <p className="flex items-center text-gray-600">
                    <Car className="mr-2" size={18} />
                    {property.parking} spots
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Pets</h4>
                  <p className="flex items-center text-gray-600">
                    <PawPrint className="mr-2" size={18} />
                    {property.petsAllowed ? "Allowed" : "Not Allowed"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Furnishing</h4>
                  <p className="flex items-center text-gray-600">
                    <Home className="mr-2" size={18} />
                    {property.furnishingStatus}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "amenities" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 p-3 rounded-lg"
                >
                  {renderAmenityIcon(amenity)}
                  <span className="ml-2">{amenity}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "details" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Heating/Cooling</h4>
                <p className="text-gray-600">{property.heatingCoolingSystem}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Property ID</h4>
                <p className="text-gray-600">{property.propertyID}</p>
              </div>
              {property.floorNumber && (
                <div>
                  <h4 className="font-semibold mb-2">Floor</h4>
                  <p className="text-gray-600">
                    {property.floorNumber} of {property.totalFloors}
                  </p>
                </div>
              )}
              {property.availabilityDate && (
                <div>
                  <h4 className="font-semibold mb-2">Available From</h4>
                  <p className="text-gray-600">
                    {new Date(property.availabilityDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {property.virtualTourLink && (
          <div className="mt-6">
            <a
              href={property.virtualTourLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Take Virtual Tour
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
