import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "sale",
    amenities: "",
    Address: "",
    agent: "",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files).slice(0, 10)); // Limit to 10 files
  };

  const handleVideoChange = (e) => {
    setVideos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", property.title);
    formData.append("description", property.description);
    formData.append("price", property.price);
    formData.append("location", property.location);
    formData.append("type", property.type);
    formData.append("amenities", property.amenities.split(","));
    formData.append("Address", property.Address);
    formData.append("agent", property.agent);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/properties",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Property added:", response.data);
      toast.success("Property added successfully");
      navigate("/properties");
      // Clear form after submission
      setProperty({
        title: "",
        description: "",
        price: "",
        location: "",
        type: "sale",
        amenities: "",
        Address: "",
        agent: "",
      });
      setImages([]);
      setVideos([]);
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-2 bg-gradient-to-r from-cyan-9500 to-slate-800 rounded-lg text-white shadow-lg transform transition-all duration-500 hover:scale-105">
      <h2 className="text-xl text-cyan-900 capitalize font-extrabold mb-6 text-center">
        Properties Form
      </h2>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={property.title}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
              />
            </div>

            <div className="relative">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={property.price}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={property.location}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
              />
            </div>

            <div className="relative">
              <select
                name="type"
                value={property.type}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div className="relative">
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="amenities"
                placeholder="Amenities (comma separated)"
                value={property.amenities}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="Address"
                placeholder="Address"
                value={property.Address}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="agent"
                placeholder="Agent ID"
                value={property.agent}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
                defaultValue={"667fec29afd06a8e437f2d3a"}
              />
            </div>

            <div className="relative col-span-1 sm:col-span-2">
              <textarea
                name="description"
                placeholder="Description"
                value={property.description}
                onChange={handleChange}
                className="text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-b-md shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
