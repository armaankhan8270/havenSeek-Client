import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobileAlt,
  faCommentDots,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Modal = ({ property, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/send-email",
        {
          propertyId: property._id,
          agentId: property.agent, // Ensure property.agent is correctly set
          ...formData,
        }
      );

      console.log(response.data);
      alert("Message sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-lg overflow-hidden shadow-xl w-full max-w-md animate-fade-in">
        <div className="p-6 relative">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Contact Agent
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="px-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="px-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <FontAwesomeIcon
                icon={faMobileAlt}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile"
                className="px-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <FontAwesomeIcon
                icon={faCommentDots}
                className="absolute left-3 top-3 text-gray-400"
              />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="px-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
