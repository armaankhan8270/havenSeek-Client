import React, { useEffect, useState } from "react";
import AgentCard from "./Card"; // Ensure the import matches your file name
import axios from "axios";

const NewAgentProfiles = () => {
  const [agents, setAgents] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/agentnew");

        setAgents(response.data); // Set agents to the data received from the API
        console.log(response.data); // Log the response data
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgentData();
  }, []);

  return (
    <div className="container m ">
      {agents.length > 0 ? <AgentCard agents={agents} /> : <p>Loading...</p>}
    </div>
  );
};

export default NewAgentProfiles;
