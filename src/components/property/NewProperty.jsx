import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  DollarSign,
  MapPin,
  Camera,
  Video,
  Bed,
  Bath,
  Square,
  Calendar,
  PawPrint,
} from "lucide-react";
import axios from "axios";
import { useAgent } from "../../context/AgentContext";
const PropertyForm = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const handleFileChange = (e, field) => {
    setPropertyData((prev) => ({
      ...prev,
      [field]: [...e.target.files],
    }));
  };
  const { agents } = useAgent();
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "sale",
    amenities: "",
    images: null,
    videos: null,
    address: "",
    agent: agents._id ? agents._id : "668ce5b1235c0be0eacaa7e3",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    yearBuilt: "",
    floorNumber: "",
    totalFloors: "",
    furnishingStatus: "furnished",
    propertyStatus: "available",
    parking: "",
    nearbyAmenities: "",
    propertyFeatures: "",
    contactInfo: "",
    mapCoordinates: { lat: "", lng: "" },
    propertyID: "",
    virtualTourLink: "",
    floorPlans: "",
    availabilityDate: "",
    deposit: "",
    maintenanceCharges: "",
    petsAllowed: false,
    heatingCoolingSystem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPropertyData({ ...propertyData, [name]: checked });
  };

  const handleImageChange = (e) => {
    setPropertyData({ ...propertyData, images: e.target.files });
  };

  const handleVideoChange = (e) => {
    setPropertyData({ ...propertyData, videos: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Data is going to submit");

    const formData = new FormData();

    Object.keys(propertyData).forEach((key) => {
      if (key !== "images" && key !== "videos") {
        formData.append(key, propertyData[key]);
      }
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    videos.forEach((video) => {
      formData.append("videos", video);
    });

    console.log([...formData]); // Log the FormData contents

    try {
      const response = await axios.post(
        "http://localhost:3001/api/newproperties",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Success");
    } catch (error) {
      console.error("Error adding property", error);
      alert("Error");
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      fields: ["title", "description", "price", "location", "type"],
    },
    {
      title: "Property Details",
      fields: [
        "bedrooms",
        "bathrooms",
        "squareFootage",
        "yearBuilt",
        "floorNumber",
        "totalFloors",
      ],
    },
    {
      title: "Additional Information",
      fields: [
        "furnishingStatus",
        "propertyStatus",
        "parking",
        "petsAllowed",
        "heatingCoolingSystem",
      ],
    },
    {
      title: "Media",
      fields: ["images", "videos", "virtualTourLink", "floorPlans"],
    },
    {
      title: "Location & Contact",
      fields: [
        "address",
        "mapCoordinates.lat",
        "mapCoordinates.lng",
        "nearbyAmenities",
        "contactInfo",
      ],
    },
  ];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const renderField = (field) => {
    const labelMap = {
      title: "Title",
      description: "Description",
      price: "Price",
      location: "Location",
      type: "Type",
      amenities: "Amenities",
      address: "Address",
      agent: "Agent",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      squareFootage: "Square Footage",
      yearBuilt: "Year Built",
      floorNumber: "Floor Number",
      totalFloors: "Total Floors",
      furnishingStatus: "Furnishing Status",
      propertyStatus: "Property Status",
      parking: "Parking Spots",
      nearbyAmenities: "Nearby Amenities",
      propertyFeatures: "Property Features",
      contactInfo: "Contact Info",
      "mapCoordinates.lat": "Latitude",
      "mapCoordinates.lng": "Longitude",
      propertyID: "Property ID",
      virtualTourLink: "Virtual Tour Link",
      floorPlans: "Floor Plans",
      availabilityDate: "Availability Date",
      deposit: "Deposit",
      maintenanceCharges: "Maintenance Charges",
      petsAllowed: "Pets Allowed",
      heatingCoolingSystem: "Heating/Cooling System",
    };

    const iconMap = {
      title: Home,
      price: DollarSign,
      location: MapPin,
      bedrooms: Bed,
      bathrooms: Bath,
      squareFootage: Square,
      availabilityDate: Calendar,
      petsAllowed: PawPrint,
    };

    const Icon = iconMap[field] || null;

    switch (field) {
      case "description":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {labelMap[field]}
            </label>
            <textarea
              name={field}
              value={propertyData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>
        );
      case "type":
      case "furnishingStatus":
      case "propertyStatus":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {labelMap[field]}
            </label>
            <select
              name={field}
              value={propertyData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              {field === "type" && (
                <>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </>
              )}
              {field === "furnishingStatus" && (
                <>
                  <option value="furnished">Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </>
              )}
              {field === "propertyStatus" && (
                <>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="under offer">Under Offer</option>
                </>
              )}
            </select>
          </div>
        );
      case "images":
      case "videos":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {labelMap[field]}
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, field)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        );
      case "petsAllowed":
        return (
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name={field}
              checked={propertyData[field]}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              {labelMap[field]}
            </label>
          </div>
        );
      default:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {labelMap[field]}
            </label>
            <div className="relative">
              {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
              )}
              <input
                type={
                  field.includes("price") || field.includes("number")
                    ? "number"
                    : "text"
                }
                name={field}
                value={
                  field.includes(".")
                    ? propertyData[field.split(".")[0]][field.split(".")[1]]
                    : propertyData[field]
                }
                onChange={handleChange}
                className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  Icon ? "pl-10" : ""
                }`}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Submit Your Property
      </h2>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {formSections.map((section, index) => (
            <div
              key={index}
              className={`w-1/5 h-1 rounded ${
                step > index ? "bg-blue-500" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {formSections.map((section, index) => (
            <span
              key={index}
              className={`text-xs font-medium ${
                step > index ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {section.title}
            </span>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          {formSections[step - 1].fields.map((field) => renderField(field))}
        </motion.div>
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
            >
              <ChevronLeft className="mr-2" /> Previous
            </button>
          )}
          {step < formSections.length ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center ml-auto"
            >
              Next <ChevronRight className="ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center ml-auto"
            >
              Submit Property
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default PropertyForm;
