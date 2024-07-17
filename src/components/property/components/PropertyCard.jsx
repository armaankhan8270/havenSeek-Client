import React from "react";
import { Bed, Bath, Move, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, fetchPropertyDetails, onContactAgent }) => (
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

export default PropertyCard;
