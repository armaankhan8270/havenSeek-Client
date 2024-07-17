import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/UserContext";
import { Link } from "react-router-dom";

const AgentRegistration = () => {
  const { setAgent } = useAuth();
  const [images, setImages] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleImageChange = (e) => {
    setImages(e.target.files[0]); // Save the file, not the file name
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    if (images) {
      data.append("profilePicture", images); // Append the actual file

      try {
        const response = await axios.post(
          "http://localhost:3001/api/agents",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setAgent(response.data.agent); // Assuming response contains agent data
        toast.success("Agent registered successfully");
        // Clear the form after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: " ",
        });
        setImages(null); // Reset the image state
      } catch (error) {
        console.error("Error registering agent:", error);
        toast.error("Failed to register agent");
      }
    }

    return (
      <div className="max-w-md mx-auto p-8 rounded-lg text-white shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-xl text-black font-extrabold mb-6 text-center">
          Agent Registration
        </h2>
        <Toaster position="top-center" reverseOrder={false} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
              required
            />
          </div>
          <div className="relative">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
              required
            />
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
              required
            />
          </div>
          <div className="relative">
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
              required
            />
          </div>
          <div className="relative">
            <input
              placeholder="Profile"
              type="file"
              name="profilePicture"
              onChange={handleImageChange}
              className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-b-md shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105"
          >
            Register Agent
          </button>
        </form>
        <Link
          className="text-blue-600  h-12 font-extrabold text-end p-2"
          to={"/re  gister"}
        >
          Are You User?
        </Link>
      </div>
    );
  };
};
export default AgentRegistration;
