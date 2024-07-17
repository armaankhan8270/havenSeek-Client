import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bed, Bath, Move, ArrowRight } from "lucide-react";
import {
  Home,
  DollarSign,
  MapPin,
  Square,
  Calendar,
  PawPrint,
  ChevronLeft,
} from "lucide-react";
import Modal from "./Model";
import { motion } from "framer-motion";
import { X, Wifi, Car, Coffee, AArrowDown, Sun } from "lucide-react";
import { useAgent } from "../../context/AgentContext";
import { useProperty } from "../../context/propertyContext";
import { Link } from "react-router-dom";

const PropertyListAndDetails = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { Allproperties, setAllproperties } = useProperty();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAgent, setFilterAgent] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [filterRooms, setFilterRooms] = useState("");
  const [filterSquareFootage, setFilterSquareFootage] = useState("");
  const [filterBedrooms, setFilterBedrooms] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const ModelClose = () => {
    setShowContactForm(false);
  };
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/newproperties"
      );
      setProperties(response.data);
      // setAllproperties(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setError("Failed to fetch properties");
      setLoading(false);
    }
  };

  const fetchPropertyDetails = async (id) => {
    try {
      // Check if the property exists in Allproperties
      const property = Allproperties.find((prop) => prop._id === id);

      if (property) {
        // If property is found, set it as the selected property and show the modal
        setSelectedProperty(property);
        setShowModal(true);
      } else {
        // If property is not found, make the API request
        const response = await axios.get(
          `http://localhost:3001/api/newproperties/${id}`
        );

        // Update Allproperties with the newly fetched property
        setAllproperties((prevProperties) => [
          ...prevProperties,
          response.data,
        ]);

        // Set the newly fetched property as the selected property and show the modal
        setSelectedProperty(response.data);
        setShowModal(true);
      }
    } catch (err) {
      setError("Failed to fetch property details");
    }
  };

  const fetchPropertyDetails2 = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/newproperties/${id}`
      );
      setSelectedProperty(response.data);
      setShowModal(true);
    } catch (err) {
      setError("Failed to fetch property details");
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  const onContactAgent = (property) => {
    setSelectedProperty(property);
    setShowContactForm(true);
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-gradient-to-r from-slate-950 to-indigo-900 shadow-lg rounded-lg overflow-hidden max-w-4xl max-h-96 mx-auto">
      <div className="md:flex ">
        <div className="md:w-1/2">
          <img
            src={`http://localhost:3001/uploads/${property.images[0]}`}
            alt={property.title}
            className="w-full h-96 md:h-96 object-cover"
          />
        </div>
        <div className="p-8 md:w-1/2 ">
          <div className="uppercase tracking-wide text-sm text-indigo-100 font-semibold">
            {property.location}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-gray-100">
            {property.title}
          </h2>
          <p className="mt-4 text-gray-100">{property.description}</p>
          <div className="mt-6 flex items-center text-gray-100">
            <Bed className="h-5 w-5 mr-2" />
            <span className="mr-4">{property.bedrooms} Beds</span>
            <Bath className="h-5 w-5 mr-2" />
            <span className="mr-4">{property.bathrooms} Baths</span>
            <Move className="h-5 w-5 mr-2" />
            <span>{property.squareFootage} sqft</span>
          </div>
          <div className="mt-6 text-3xl font-bold text-white">
            ${property.price.toLocaleString()}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => fetchPropertyDetails(property._id)}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button
              onClick={() => onContactAgent(property)}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Agent
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-100 w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="relative">
            <img
              src={`http://localhost:3001/uploads/${property.images[0]}`}
              alt={property.title}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-100 rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-200"
            >
              <X size={24} />
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
                        : "text-gray-500 hover:text-gray-100"
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
                  <p className="text-gray-100 mb-4">{property.description}</p>
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
                    <p className="text-gray-600">
                      {property.heatingCoolingSystem}
                    </p>
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
                        {new Date(
                          property.availabilityDate
                        ).toLocaleDateString()}
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
        </motion.div>
      </motion.div>
    );
  };
  const onSearchChange = (e) => setSearchTerm(e.target.value);
  const onFilterTypeChange = (e) => setFilterType(e.target.value);
  const onFilterAgentChange = (e) => setFilterAgent(e.target.value);
  const onFilterLocationChange = (e) => setFilterLocation(e.target.value);
  const onFilterMinPriceChange = (e) => setFilterMinPrice(e.target.value);
  const onFilterMaxPriceChange = (e) => setFilterMaxPrice(e.target.value);
  const onFilterRoomsChange = (e) => setFilterRooms(e.target.value);
  const onFilterSquareFootageChange = (e) =>
    setFilterSquareFootage(e.target.value);
  const onFilterBedroomsChange = (e) => setFilterBedrooms(e.target.value);

  const filteredProperties = Allproperties.filter((property) => {
    const title = property.title || "";
    const agent = property.agent || "";
    const location = property.location || "";
    const price = property.price || 0;
    const rooms = property.bedrooms || 0;
    const squareFootage = property.squareFootage || 0;
    const bedrooms = property.bedrooms || 0;

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || property.type === filterType) &&
      agent.toLowerCase().includes(filterAgent.toLowerCase()) &&
      location.toLowerCase().includes(filterLocation.toLowerCase()) &&
      (!filterMinPrice || price >= filterMinPrice) &&
      (!filterMaxPrice || price <= filterMaxPrice) &&
      (!filterRooms || rooms >= filterRooms) &&
      (!filterSquareFootage || squareFootage >= filterSquareFootage) &&
      (!filterBedrooms || bedrooms >= filterBedrooms)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8    ">
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        AsslamuAlikum To Armaan Estate
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={onSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterType}
          onChange={onFilterTypeChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <input
          type="text"
          placeholder="Search by agent"
          value={filterAgent}
          onChange={onFilterAgentChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Search by location"
          value={filterLocation}
          onChange={onFilterLocationChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Min price"
          value={filterMinPrice}
          onChange={onFilterMinPriceChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max price"
          value={filterMaxPrice}
          onChange={onFilterMaxPriceChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Min rooms"
          value={filterRooms}
          onChange={onFilterRoomsChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Min square footage"
          value={filterSquareFootage}
          onChange={onFilterSquareFootageChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Min bedrooms"
          value={filterBedrooms}
          onChange={onFilterBedroomsChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showModal && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {showContactForm && (
        <Modal property={selectedProperty} onClose={ModelClose} />
      )}
    </div>
  );
};

export default PropertyListAndDetails;
