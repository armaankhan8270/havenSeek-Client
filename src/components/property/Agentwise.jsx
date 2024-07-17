// src/components/PropertiesByAgent.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard2 from "./PropertyCard2";
import { useAgent } from "../../context/AgentContext";

const PropertiesByAgent = () => {
  const { agents } = useAgent();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/newproperties/agent",
          { agentId: agents._id }
        );
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching properties");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard2 key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PropertiesByAgent;
