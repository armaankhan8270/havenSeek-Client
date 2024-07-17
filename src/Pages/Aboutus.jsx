import React from "react";
import {
  FaHandshake,
  FaMoneyBillWave,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Zero Brokerage Realty
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Revolutionizing real estate transactions with zero brokerage fees
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-500">
            At Zero Brokerage Realty, we're on a mission to make real estate
            transactions more accessible, transparent, and cost-effective for
            everyone. We believe that buying or selling a property shouldn't
            come with hefty brokerage fees, and we're here to prove it.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Story</h2>
          <p className="mt-4 text-lg text-gray-500">
            Founded in 2020, Zero Brokerage Realty was born out of a simple
            idea: what if we could eliminate brokerage fees and pass those
            savings directly to our clients? Our team of experienced real estate
            professionals and tech innovators came together to create a platform
            that makes this possible. Today, we're proud to have helped
            thousands of clients save millions in brokerage fees while providing
            top-notch service and support throughout their real estate journey.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Join the Zero Brokerage Revolution
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Whether you're buying your first home, selling an investment
            property, or looking for your next real estate opportunity, Zero
            Brokerage Realty is here to help. Experience the future of real
            estate transactions – where quality service meets unbeatable
            savings.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: "Zero Brokerage Fees",
    description:
      "Save thousands on your real estate transactions with our zero brokerage fee model.",
    icon: FaMoneyBillWave,
  },
  {
    name: "Full-Service Support",
    description:
      "Enjoy comprehensive support from our experienced real estate professionals throughout your journey.",
    icon: FaHandshake,
  },
  {
    name: "Cutting-Edge Technology",
    description:
      "Benefit from our state-of-the-art platform that streamlines the entire buying and selling process.",
    icon: FaChartLine,
  },
  {
    name: "Community-Driven",
    description:
      "Join a growing community of savvy buyers and sellers who are embracing the zero brokerage model.",
    icon: FaUsers,
  },
];

export default AboutUsPage;
