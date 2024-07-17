// src/context/PropertyContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [Allproperties, setAllproperties] = useState([]);

  // Fetch Allproperties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/newproperties"
      );
      setAllproperties(response.data);
    } catch (error) {
      console.error("Error fetching Allproperties:", error);
    }
  };

  const addProperty = async (propertyData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/newproperties",
        propertyData
      );
      setAllproperties([...Allproperties, response.data]);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const updateProperty = async (propertyId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/newproperties/${propertyId}`,
        updatedData
      );
      setAllproperties(
        Allproperties.map((property) =>
          property._id === propertyId ? response.data : property
        )
      );
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/newproperties/${propertyId}`
      );
      setAllproperties(
        Allproperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        Allproperties,
        setAllproperties,
        fetchProperties,
        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

const useProperty = () => useContext(PropertyContext);

export { PropertyProvider, useProperty };
export default PropertyContext;
