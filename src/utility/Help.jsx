import React from "react";

const Help = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Help & Steps
          </h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="border-b border-gray-200 py-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                For Users:
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>
                  Visit the homepage and use the search bar to filter properties
                  based on your budget and preferences.
                </li>
                <li>
                  Click on a property listing to view detailed information
                  including images, description, and price.
                </li>
                <li>
                  If you like a property, click on the 'Contact Agent' button to
                  send your information to the agent.
                </li>
              </ul>
            </div>
            <div className="border-b border-gray-200 py-4 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                For Agents:
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>
                  Navigate to the agent registration page and fill out the
                  required information.
                </li>
                <li>
                  Upload your properties with detailed descriptions, images, and
                  pricing information.
                </li>
                <li>
                  Manage your listings and respond to user inquiries promptly to
                  ensure a smooth process.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">Need further assistance?</p>
            <a
              href="#contact"
              className="mt-2 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
