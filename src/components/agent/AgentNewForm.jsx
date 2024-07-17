import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Camera,
  Linkedin,
  Twitter,
  Facebook,
  MapPin,
  Clock,
} from "lucide-react";
import { useAgent } from "../../context/AgentContext";

const AgentRegistrationForm = () => {
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: null,
    password: "",
    experience: "",
    certifications: [],
    areasOfExpertise: [],
    languagesSpoken: [],
    biography: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    officeLocation: "",
    availability: "",
  });

  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData({ ...agentData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setAgentData({ ...agentData, [field]: values });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAgentData({ ...agentData, profilePicture: file });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(agentData).forEach((key) => {
      if (Array.isArray(agentData[key])) {
        formData.append(key, JSON.stringify(agentData[key]));
      } else {
        formData.append(key, agentData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/agentnew",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Agent registered successfully:", response.data);
      alert("Registered successfully!");
      // Reset form and state here
    } catch (error) {
      console.error("Error registering agent:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
            <div className="space-y-6">
              <Input
                label="Name"
                name="name"
                value={agentData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={agentData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone"
                name="phone"
                value={agentData.phone}
                onChange={handleChange}
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={agentData.password}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Professional Details</h3>
            <div className="space-y-6">
              <Input
                label="Experience (years)"
                name="experience"
                type="number"
                value={agentData.experience}
                onChange={handleChange}
                required
              />
              <Input
                label="Certifications"
                name="certifications"
                value={agentData.certifications.join(", ")}
                onChange={(e) => handleArrayChange(e, "certifications")}
                placeholder="Separate with commas"
              />
              <Input
                label="Areas of Expertise"
                name="areasOfExpertise"
                value={agentData.areasOfExpertise.join(", ")}
                onChange={(e) => handleArrayChange(e, "areasOfExpertise")}
                placeholder="Separate with commas"
              />
              <Input
                label="Languages Spoken"
                name="languagesSpoken"
                value={agentData.languagesSpoken.join(", ")}
                onChange={(e) => handleArrayChange(e, "languagesSpoken")}
                placeholder="Separate with commas"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biography
                </label>
                <textarea
                  name="biography"
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={agentData.biography}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">
              Additional Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="mt-1 flex items-center space-x-5">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile Preview"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <SocialInput
                icon={<Linkedin className="h-5 w-5 text-blue-700" />}
                label="LinkedIn"
                name="linkedin"
                value={agentData.linkedin}
                onChange={handleChange}
              />
              <SocialInput
                icon={<Twitter className="h-5 w-5 text-blue-400" />}
                label="Twitter"
                name="twitter"
                value={agentData.twitter}
                onChange={handleChange}
              />
              <SocialInput
                icon={<Facebook className="h-5 w-5 text-blue-600" />}
                label="Facebook"
                name="facebook"
                value={agentData.facebook}
                onChange={handleChange}
              />
              <SocialInput
                icon={<MapPin className="h-5 w-5 text-red-500" />}
                label="Office Location"
                name="officeLocation"
                value={agentData.officeLocation}
                onChange={handleChange}
              />
              <SocialInput
                icon={<Clock className="h-5 w-5 text-green-500" />}
                label="Availability"
                name="availability"
                value={agentData.availability}
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Register as an Agent
          </h2>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div
                    className={`rounded-full h-12 w-12 flex items-center justify-center border-2 ${
                      step >= item
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {item}
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-500">
                    {item === 1
                      ? "Personal"
                      : item === 2
                      ? "Professional"
                      : "Additional"}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <div
                className={`h-1 w-full ${
                  step > 1 ? "bg-indigo-500" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-1 w-full ${
                  step > 2 ? "bg-indigo-500" : "bg-gray-200"
                }`}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            to="/register"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Not an agent? Register as a user
          </Link>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
);

const SocialInput = ({ icon, label, name, value, onChange }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <Input label={label} name={name} value={value} onChange={onChange} />
  </div>
);

export default AgentRegistrationForm;
