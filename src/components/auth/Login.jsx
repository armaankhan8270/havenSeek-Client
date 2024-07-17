import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { useAgent } from "../../context/AgentContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setAgents } = useAgent();
  const [isAgent, setIsAgent] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAgent
        ? "http://localhost:3001/api/agentnew/login"
        : "http://localhost:3001/api/auth/login";
      const response = await axios.post(endpoint, credentials);
      localStorage.setItem("token", response.data.token);

      if (isAgent) {
        setAgents(response.data.agent);
        toast.success("Agent Logged In Successfully");
      } else {
        setUser(response.data.user);
        toast.success("User Logged In Successfully");
      }

      navigate("/agentproperties");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105">
        <Toaster position="top-center" reverseOrder={false} />
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isAgent ? "Agent Login" : "User Login"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button
              onClick={() => setIsAgent(!isAgent)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isAgent ? "switch to user login" : "switch to agent login"}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6 m-2" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only ">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none p-4 rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-4 border b placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
