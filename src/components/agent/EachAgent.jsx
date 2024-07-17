// src/components/AgentDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/agentnew/${id}`
        );
        setAgent(response.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching the agent data:", error);
      }
    };
    fetchAgent();
  }, [id]);

  if (!agent) {
    return (
      <div className="grid place-items-center h-screen text-white">
        {loading ? "Loading" : "No Agent Is Found"}
      </div>
    );
  }

  return (
    <div className="container shadow-md mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-3xl">
      {agent.name && (
        <div
          key={agent._id}
          className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative mb-10"
        >
          <div className="mr-10">
            <img
              className="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
              src={`http://localhost:3001/uploads/${agent.profilePicture}`}
              alt={`${agent.name}'s profile picture`}
            />
          </div>
          <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-gray-900 font-bold text-3xl mt-6 mb-8">
              Hey, I'm {agent.name}
            </h1>

            <p className="text-gray-700 w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
              {agent.biography}
            </p>

            <ul className="text-gray-700 mb-10">
              <li>
                <strong>Experience:</strong> {agent.experience} years
              </li>
              <li>
                <strong>Certifications:</strong> {agent.certifications}
              </li>
              <li>
                <strong>Areas of Expertise:</strong> {agent.areasOfExpertise}
              </li>
              <li>
                <strong>Languages Spoken:</strong>{" "}
                {agent.languagesSpoken.join(", ")}
              </li>
              <li>
                <strong>Office Location:</strong> {agent.officeLocation}
              </li>
              <li>
                <strong>Availability:</strong> {agent.availability}
              </li>
              <li>
                <strong>Agent Rating:</strong> {agent.rating}
              </li>
            </ul>

            <div
              id="social"
              className="flex flex-wrap justify-start items-center gap-4 mb-10"
            >
              <a
                rel="noopener"
                target="_blank"
                href={agent.linkedin}
                className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white"
              >
                <img
                  className="mr-2 hover:scale-105 transition duration-300 ease-in-out"
                  src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/linkedin.svg"
                  width="20px"
                  height="20px"
                  alt="LinkedIn"
                />
                <span>Follow me on LinkedIn</span>
              </a>
              <a
                rel="noopener"
                target="_blank"
                href={agent.twitter}
                className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white"
              >
                <img
                  className="mr-2 hover:scale-105 transition duration-300 ease-in-out"
                  src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/twitter.svg"
                  width="20px"
                  height="20px"
                  alt="Twitter"
                />
                <span>Follow me on Twitter</span>
              </a>
              <a
                rel="noopener"
                target="_blank"
                href={agent.facebook}
                className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white"
              >
                <img
                  className="mr-2 hover:scale-105 transition duration-300 ease-in-out"
                  src="https://ucarecdn.com/1f465c47-4849-4935-91f4-29135d8607af/github2.svg"
                  width="20px"
                  height="20px"
                  alt="Facebook"
                />
                <span>Follow me on Facebook</span>
              </a>
            </div>

            <h2 className="text-gray-900 font-bold text-2xl mb-4">
              Client Testimonials
            </h2>
            <div className="text-gray-700 mb-10">
              {agent.reviews.length === 0 ? (
                <p>No reviews available</p>
              ) : (
                agent.reviews.map((review) => (
                  <p key={review._id}>
                    <strong>{review.user.name}:</strong> "{review.comment}"
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetail;
