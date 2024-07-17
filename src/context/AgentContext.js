// src/context/AgentContext.js
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AgentContext = createContext();

const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);

  // Simulating agents context

  // Fetch user on mount

  // Fetch agents on mount
  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/agents");
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const addAgent = async (agentData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/agents",
        agentData
      );
      setAgents([...agents, response.data]);
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };

  const updateAgent = async (agentId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/agents/${agentId}`,
        updatedData
      );
      setAgents(
        agents.map((agent) => (agent._id === agentId ? response.data : agent))
      );
    } catch (error) {
      console.error("Error updating agent:", error);
    }
  };

  const deleteAgent = async (agentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/agents/${agentId}`);
      setAgents(agents.filter((agent) => agent._id !== agentId));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  return (
    <AgentContext.Provider
      value={{ agents, addAgent, updateAgent, deleteAgent, setAgents }}
    >
      {children}
    </AgentContext.Provider>
  );
};

const useAgent = () => useContext(AgentContext);

export { AgentProvider, useAgent };
export default AgentContext;
