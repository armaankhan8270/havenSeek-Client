import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/auth/register", formData);
      console.log("User registered successfully");
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r  rounded-lg text-white shadow-lg transform transition-all duration-500 hover:scale-105">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-xl text-cyan-900  font-extrabold mb-6 text-center">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
            required
          />
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
            required
          />
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
            required
          />
        </div>
        <div className="relative">
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 text-black block w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded-t-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-b-md shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105"
        >
          Register
        </button>
      </form>
      <Link
        className="text-blue-600  h-12 font-extrabold text-end p-2"
        to={"/agentnew"}
      >
        Are You And Agent?
      </Link>
    </div>
  );
};

export default RegisterForm;
