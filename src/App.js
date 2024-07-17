import "./App.css";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import PropertyForm from "./components/property/PropertyFrom";
import "./index.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PropertiesList from "./components/property/PropertyTour";
import PropertyDetails from "./components/property/PropertyDetail";
import AgentRegistration from "./components/agent/AgentForm";
import PropertyCard from "./components/property/PropertyCard";
import ProfilePage from "./Pages/Profile";
import AgentDetail from "./components/agent/EachAgent";
import AboutPage from "./Pages/About";
import ProfilePages from "./components/agent/AgenProfile";
import AddPropertyForm from "./components/property/NewProperty";
// import PropertyListAndDeta from "./components/property/List";
import Home from "./Pages/Home";
import AgentRegistrationForm from "./components/agent/AgentNewForm";
import NewAgentProfiles from "./components/agent/NewAgents";
import PropertiesByAgent from "./components/property/Agentwise";
import PropertyDetailsPage from "./components/property/DetailsCard";
import PropertyListAndDetails from "./components/property/List";
import UpdatePropertyForm from "./components/property/Update";
import AboutUsPage from "./Pages/Aboutus";
import Contact from "./utility/Contact";
import Help from "./utility/Help";
import FAQPage from "./utility/Faq";
function App() {
  return (
    <BrowserRouter>
      <h1 className="">
        <Navbar />
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<PropertyForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agentregister" element={<AgentRegistration />} />
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/prop" element={<PropertyCard />} />
        <Route path="/agentprofile" element={<ProfilePage />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/abouts" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/agents" element={<ProfilePages />} />
        <Route path="/forms" element={<AddPropertyForm />} />
        <Route path="/allProperty" element={<PropertyListAndDetails />} />
        <Route path="/agentnew" element={<AgentRegistrationForm />} />
        <Route path="/newagent" element={<NewAgentProfiles />} />
        <Route path="/agentproperties" element={<PropertiesByAgent />} />
        <Route path="/agentproperties/:id" element={<PropertyDetailsPage />} />
        <Route path="/properties/edit/:id" element={<UpdatePropertyForm />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
