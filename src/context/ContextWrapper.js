// src/context/AppContextProvider.js
import React from "react";
import { AuthProvider } from "./UserContext";
import { PropertyProvider } from "./propertyContext";
import { AgentProvider } from "./AgentContext";

const AppContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AgentProvider>
        <PropertyProvider>{children}</PropertyProvider>
      </AgentProvider>
    </AuthProvider>
  );
};

export default AppContextProvider;
