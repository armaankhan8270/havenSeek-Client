import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const whatsappNumber = "+918433639534"; // Replace with your WhatsApp number
  const message = "Hello, I have a question about your real estate services."; // Default message

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsAppButton;
