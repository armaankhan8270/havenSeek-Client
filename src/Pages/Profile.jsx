import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { useAgent } from "../context/AgentContext";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const { agents } = useAgent();

  const profile = user || agents;
  console.log(profile);
  const isAgent = !!agents;

  if (!profile) {
    return (
      <div className="max-w-sm mx-auto p-4 bg-blue-600 text-white rounded-lg shadow-md text-xl">
        <Link
          to="/login"
          className="block text-center py-2 px-4 bg-blue-700 hover:bg-blue-800 rounded transition-colors duration-200"
          aria-label="Go to Login Page"
        >
          First Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 h-48 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            {isAgent ? "Agent Profile" : "User Profile"}
          </h1>
        </div>
        <div className="relative px-6 py-10 sm:px-10 sm:py-16">
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
            <img
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
              src={
                `http://localhost:3001/uploads/${profile.profilePicture}` ||
                "https://via.placeholder.com/150"
              }
              alt={`${profile.name}'s avatar`}
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            {isAgent && (
              <p className="text-indigo-600 font-medium mt-2">
                {profile.agentId}
              </p>
            )}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ProfileField
              icon={<FaEnvelope />}
              label="Email"
              value={profile.email}
            />
            <ProfileField
              icon={<FaPhone />}
              label="Phone"
              value={profile.phone}
            />
            {isAgent ? (
              <>
                <ProfileField
                  icon={<FaIdCard />}
                  label="Areas of Expertise"
                  value={profile.areasOfExpertise}
                />
                <ProfileField
                  icon={<FaBriefcase />}
                  label="Experience"
                  value={`${profile.experience} years`}
                />
              </>
            ) : (
              <>
                <ProfileField
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={profile.location}
                />
                <ProfileField
                  icon={<FaIdCard />}
                  label="User ID"
                  value={profile.userId}
                />
              </>
            )}
          </div>
          {isAgent && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Specializations
              </h3>
              <p className="text-lg mb-2">
                <strong>Languages Spoken: </strong>
                {profile.languagesSpoken}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.specializations?.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
            <p className="text-gray-600">{profile.biography}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
