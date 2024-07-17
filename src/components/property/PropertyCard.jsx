import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyCard = () => {
  const [properties, setProperties] = useState([{}, {}, {}]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property, ind) => (
          <div
            key={ind}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={`http://localhost:3001/${property.images}`}
                alt={property.title}
              />
              <div className="absolute top-2 left-2 bg-teal-500 text-white rounded-md px-2 py-1 text-sm">
                Top Match{property.ind}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {property.price} {property.currency}
              </h2>
              <p className="text-sm poppins text-gray-600">{property.title}</p>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-sm text-gray-600">{property.type}</p>
              <div className="flex items-center mt-2">
                <span className="text-teal-500 mr-1">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className="text-sm text-gray-600">
                  {property.address}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-teal-500 mr-1">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <span className="text-sm text-gray-600">{property.rent}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  {property.description}
                </div>
                <div className="text-teal-500">
                  <i className="far fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCard;
