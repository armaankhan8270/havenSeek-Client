import React from "react";

const SearchFilters = ({
  searchTerm,
  filterType,
  filterAgent,
  filterLocation,
  filterMinPrice,
  filterMaxPrice,
  filterRooms,
  filterSquareFootage,
  filterBedrooms,
  onSearchChange,
  onFilterTypeChange,
  onFilterAgentChange,
  onFilterLocationChange,
  onFilterMinPriceChange,
  onFilterMaxPriceChange,
  onFilterRoomsChange,
  onFilterSquareFootageChange,
  onFilterBedroomsChange,
}) => (
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
);

export default SearchFilters;
