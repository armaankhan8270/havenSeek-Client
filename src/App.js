import "./App.css";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NavBar from "./Pages/NavBar";
import Contact from "./Pages/Contact";
function App() {
  return (
    <BrowserRouter>
      <h1 className="text-center text-3xl text-teal-100 font-mono p-4 bg-slate-800 shadow-md">
        SuccessFully Cloning Done
      </h1>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
