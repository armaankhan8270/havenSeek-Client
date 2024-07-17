import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  {solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-300">
              Get the latest news and updates on zero brokerage real estate.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024 Zero Brokerage Realty. All rights reserved.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="h-5 w-5 text-indigo-400" />
            <span>Taloja Phase-1 Navi Mumabi 410208</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhone className="h-5 w-5 text-indigo-400" />
            <span>+91 8433639534</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="h-5 w-5 text-indigo-400" />
            <span>karmankkhan@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const solutions = [
  { name: "Buy a Home", href: "/newproperties" },
  { name: "Sell a Home", href: "/login" },
  { name: "Rent a Home", href: "/newproperties" },
  { name: "Mortgage Services", href: "/newproperties" },
];

const support = [
  { name: "FAQs", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
  { name: "Help Center", href: "/help" },
  { name: "Agent Support", href: "/help" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/about" },
  { name: "Press", href: "/" },
  { name: "Partners", href: "/" },
];

const legal = [
  { name: "Privacy Policy", href: "/" },
  { name: "Terms of Service", href: "/" },
  { name: "Cookie Policy", href: "/" },
  { name: "Licensing", href: "/" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100014876116777",
    icon: FaFacebookF,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/armaankhan8270",
    icon: FaTwitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/armaankhan8270/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.facebook.com/profile.php?id=100014876116777",
    icon: FaLinkedinIn,
  },
];

export default Footer;
