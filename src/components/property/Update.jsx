import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdatePropertyForm = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "",
    amenities: "",
    videos: "",
    address: "",
    agent: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    yearBuilt: "",
    floorNumber: "",
    totalFloors: "",
    furnishingStatus: "",
    propertyStatus: "",
    parking: "",
    nearbyAmenities: "",
    propertyFeatures: "",
    contactInfo: "",
    mapCoordinates: "",
    virtualTourLink: "",
    floorPlans: "",
    availabilityDate: "",
    deposit: "",
    maintenanceCharges: "",
    petsAllowed: "",
    heatingCoolingSystem: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/newproperties/${id}`
        );
        setProperty(response.data);
        console.log(id);

        console.log(response);
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/newproperties/${id}`,
        property
      );
      setMessage({ type: "success", text: "Property updated successfully" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  if (loading) {
    return <div className="text-center">Loading property details...</div>;
  }

  const fields = [
    { label: "Title", name: "title", type: "text", required: true },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    { label: "Price", name: "price", type: "number", required: true },
    { label: "Location", name: "location", type: "text", required: true },
    { label: "Type", name: "type", type: "text", required: false },
    { label: "Amenities", name: "amenities", type: "text", required: false },
    { label: "Videos", name: "videos", type: "text", required: false },
    { label: "Address", name: "address", type: "text", required: false },
    { label: "Agent", name: "agent", type: "text", required: false },
    { label: "Bedrooms", name: "bedrooms", type: "number", required: false },
    { label: "Bathrooms", name: "bathrooms", type: "number", required: false },
    {
      label: "Square Footage",
      name: "squareFootage",
      type: "number",
      required: false,
    },
    { label: "Year Built", name: "yearBuilt", type: "number", required: false },
    {
      label: "Floor Number",
      name: "floorNumber",
      type: "number",
      required: false,
    },
    {
      label: "Total Floors",
      name: "totalFloors",
      type: "number",
      required: false,
    },
    {
      label: "Furnishing Status",
      name: "furnishingStatus",
      type: "text",
      required: false,
    },
    {
      label: "Property Status",
      name: "propertyStatus",
      type: "text",
      required: false,
    },
    { label: "Parking", name: "parking", type: "text", required: false },
    {
      label: "Nearby Amenities",
      name: "nearbyAmenities",
      type: "text",
      required: false,
    },
    {
      label: "Property Features",
      name: "propertyFeatures",
      type: "text",
      required: false,
    },
    {
      label: "Contact Info",
      name: "contactInfo",
      type: "text",
      required: false,
    },
    {
      label: "Map Coordinates",
      name: "mapCoordinates",
      type: "text",
      required: false,
    },
    {
      label: "Virtual Tour Link",
      name: "virtualTourLink",
      type: "text",
      required: false,
    },
    { label: "Floor Plans", name: "floorPlans", type: "text", required: false },
    {
      label: "Availability Date",
      name: "availabilityDate",
      type: "date",
      required: false,
    },
    { label: "Deposit", name: "deposit", type: "number", required: false },
    {
      label: "Maintenance Charges",
      name: "maintenanceCharges",
      type: "number",
      required: false,
    },
    {
      label: "Pets Allowed",
      name: "petsAllowed",
      type: "text",
      required: false,
    },
    {
      label: "Heating/Cooling System",
      name: "heatingCoolingSystem",
      type: "text",
      required: false,
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 shadow-md p-4">
      <h2 className="text-2xl font-bold mb-5">Update Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={property[field.name] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={property[field.name] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Property
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-2 text-center ${
            message.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default UpdatePropertyForm;
