import React from "react";
import { useAgent } from "../context/AgentContext";

const AboutPage = () => {
  const { agents } = useAgent();

  return (
    <div className="p-20 w-auto flex flex-wrap justify-center relative">
      <h1>First Login</h1>
      {agents.name && (
        <div
          key={agents._id}
          className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative mb-10"
        >
          <div className="mr-10">
            <img
              className="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
              src={`http://localhost:3001/uploads/${agents.profilePicture}`}
              alt="Agent profile picture"
            />
          </div>
          <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-gray-900 font-bold text-3xl mt-6 mb-8">
              Hey, I'm {agents.name}
            </h1>

            <p className="text-gray-700 w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
              {agents.biography}
            </p>

            <ul className="text-gray-700 mb-10">
              <li>
                <strong>Experience:</strong> {agents.experience} years
              </li>
              <li>
                <strong>Certifications:</strong> {agents.certifications}
              </li>
              <li>
                <strong>Areas of Expertise:</strong> {agents.areasOfExpertise}
              </li>
              <li>
                <strong>Languages Spoken:</strong> {agents.languagesSpoken}
              </li>
              <li>
                <strong>Office Location:</strong> {agents.officeLocation}
              </li>
              <li>
                <strong>Availability:</strong> {agents.availability}
              </li>
              <li>
                <strong>Agent Rating:</strong> {agents.rating}
              </li>
            </ul>

            <div
              id="social"
              className="flex flex-wrap justify-start items-center gap-4 mb-10"
            >
              <a
                rel="noopener"
                target="_blank"
                href={agents.linkedin}
                className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white"
              >
                <img
                  className="mr-2 hover:scale-105 transition duration-300 ease-in-out"
                  src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/linkedin.svg"
                  width="20px"
                  height="20px"
                  alt="LinkedIn"
                />
                <span>Follow me on Linkedin</span>
              </a>
              <a
                rel="noopener"
                target="_blank"
                href={agents.twitter}
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
                href={agents.facebook}
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
              {agents.reviews.map((review) => (
                <p key={review._id}>
                  <strong>{review.user.name}:</strong> "{review.comment}"
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
