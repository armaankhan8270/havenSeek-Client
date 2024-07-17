import React from "react";
import { Link } from "react-router-dom";
import { useAgent } from "../../context/AgentContext";

const Navbar = () => {
  const { agents, setAgents } = useAgent();
  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 rounded-lg shadow-lg my-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allProperty">Properties</NavLink>
          <NavLink to="/agents">Agents</NavLink>
          {agents.name && <NavLink to="/forms">Properties+</NavLink>}
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="flex items-center space-x-6">
          {!agents.name && (
            <NavLink to="/agentnew" className="btn-primary">
              Sign Up
            </NavLink>
          )}
          {!agents.name && (
            <NavLink to="/login" className="btn-secondary">
              Login
            </NavLink>
          )}
          {agents.name && (
            <NavLink to="/agentproperties" className="btn-primary">
              My Property
            </NavLink>
          )}
          <Link
            to="/profile"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
              src="https://t4.ftcdn.net/jpg/06/18/07/21/360_F_618072198_HK1qZt49jPTdAL2KN21lAhwDW0WItc7E.jpg"
              alt="Profile"
            />
            <span className="text-white font-medium">
              {agents ? agents.name : "Profile"}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={`text-white font-medium hover:text-cyan-400 transition-colors ${className}`}
  >
    {children}
  </Link>
);

export default Navbar;
