import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropertyDetailsModal from "../../utility/PropertyDetailsModal";
const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/newproperties/${id}`
        );
        console.log(id);

        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {property && (
        <PropertyDetailsModal property={property} onClose={() => {}} />
      )}
    </div>
  );
};

export default PropertyDetailsPage;
