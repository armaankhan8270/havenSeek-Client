// src/components/PropertyCard.js
import axios from "axios";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PropertyCard2 = ({ property }) => {
  return (
    <div className="max-w-xl container mx-auto rounded overflow-hidden shadow-lg p-4 m-4 bg-white">
      <img
        className="w-full"
        src={`http://localhost:3001/uploads/${property.images[0]}`}
        alt={property.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{property.title}</div>
        <p className="text-gray-700 text-base">{property.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {property.price}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {property.location}
        </span>
      </div>
      <div className="flex flex-col space-y-4">
        <Link
          to={`/agentproperties/${property._id}`}
          className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link
          to={`/properties/edit/${property._id}`}
          className="flex items-center justify-center py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-cyan-700 transition duration-300"
        >
          Update Property
        </Link>

        <button
          onClick={async () => {
            try {
              await axios.delete(
                `http://localhost:3001/api/newproperties/${property._id}`
              );
              alert("Property deleted");
            } catch (error) {
              alert("Failed to delete property");
            }
          }}
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyCard2;
