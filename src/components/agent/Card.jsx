import React from "react";
// import "font-awesome/css/font-awesome.min.css"; // Ensure you import Font Awesome

const AgentCard = ({ agents }) => {
  return (
    <div className="antialiased text-gray-900">
      <div className="bg-gray-200 min-h-screen p-8 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {agents?.map((data) => (
            <div
              key={data._id}
              className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-xl container mx-auto"
            >
              <img
                className="w-1/2 h-72 lg:ml-32 rounded-full border-2 border-slate-200 object-contain "
                src={`http://localhost:3001/uploads/${data.profilePicture}`}
                alt={`${data.name || "Agent"}'s profile`}
              />
              <div className="p-6">
                <h4 className="font-semibold text-lg leading-tight truncate">
                  {data.name}
                </h4>
                <p className="text-gray-600">
                  {data.biography || "No biography available."}
                </p>
                <div className="mt-2">
                  <span className="text-gray-700">
                    <strong>Email:</strong> {data.email}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-700">
                    <strong>Phone:</strong> {data.phone}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-teal-600 font-semibold">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa${
                          index < data.agentRating ? "s" : "r"
                        } fa-star`}
                      ></i>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">
                      {data.clientTestimonials?.length || 0} reviews
                    </span>
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Client Testimonials
                </h3>
                {data.clientTestimonials?.length > 0 ? (
                  data.clientTestimonials.map((testimonial, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-gray-600">
                        <strong>{testimonial.clientName}</strong>:{" "}
                        {testimonial.testimonial}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No testimonials available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
