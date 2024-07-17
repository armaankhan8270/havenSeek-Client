import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "./Model";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAgent, setFilterAgent] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true, // Remove arrows to save space
    adaptiveHeight: true, // Adjust height based on slide content
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/properties");
      console.log(response);

      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || property.type === filterType;
    const matchesAgent =
      !filterAgent ||
      property.agent.toLowerCase().includes(filterAgent.toLowerCase());
    const matchesLocation =
      !filterLocation ||
      property.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesMinPrice =
      !filterMinPrice || property.price >= parseInt(filterMinPrice);
    const matchesMaxPrice =
      !filterMaxPrice || property.price <= parseInt(filterMaxPrice);

    return (
      matchesSearch &&
      matchesType &&
      matchesAgent &&
      matchesLocation &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterTypeChange = (e) => setFilterType(e.target.value);
  const handleFilterAgentChange = (e) => setFilterAgent(e.target.value);
  const handleFilterLocationChange = (e) => setFilterLocation(e.target.value);
  const handleFilterMinPriceChange = (e) => setFilterMinPrice(e.target.value);
  const handleFilterMaxPriceChange = (e) => setFilterMaxPrice(e.target.value);
  const handleContactAgent = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto py-8">
      <SearchAndFilterSection
        searchTerm={searchTerm}
        filterType={filterType}
        filterAgent={filterAgent}
        filterLocation={filterLocation}
        filterMinPrice={filterMinPrice}
        filterMaxPrice={filterMaxPrice}
        onSearchChange={handleSearchChange}
        onFilterTypeChange={handleFilterTypeChange}
        onFilterAgentChange={handleFilterAgentChange}
        onFilterLocationChange={handleFilterLocationChange}
        onFilterMinPriceChange={handleFilterMinPriceChange}
        onFilterMaxPriceChange={handleFilterMaxPriceChange}
      />
      <PropertyGrid
        properties={filteredProperties}
        sliderSettings={sliderSettings}
        onContactAgent={handleContactAgent}
      />
      {showModal && (
        <Modal
          property={selectedProperty}
          onClose={() => setShowModal(false)}
          // id={selectedProperty._id}
        />
      )}
    </div>
  );
};
const PropertyGrid = ({ properties, sliderSettings, onContactAgent }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {properties.map((property) => (
      <PropertyCard
        key={property._id}
        property={property}
        sliderSettings={sliderSettings}
        onContactAgent={onContactAgent}
      />
    ))}
  </div>
);
const SearchAndFilterSection = ({
  searchTerm,
  filterType,
  filterAgent,
  filterLocation,
  filterMinPrice,
  filterMaxPrice,
  onSearchChange,
  onFilterTypeChange,
  onFilterAgentChange,
  onFilterLocationChange,
  onFilterMinPriceChange,
  onFilterMaxPriceChange,
}) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold mb-4">Properties List</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  </div>
);

const PropertyCard = ({ property, sliderSettings, onContactAgent }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2">
      <div className="h-64 relative">
        <PropertyImageSlider
          images={property.images}
          settings={sliderSettings}
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800 hover:text-cyan-600 transition duration-300">
          {property.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {property.description}
        </p>
        <PropertyDetails property={property} />
        <PropertyAmenities amenities={property.amenities} />
        <PropertyActions property={property} onContactAgent={onContactAgent} />
        <div className="flex space-x-2 my-2 mb-4">
          <span className="text-xs bg-cyan-600 text-gray-100 rounded-full px-2 py-1">
            {property.Address
              ? property.Address
              : "No Address Provided Contact For Further Deatil"}
          </span>
        </div>
      </div>
    </div>
  );
};

const PropertyImageSlider = ({ images, settings }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [images]);

  return (
    <Slider
      ref={sliderRef}
      {...settings}
      className="h-full overflow-hidden hover:overflow-visible"
      // style={{ overflow: "hidden" }}
    >
      {images.map((image, index) => (
        <div key={index} className="h-full">
          <img
            src={`http://localhost:3001/uploads/${image}`}
            alt={`Property Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};

const PropertyDetails = ({ property }) => (
  <div className="flex items-center justify-between mb-4">
    <p className="text-2xl font-extrabold text-cyan-600">
      ${property.price.toLocaleString()}
    </p>
    <p className="text-sm font-semibold bg-teal-100 text-teal-800 rounded-full px-3 py-1">
      {property.location}
    </p>
  </div>
);

const PropertyAmenities = ({ amenities }) => (
  <div className="flex space-x-2 mb-4">
    {amenities.slice(0, 3).map((amenity, index) => (
      <span
        key={index}
        className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1"
      >
        {amenity}
      </span>
    ))}
    {amenities.length > 3 && (
      <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1">
        +{amenities.length - 3} more
      </span>
    )}
  </div>
);

const PropertyActions = ({ property, onContactAgent }) => (
  <div className="flex space-x-2">
    <Link
      to={`/properties/${property._id}`}
      className="flex-1 py-2 px-4 bg-cyan-600 text-white rounded-md text-center hover:bg-cyan-700 transition duration-300"
    >
      View Details
    </Link>
    <button
      onClick={() => onContactAgent(property)}
      className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition duration-300"
    >
      Contact Agent
    </button>
  </div>
);

export default PropertiesList;
