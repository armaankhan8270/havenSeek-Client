import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 animate-fadeIn">{answer}</div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "How can I search for properties?",
      answer:
        "You can use our search feature to filter properties based on your budget, location, and other preferences. Simply enter your criteria and browse through the listings.",
    },
    {
      question: "How do I view property details?",
      answer:
        "Click on any property listing to view detailed information including images, description, price, and amenities. You can also see the agent's contact details.",
    },
    {
      question: "Can I contact the agent directly?",
      answer:
        "Yes, each property listing has a 'Contact Agent' button. Click on it to send your information to the agent, who will then get in touch with you.",
    },
    {
      question: "How do I register as an agent?",
      answer:
        "If you're an agent, you can register by navigating to the agent registration page. Fill out the required information and upload your properties to get started.",
    },
    {
      question: "Is there any ongoing support?",
      answer:
        "Yes, we provide support for both users and agents. If you encounter any issues or have questions, feel free to contact us through our support page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">Still have questions?</p>
          <a
            href="#contact"
            className="mt-2 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
