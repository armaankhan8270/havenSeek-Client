import React from "react";
import { Link } from "react-router-dom";
import Help from "../utility/Help";
import FAQPage from "../utility/Faq";
import Contact from "../utility/Contact";
import AboutUsPage from "./Aboutus.jsx";
import Footer from "../components/common/Footer.jsx";

const Home = () => {
  return (
    <div>
      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
              Find Your Dream Home Today
            </p>
            <h1 className="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
              Explore our extensive listings and find the perfect home for you
              and your family. Our platform provides detailed information and
              photos of each property to help you make the best decision.
            </h1>
            <div className="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <Link
                to="/properties"
                className="mb-3 sm:mb-0 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Browse Listings
              </Link>
              <Link
                to="/agents"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-gray-900 hover:text-white transition-all duration-200 bg-gray-100 border-2 border-gray-900 sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Contact an Agent
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative mx-auto mt-4 md:mt-8">
            <div className="lg:max-w-4xl lg:mx-auto">
              <img
                className="px-4 md:px-8"
                src="https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799711.jpg?t=st=1720949433~exp=1720953033~hmac=a50ecbacb8821920d3db637db144d44962c3efcd330f21a119d71343c4029867&w=1380"
                alt="Real Estate Hero Image"
              />
            </div>
          </div>
        </div>
      </section>
      <Help />
      <FAQPage />
      <Contact />
      <AboutUsPage />
      <Footer />
    </div>
  );
};

export default Home;
