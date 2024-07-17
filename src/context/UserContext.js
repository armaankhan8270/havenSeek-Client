// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [agent, setAgent] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3001/api/auth/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        userData
      );
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(response.data.user); // Assuming setUser is defined in your context
      return response.data; // Return data if needed
    } catch (error) {
      console.error("Error registering:", error);
      throw error; // Rethrow error for handling in component
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, agent, setAgent }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
export default AuthContext;
