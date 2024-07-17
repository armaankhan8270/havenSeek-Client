import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar, FaEnvelope, FaPhone } from "react-icons/fa";

const ProfilePages = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/agentnew");
        setAgents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the agent data:", error);
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Agents
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AgentCard = ({ agent }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <div className="relative h-96">
      <img
        src={`http://localhost:3001/uploads/${agent.profilePicture}`}
        alt={`${agent.name}'s profile`}
        className="w-full h-96 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
        {agent.name}
      </h2>
    </div>
    <div className="p-6">
      <div className="flex items-center mb-4">
        <FaEnvelope className="text-gray-400 mr-2" />
        <p className="text-gray-600">{agent.email}</p>
      </div>
      <div className="flex items-center mb-6">
        <FaPhone className="text-gray-400 mr-2" />
        <p className="text-gray-600">{agent.phone}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Recent Reviews</h3>
        {agent.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews available</p>
        ) : (
          <ul className="space-y-4">
            {agent.reviews.slice(0, 2).map((review) => (
              <li key={review._id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 line-clamp-2">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link
        to={`/agent/${agent._id}`}
        className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default ProfilePages;
